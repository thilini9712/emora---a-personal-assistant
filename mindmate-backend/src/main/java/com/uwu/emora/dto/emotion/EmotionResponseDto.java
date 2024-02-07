package com.uwu.emora.dto.emotion;

import com.uwu.emora.enums.ResponseType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmotionResponseDto {
    private ResponseType type;
    private String content;
    private long id;
}
