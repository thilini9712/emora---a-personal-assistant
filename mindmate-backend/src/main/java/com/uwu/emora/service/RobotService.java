package com.uwu.emora.service;

import com.uwu.emora.dto.robot.RobotResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface RobotService {
    void saveChildEmotion(long childId, long emotionId);

    RobotResponseDto getLatestEmotionResponse();

}
