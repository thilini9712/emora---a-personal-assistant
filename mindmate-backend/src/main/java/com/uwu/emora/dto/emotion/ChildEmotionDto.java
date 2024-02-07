package com.uwu.emora.dto.emotion;

import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChildEmotionDto implements Comparable<ChildEmotionDto> {
    private long emotionId;
    private LocalDateTime dateTime;
    private LocalTime time;

    @Override
    public int compareTo(ChildEmotionDto o) {
        return o.dateTime.compareTo(this.dateTime);
    }
}
