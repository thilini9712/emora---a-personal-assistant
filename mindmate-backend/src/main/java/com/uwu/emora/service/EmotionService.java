package com.uwu.emora.service;

import com.uwu.emora.dto.emotion.ChildEmotionDto;
import com.uwu.emora.dto.emotion.EmotionResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmotionService {
    List<ChildEmotionDto> getLatestEmotions();

    void saveEmotionResponse(EmotionResponseDto emotionResponseDto);
}
