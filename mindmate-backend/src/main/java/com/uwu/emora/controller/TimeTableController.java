package com.uwu.emora.controller;

import com.uwu.emora.dto.CommonResponse;
import com.uwu.emora.dto.timetable.TimetableRecordDto;
import com.uwu.emora.enums.Day;
import com.uwu.emora.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user/timetable")
@CrossOrigin
public class TimeTableController {

    private final TimetableService timetableService;

    //    Add daily timetable tasks
    @PostMapping(value = "")
    public ResponseEntity addTimetableRecord(@RequestBody TimetableRecordDto timetableRecordDto) {
        timetableService.addTimetableRecord(timetableRecordDto);
        return ResponseEntity.ok(new CommonResponse<>(true, "Timetable Record Added Successfully"));
    }

    //    Edit timetable records
    @PutMapping(value = "")
    public ResponseEntity updateTimetableRecord(@RequestBody TimetableRecordDto timetableRecordDto) {
        timetableService.updateTimetableRecord(timetableRecordDto);
        return ResponseEntity.ok(new CommonResponse<>(true, "Timetable Record Updated Successfully"));
    }

    //    Delete timetable records
    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteTimetableRecord(@PathVariable("id") String id) {
        timetableService.deleteTimetableRecord(id);
        return ResponseEntity.ok(new CommonResponse<>(true, "Timetable Record Deleted Successfully"));
    }

    //    View timetable
    @GetMapping(value = "/{day}/{childId}")
    public ResponseEntity getTimetableRecordsForDay(@PathVariable("day") Day day,@PathVariable("childId") long childId) {
        List<TimetableRecordDto> timetableRecordsForDay = timetableService.getTimetableRecordsForDay(day,childId);
        return ResponseEntity.ok(new CommonResponse<>(true, timetableRecordsForDay));
    }

    // TODO    Send reminders for timetable tasks
}
