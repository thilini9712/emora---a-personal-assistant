package com.uwu.emora.service.impl;

import com.uwu.emora.dto.robot.RobotResponseDto;
import com.uwu.emora.entity.Child;
import com.uwu.emora.entity.ChildEmotion;
import com.uwu.emora.entity.Emotion;
import com.uwu.emora.entity.RobotOutput;
import com.uwu.emora.enums.ResponseType;
import com.uwu.emora.enums.RobotOutputType;
import com.uwu.emora.repository.ChildEmotionRepository;
import com.uwu.emora.repository.RobotOutputRepository;
import com.uwu.emora.service.RobotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RobotServiceImpl implements RobotService {

    private final ChildEmotionRepository childEmotionRepository;
    private final RobotOutputRepository robotOutputRepository;

    @Override
    public void saveChildEmotion(long childId, long emotionId) {

        Emotion emotion = new Emotion();
        emotion.setId(emotionId);

        Child child = new Child();
        child.setId(childId);

        ChildEmotion childEmotion = new ChildEmotion();
        childEmotion.setEmotion(emotion);
        childEmotion.setChild(child);

        childEmotionRepository.save(childEmotion);
    }

    @Override
    public RobotResponseDto getLatestEmotionResponse() {
        RobotOutput output;
        RobotResponseDto response;
        Optional<RobotOutput> optionalOutput = robotOutputRepository.findTopByOutputTypeOrderByDateTimeDesc(RobotOutputType.REMINDER);
        if (optionalOutput.isPresent()) {
            output = optionalOutput.get();
            response = new RobotResponseDto(RobotOutputType.REMINDER, ResponseType.TEXT, output.getContent());
        } else {
            optionalOutput = robotOutputRepository.findTopByOutputTypeOrderByDateTimeDesc(RobotOutputType.TIMETABLE);
            if (optionalOutput.isPresent()) {
                output = optionalOutput.get();
                long mins = ChronoUnit.MINUTES.between(LocalDateTime.now(), output.getDateTime());
                String note = output.getContent() + " in " + mins + " minutes";
                response = new RobotResponseDto(RobotOutputType.TIMETABLE, ResponseType.TEXT, note);
            } else {
                optionalOutput = robotOutputRepository.findTopByOutputTypeOrderByDateTimeDesc(RobotOutputType.RESPONSE);
                if (optionalOutput.isPresent()) {
                    output = optionalOutput.get();
                    response = new RobotResponseDto(RobotOutputType.RESPONSE, output.getResponseType(), output.getContent());
                } else {
                    return null;
                }
            }
        }
        robotOutputRepository.delete(output);
        return response;
    }
}
