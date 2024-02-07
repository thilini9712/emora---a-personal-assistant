package com.uwu.emora.service;

import com.uwu.emora.dto.scheduler.OneTimeSchedulerDto;
import com.uwu.emora.dto.scheduler.ScheduledEventDetailsDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SchedulerService {
    void scheduleOnetime(OneTimeSchedulerDto dto, long childId);

    void sendOneTimeReminder(String reminderId);

    List<OneTimeSchedulerDto> getScheduledTasks(long childId);

    void editScheduledTask(OneTimeSchedulerDto dto, long childId);

    void deleteScheduledTask(String reminderId, long childId);

    List<ScheduledEventDetailsDto> getScheduledTasksForWeb(long childId);

    OneTimeSchedulerDto getUpcomingScheduledTask(long childId);
}
