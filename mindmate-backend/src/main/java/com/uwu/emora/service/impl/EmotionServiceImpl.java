package com.uwu.emora.service.impl;

import com.uwu.emora.dto.emotion.ChildEmotionDto;
import com.uwu.emora.dto.emotion.EmotionResponseDto;
import com.uwu.emora.entity.ChildEmotion;
import com.uwu.emora.entity.Resource;
import com.uwu.emora.entity.Response;
import com.uwu.emora.entity.RobotOutput;
import com.uwu.emora.enums.ResponseType;
import com.uwu.emora.enums.RobotOutputType;
import com.uwu.emora.repository.ChildEmotionRepository;
import com.uwu.emora.repository.ResourceRepository;
import com.uwu.emora.repository.ResponseRepository;
import com.uwu.emora.repository.RobotOutputRepository;
import com.uwu.emora.service.EmotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmotionServiceImpl implements EmotionService {

    private final ChildEmotionRepository childEmotionRepository;
    private final ResponseRepository responseRepository;
    private final ResourceRepository resourceRepository;
    private final RobotOutputRepository robotOutputRepository;

    @Override
    public List<ChildEmotionDto> getLatestEmotions() {

        List<ChildEmotion> topEmotions = childEmotionRepository.findTopEmotions(1);
        return topEmotions.stream()
                .map(ce -> new ChildEmotionDto(
                        ce.getEmotion().getId(),
                        getDateTimeByZone(ce.getDateTime()),
                        getDateTimeByZone(ce.getDateTime()).toLocalTime()))
                .sorted(Collections.reverseOrder())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void saveEmotionResponse(EmotionResponseDto emotionResponseDto) {

        ChildEmotion emotion = childEmotionRepository.findTopByChild_IdOrderByDateTimeDesc(1);

        Optional<Response> optionalResponse = responseRepository.findByChildEmotion(emotion);
        if (!optionalResponse.isPresent()) {
            ResponseType type = emotionResponseDto.getType();

            Response response = new Response();
            response.setResponse(emotionResponseDto.getContent());
            response.setResponseType(type);
            response.setChildEmotion(emotion);
            if (!type.equals(ResponseType.TEXT) && !type.equals(ResponseType.AUDIO)) {
                Optional<Resource> optionalResource = resourceRepository.findById(emotionResponseDto.getId());
                optionalResource.ifPresent(response::setResource);
            }
            responseRepository.save(response);

            RobotOutput robotOutput = new RobotOutput();
            robotOutput.setResponseType(type);
            robotOutput.setOutputType(RobotOutputType.RESPONSE);
            robotOutput.setContent(emotionResponseDto.getContent());

            robotOutputRepository.save(robotOutput);
        }
    }

    public static LocalDateTime getDateTimeByZone(LocalDateTime dateTime) {
        ZoneId oldZone = ZoneId.of("GMT");
        ZoneId newZone = ZoneId.of("Asia/Colombo");
        return dateTime.atZone(oldZone).withZoneSameInstant(newZone).toLocalDateTime();
    }

}
