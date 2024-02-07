package com.uwu.emora.dto.robot;

import com.uwu.emora.enums.ResponseType;
import com.uwu.emora.enums.RobotOutputType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RobotResponseDto {
    private RobotOutputType output;
    private ResponseType type;
    private String content;
}
