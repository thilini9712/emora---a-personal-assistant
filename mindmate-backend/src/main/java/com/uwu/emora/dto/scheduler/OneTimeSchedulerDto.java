package com.uwu.emora.dto.scheduler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OneTimeSchedulerDto {

    private String id;
    private String date;
    private String note;
    private String remindTime;
    private String fromTime;
    private String toTime;
}
