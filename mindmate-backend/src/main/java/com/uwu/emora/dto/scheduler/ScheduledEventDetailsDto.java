package com.uwu.emora.dto.scheduler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduledEventDetailsDto {
    private LocalDate date;
    private long timestamp;
    private List<SingleScheduledEventDto> events;

    public void setDate(LocalDate date) {
        this.date = date;
        ZonedDateTime zdt = ZonedDateTime.of(date.atStartOfDay(), ZoneId.systemDefault());
        setTimestamp(zdt.toInstant().toEpochMilli());
    }

    public void setEvent(SingleScheduledEventDto event) {
        if (events == null) events = new ArrayList<>();
        events.add(event);
    }
}
