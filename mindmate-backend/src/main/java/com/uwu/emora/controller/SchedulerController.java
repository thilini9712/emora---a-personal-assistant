package com.uwu.emora.controller;

import com.uwu.emora.dto.CommonResponse;
import com.uwu.emora.dto.scheduler.OneTimeSchedulerDto;
import com.uwu.emora.dto.scheduler.ScheduledEventDetailsDto;
import com.uwu.emora.service.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user/scheduler")
@CrossOrigin
public class SchedulerController {

    private final SchedulerService schedulerService;

    //    Schedule new tasks
    @PostMapping(value = "/onetime/{childId}")
    public ResponseEntity scheduleOnetime(@PathVariable("childId") long childId, @RequestBody OneTimeSchedulerDto dto) {
        schedulerService.scheduleOnetime(dto, childId);
        return ResponseEntity.ok(new CommonResponse<>(true, "Onetime Reminder Added Successfully"));
    }

    //   View calendar with scheduled tasks (web)
    @GetMapping(value = "/tasks/web/{childId}")
    public ResponseEntity getScheduledTasksForWeb(@PathVariable("childId") long childId) {
        List<ScheduledEventDetailsDto> tasks = schedulerService.getScheduledTasksForWeb(childId);
        return ResponseEntity.ok(new CommonResponse<>(true, tasks));
    }

    //   View calendar with scheduled tasks
    @GetMapping(value = "/tasks/{childId}")
    public ResponseEntity getScheduledTasks(@PathVariable("childId") long childId) {
        List<OneTimeSchedulerDto> tasks = schedulerService.getScheduledTasks(childId);
        return ResponseEntity.ok(new CommonResponse<>(true, tasks));
    }

    //  Edit scheduled tasks
    @PutMapping(value = "/onetime/{childId}")
    public ResponseEntity editScheduledTask(@PathVariable("childId") long childId, @RequestBody OneTimeSchedulerDto dto) {
        schedulerService.editScheduledTask(dto, childId);
        return ResponseEntity.ok(new CommonResponse<>(true, "Onetime Reminder Updated Successfully"));
    }

    //  Delete scheduled tasks
    @DeleteMapping(value = "/onetime/{childId}/{reminderId}")
    public ResponseEntity deleteScheduledTask(@PathVariable("childId") long childId, @PathVariable("reminderId") String reminderId) {
        schedulerService.deleteScheduledTask(reminderId, childId);
        return ResponseEntity.ok(new CommonResponse<>(true, "Onetime Reminder Deleted Successfully"));
    }

    @GetMapping(value = "/upcoming/{childId}")
    public ResponseEntity getUpcomingScheduledTask(@PathVariable long childId) {
        OneTimeSchedulerDto upcomingScheduledTask = schedulerService.getUpcomingScheduledTask(childId);
        return ResponseEntity.ok(new CommonResponse<>(true, upcomingScheduledTask));
    }
}
