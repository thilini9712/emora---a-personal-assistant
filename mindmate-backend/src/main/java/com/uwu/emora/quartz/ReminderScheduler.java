package com.uwu.emora.quartz;

import com.uwu.emora.enums.Day;
import com.uwu.emora.enums.ReminderType;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;

import static org.quartz.CronScheduleBuilder.weeklyOnDayAndHourAndMinute;

@Component
@RequiredArgsConstructor
public class ReminderScheduler {

    private final Scheduler scheduler;

    public void schedule(String scheduleId, ZonedDateTime dateTime) {
        JobDetail jobDetail = buildJobDetail(ReminderType.ONETIME, scheduleId);
        Trigger trigger = buildJobTrigger(jobDetail, dateTime);

        try {
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }

    }

    public void scheduleCron(String scheduleId, Day day, int hour, int min) {
        JobDetail jobDetail = buildJobDetail(ReminderType.TIMETABLE, scheduleId);
        Trigger trigger = buildCronJobTrigger(jobDetail, day, hour, min);
        try {
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }

    }

    public void deleteSchedule(String scheduleId) {
        try {
            scheduler.deleteJob(new JobKey(scheduleId, "reminder-jobs"));
            TriggerKey triggerKey = new TriggerKey(scheduleId, "reminder-jobs");
            scheduler.unscheduleJob(triggerKey);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }

    }

    private JobDetail buildJobDetail(ReminderType type, String id) {

        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("reminderType", type);
        jobDataMap.put("reminderId", id);

        return JobBuilder.newJob(ReminderJob.class)
                .withIdentity(id, "reminder-jobs")
                .withDescription("Send reminder Job")
                .usingJobData(jobDataMap)
                .storeDurably()
                .build();
    }

    private Trigger buildJobTrigger(JobDetail jobDetail, ZonedDateTime startAt) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), "reminder-triggers")
                .withDescription("Send Reminder Trigger")
                .startAt(Date.from(startAt.toInstant()))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().withMisfireHandlingInstructionFireNow())
                .build();
    }

    private Trigger buildCronJobTrigger(JobDetail jobDetail, Day day, int hour, int min) {
        int dayInt = 0;
        switch (day) {
            case MON:
                dayInt = DateBuilder.MONDAY;
                break;
            case TUE:
                dayInt = DateBuilder.TUESDAY;
                break;
            case WED:
                dayInt = DateBuilder.WEDNESDAY;
                break;
            case THU:
                dayInt = DateBuilder.THURSDAY;
                break;
            case FRI:
                dayInt = DateBuilder.FRIDAY;
                break;
            case SAT:
                dayInt = DateBuilder.SATURDAY;
                break;
            case SUN:
                dayInt = DateBuilder.SUNDAY;
                break;
            default:
        }

        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), "daily-timetable-triggers")
                .withSchedule(weeklyOnDayAndHourAndMinute(dayInt, hour, min))
                .build();
    }
}
