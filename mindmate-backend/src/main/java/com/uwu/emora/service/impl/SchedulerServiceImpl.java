package com.uwu.emora.service.impl;

import com.uwu.emora.dto.scheduler.OneTimeSchedulerDto;
import com.uwu.emora.dto.scheduler.ScheduledEventDetailsDto;
import com.uwu.emora.dto.scheduler.SingleScheduledEventDto;
import com.uwu.emora.entity.Child;
import com.uwu.emora.entity.RobotOutput;
import com.uwu.emora.entity.Scheduler;
import com.uwu.emora.enums.ResponseType;
import com.uwu.emora.enums.RobotOutputType;
import com.uwu.emora.exception.CustomServiceException;
import com.uwu.emora.quartz.ReminderScheduler;
import com.uwu.emora.repository.ChildRepository;
import com.uwu.emora.repository.RobotOutputRepository;
import com.uwu.emora.repository.SchedulerRepository;
import com.uwu.emora.service.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchedulerServiceImpl implements SchedulerService {

    private final SchedulerRepository schedulerRepository;
    private final ChildRepository childRepository;
    private final ReminderScheduler reminderScheduler;
    private final RobotOutputRepository robotOutputRepository;

    @Override
    public void scheduleOnetime(OneTimeSchedulerDto dto, long childId) {

        Child child = childRepository.findById(childId).orElseThrow(() -> new CustomServiceException("Child not found"));

        LocalDateTime fromDateTime = getDateTimeFromString(dto.getDate() + " " + dto.getFromTime(), "yyyy-MM-dd HH:mm:ss");
        LocalDateTime toDateTime = getDateTimeFromString(dto.getDate() + " " + dto.getToTime(), "yyyy-MM-dd HH:mm:ss");
        LocalDateTime remindDateTime = getDateTimeFromString(dto.getDate() + " " + dto.getRemindTime(), "yyyy-MM-dd HH:mm:ss");

        TimeZone timeZone = TimeZone.getTimeZone("Asia/Kolkata");
        ZoneId zoneId = timeZone.toZoneId();
        ZonedDateTime dateTime = ZonedDateTime.of(remindDateTime, zoneId);
        LocalDate date = getDateFromString(dto.getDate(), "yyyy-MM-dd");

        String reminderId = UUID.randomUUID().toString();
        List<String> allIDs = schedulerRepository.getAllIDs();

        while (true) {
            if (allIDs.contains(reminderId)) {
                reminderId = UUID.randomUUID().toString();
            } else {
                break;
            }
        }

        reminderScheduler.schedule(reminderId, dateTime);

        //save to database
        Scheduler scheduler = new Scheduler();
        scheduler.setId(reminderId);
        scheduler.setNote(dto.getNote());
        scheduler.setDate(date);
        scheduler.setRemindTime(remindDateTime);
        scheduler.setChild(child);
        scheduler.setFromTime(fromDateTime);
        scheduler.setToTime(toDateTime);
        schedulerRepository.save(scheduler);
    }

    @Override
    public void sendOneTimeReminder(String reminderId) {

        Optional<Scheduler> optionalScheduler = schedulerRepository.findById(reminderId);

        if (optionalScheduler.isPresent()) {
            Scheduler scheduler = optionalScheduler.get();
            RobotOutput robotOutput = new RobotOutput();
            robotOutput.setResponseType(ResponseType.TEXT);
            robotOutput.setOutputType(RobotOutputType.REMINDER);
            robotOutput.setContent(scheduler.getNote() + " from " + scheduler.getFromTime() + " to " + scheduler.getToTime());
            robotOutput.setDateTime(scheduler.getFromTime());
            robotOutputRepository.save(robotOutput);
        }
    }

    @Override
    public List<OneTimeSchedulerDto> getScheduledTasks(long childId) {
        return schedulerRepository.findAll().stream().map(s ->
                new OneTimeSchedulerDto(s.getId(),
                        s.getDate().toString(),
                        s.getNote(),
                        s.getRemindTime().toString(),
                        s.getFromTime().toString(),
                        s.getToTime().toString()
                )).collect(Collectors.toList());

    }

    @Override
    public void editScheduledTask(OneTimeSchedulerDto dto, long childId) {
        Child child = childRepository.findById(childId).orElseThrow(() -> new CustomServiceException("Child not found"));
        Scheduler scheduler = schedulerRepository.findById(dto.getId()).orElseThrow(() -> new CustomServiceException("One Time Scheduler Not Found!"));

        LocalDateTime fromDateTime = getDateTimeFromString(dto.getDate() + " " + dto.getFromTime(), "yyyy-MM-dd HH:mm:ss");
        LocalDateTime toDateTime = getDateTimeFromString(dto.getDate() + " " + dto.getToTime(), "yyyy-MM-dd HH:mm:ss");
        LocalDateTime remindDateTime = getDateTimeFromString(dto.getDate() + " " + dto.getRemindTime(), "yyyy-MM-dd HH:mm:ss");

        LocalDate date = getDateFromString(dto.getDate(), "yyyy-MM-dd");

        TimeZone timeZone = TimeZone.getTimeZone("Asia/Kolkata");
        ZoneId zoneId = timeZone.toZoneId();
        ZonedDateTime zonedRemindDateTime = ZonedDateTime.of(remindDateTime, zoneId);

        if (scheduler.getRemindTime().compareTo(remindDateTime) != 0) {
            reminderScheduler.deleteSchedule(scheduler.getId());
            reminderScheduler.schedule(scheduler.getId(), zonedRemindDateTime);
        }

        //Update database
        scheduler.setNote(dto.getNote());
        scheduler.setDate(date);
        scheduler.setRemindTime(remindDateTime);
        scheduler.setChild(child);
        scheduler.setFromTime(fromDateTime);
        scheduler.setToTime(toDateTime);
        schedulerRepository.save(scheduler);
    }

    public LocalDateTime getDateTimeFromString(String str, String formatString) {
        //yyyy-MM-dd HH:mm:ss
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatString);
        return LocalDateTime.parse(str, formatter);
    }

    public LocalDate getDateFromString(String str, String formatString) {
        //yyyy-MM-dd
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatString);
        return LocalDate.parse(str, formatter);
    }

    @Override
    public void deleteScheduledTask(String reminderId, long childId) {
        Child child = childRepository.findById(childId).orElseThrow(() -> new CustomServiceException("Child not found"));
        Scheduler scheduler = schedulerRepository.findById(reminderId).orElseThrow(() -> new CustomServiceException("One Time Scheduler Not Found!"));

        reminderScheduler.deleteSchedule(scheduler.getId());

        //Update database
        schedulerRepository.delete(scheduler);
    }

    @Override
    public List<ScheduledEventDetailsDto> getScheduledTasksForWeb(long childId) {
        Child child = childRepository.findById(childId).orElseThrow(() -> new CustomServiceException("Child not found"));
        List<Scheduler> tasks = schedulerRepository.findAllByChildOrderByDateAsc(child);

        List<ScheduledEventDetailsDto> eventDetails = new ArrayList<>();

        if (tasks != null && tasks.size() > 0) {
            ScheduledEventDetailsDto singleDay = new ScheduledEventDetailsDto();
            LocalDate date = tasks.get(0).getDate();
            singleDay.setDate(date);

            for (Scheduler t : tasks) {
                if (!t.getDate().equals(date)) {
                    date = t.getDate();
                    eventDetails.add(singleDay);
                    singleDay = new ScheduledEventDetailsDto();
                    singleDay.setDate(date);
                }
                singleDay.setEvent(new SingleScheduledEventDto(
                        t.getId(),
                        t.getNote(),
                        getMillisecondsFromLocalDateTime(t.getFromTime()),
                        getMillisecondsFromLocalDateTime(t.getToTime()),
                        getMillisecondsFromLocalDateTime(t.getRemindTime())));
            }
            eventDetails.add(singleDay);
        }
        return eventDetails;
    }

    @Override
    public OneTimeSchedulerDto getUpcomingScheduledTask(long childId) {
        Scheduler task = schedulerRepository.getUpcomingScheduledTask(childId);
        if (task == null) return null;
        return new OneTimeSchedulerDto(
                task.getId(),
                task.getDate().toString(),
                task.getNote(),
                task.getRemindTime().toString(),
                task.getFromTime().toString(),
                task.getToTime().toString()
        );
    }

    private long getMillisecondsFromLocalDateTime(LocalDateTime dateTime) {
        ZonedDateTime zdt = ZonedDateTime.of(dateTime, ZoneId.systemDefault());
        return zdt.toInstant().toEpochMilli();
    }
}
