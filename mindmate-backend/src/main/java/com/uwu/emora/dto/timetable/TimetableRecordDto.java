package com.uwu.emora.dto.timetable;

import com.uwu.emora.enums.Day;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TimetableRecordDto {
    private String id;
    private Day day;
    private String fromTime;
    private String toTime;
    private String task;
    private long childId;
}
