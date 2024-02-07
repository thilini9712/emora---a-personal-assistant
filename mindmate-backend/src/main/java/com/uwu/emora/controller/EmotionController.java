package com.uwu.emora.controller;

import com.uwu.emora.dto.CommonResponse;
import com.uwu.emora.dto.emotion.ChildEmotionDto;
import com.uwu.emora.dto.emotion.EmotionResponseDto;
import com.uwu.emora.service.EmotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "")
@CrossOrigin
public class EmotionController {

    private final EmotionService emotionService;

    @GetMapping(value = "/user/emotion")
    public ResponseEntity getLatestEmotions() {
        List<ChildEmotionDto> latestEmotions = emotionService.getLatestEmotions();
        return ResponseEntity.ok(new CommonResponse<>(true, latestEmotions));
    }

    @PostMapping(value = "/user/respond")
    public ResponseEntity responseToEmotion(@RequestBody EmotionResponseDto emotionResponseDto) {
        emotionService.saveEmotionResponse(emotionResponseDto);
        return ResponseEntity.ok(new CommonResponse<>(true, "Child Emotion Response Details Saved Successfully"));
    }
}
