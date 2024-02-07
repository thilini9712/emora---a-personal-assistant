package com.uwu.emora.controller;

import com.uwu.emora.dto.CommonResponse;
import com.uwu.emora.dto.emotion.ChildEmotionDto;
import com.uwu.emora.dto.robot.RobotResponseDto;
import com.uwu.emora.service.EmotionService;
import com.uwu.emora.service.RobotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "")
@CrossOrigin
public class RobotController {

    private final RobotService robotService;

    @PostMapping(value = "/emotion")
    public ResponseEntity saveChildEmotion(@RequestBody ChildEmotionDto data) {
        robotService.saveChildEmotion(1, data.getEmotionId());
        return ResponseEntity.ok(new CommonResponse<>(true, "Child Emotion Details Saved Successfully"));
    }

    @GetMapping(value = "/response")
    public ResponseEntity getEmotionResponses() {
        RobotResponseDto dto = robotService.getLatestEmotionResponse();
        return ResponseEntity.ok(dto);
    }

}
