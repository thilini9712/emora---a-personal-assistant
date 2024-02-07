package com.uwu.emora.quartz;

import com.uwu.emora.enums.ReminderType;
import com.uwu.emora.service.SchedulerService;
import com.uwu.emora.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReminderJob extends QuartzJobBean {

    private final SchedulerService schedulerService;
    private final TimetableService timetableService;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        JobDataMap jobDataMap = jobExecutionContext.getMergedJobDataMap();

        String reminderId = jobDataMap.getString("reminderId");
        ReminderType reminderType = ReminderType.valueOf(jobDataMap.getString("reminderType"));

        System.out.println("sending scheduled reminders");
        if (reminderType.equals(ReminderType.ONETIME)) {
            schedulerService.sendOneTimeReminder(reminderId);
        } else {
            timetableService.sendTimetableReminder(reminderId);
        }
    }
}
