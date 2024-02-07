package com.uwu.emora.service.impl;

import com.uwu.emora.dto.timetable.TimetableRecordDto;
import com.uwu.emora.entity.Child;
import com.uwu.emora.entity.RobotOutput;
import com.uwu.emora.entity.Timetable;
import com.uwu.emora.enums.Day;
import com.uwu.emora.enums.ResponseType;
import com.uwu.emora.enums.RobotOutputType;
import com.uwu.emora.exception.CustomServiceException;
import com.uwu.emora.quartz.ReminderScheduler;
import com.uwu.emora.repository.ChildRepository;
import com.uwu.emora.repository.RobotOutputRepository;
import com.uwu.emora.repository.TimetableRepository;
import com.uwu.emora.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimetableServiceImpl implements TimetableService {

    private final TimetableRepository timetableRepository;
    private final ChildRepository childRepository;
    private final ReminderScheduler reminderScheduler;
    private final RobotOutputRepository robotOutputRepository;

    @Override
    public void addTimetableRecord(TimetableRecordDto timeTableRecordDto) {
        Timetable existingRecord = timetableRepository
                .findTimetableByDayAndFromTimeAndToTime(
                        timeTableRecordDto.getDay(), timeTableRecordDto.getFromTime(), timeTableRecordDto.getToTime());
        if (existingRecord == null) {

            Child child = childRepository.findById(timeTableRecordDto.getChildId()).orElseThrow(() -> new CustomServiceException("Child Not Found!"));

            String reminderId = UUID.randomUUID().toString();
            List<String> allIDs = timetableRepository.getAllIDs();

            while (true) {
                if (allIDs.contains(reminderId)) {
                    reminderId = UUID.randomUUID().toString();
                } else {
                    break;
                }
            }

            DateTimeFormatter parser = DateTimeFormatter.ofPattern("h:mm a");
            LocalTime localTime = LocalTime.parse(timeTableRecordDto.getFromTime(), parser);
            localTime = localTime.minusMinutes(10);
            int hour = localTime.getHour();
            int min = localTime.getMinute();

            reminderScheduler.scheduleCron(reminderId, timeTableRecordDto.getDay(), hour, min);

            Timetable timetable = new Timetable();
            timetable.setId(reminderId);
            timetable.setDay(timeTableRecordDto.getDay());
            timetable.setFromTime(timeTableRecordDto.getFromTime());
            timetable.setToTime(timeTableRecordDto.getToTime());
            timetable.setTask(timeTableRecordDto.getTask());
            timetable.setChild(child);
            timetableRepository.save(timetable);
        } else {
            throw new CustomServiceException("There is an existing timetable record for the given timeslot!");
        }
    }

    @Override
    public void updateTimetableRecord(TimetableRecordDto timeTableRecordDto) {
        Optional<Timetable> optionalRecord = timetableRepository.findById(timeTableRecordDto.getId());
        if (optionalRecord.isPresent()) {
            Timetable timetable = optionalRecord.get();
            timetable.setDay(timeTableRecordDto.getDay());
            timetable.setFromTime(timeTableRecordDto.getFromTime());
            timetable.setToTime(timeTableRecordDto.getToTime());
            timetable.setTask(timeTableRecordDto.getTask());
            timetableRepository.save(timetable);
        } else {
            throw new CustomServiceException("Timetable Record Not Found!");
        }
    }

    @Override
    public void deleteTimetableRecord(String id) {
        Optional<Timetable> optionalRecord = timetableRepository.findById(id);
        if (optionalRecord.isPresent()) {
            Timetable timetable = optionalRecord.get();
            timetableRepository.delete(timetable);
        } else {
            throw new CustomServiceException("Timetable Record Not Found!");
        }
    }

    @Override
    public List<TimetableRecordDto> getTimetableRecordsForDay(Day day, long childId) {
        Child child = childRepository.findById(childId).orElseThrow(() -> new CustomServiceException("Child Not Found!"));
        return timetableRepository.findTimetablesByDayAndChildOrderByFromTime(day, child)
                .stream()
                .map(tb ->
                        new TimetableRecordDto(
                                tb.getId(),
                                tb.getDay(),
                                tb.getFromTime(),
                                tb.getToTime(),
                                tb.getTask(), childId))
                .collect(Collectors.toList());

    }


    @Override
    public void sendTimetableReminder(String reminderId) {
        Optional<Timetable> optionalTimetable = timetableRepository.findById(reminderId);

        if (optionalTimetable.isPresent()) {
            Timetable timetable = optionalTimetable.get();
            RobotOutput robotOutput = new RobotOutput();
            robotOutput.setResponseType(ResponseType.TEXT);
            robotOutput.setOutputType(RobotOutputType.TIMETABLE);
            robotOutput.setContent(timetable.getTask());


            DateTimeFormatter parser = DateTimeFormatter.ofPattern("h:mm a");
            LocalTime localTime = LocalTime.parse(timetable.getFromTime(), parser);

            robotOutput.setDateTime(getDateTimeByZone(localTime.atDate(LocalDate.now())));
            robotOutputRepository.save(robotOutput);
        }
    }

    public static LocalDateTime getDateTimeByZone(LocalDateTime dateTime) {
        ZoneId oldZone = ZoneId.of("Asia/Colombo");
        ZoneId newZone = ZoneId.of("GMT");
        return dateTime.atZone(oldZone).withZoneSameInstant(newZone).toLocalDateTime();
    }

}
