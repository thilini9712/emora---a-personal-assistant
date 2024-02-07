package com.uwu.emora.dto.scheduler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SingleScheduledEventDto {
    private String id;
    private String note;
    private long from;
    private long to;
    private long remindTime;
}
