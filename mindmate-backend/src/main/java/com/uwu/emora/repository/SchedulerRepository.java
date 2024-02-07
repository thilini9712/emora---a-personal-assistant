package com.uwu.emora.repository;

import com.uwu.emora.entity.Child;
import com.uwu.emora.entity.Scheduler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchedulerRepository extends JpaRepository<Scheduler, String> {

    @Query(value = "SELECT id FROM SCHEDULER", nativeQuery = true)
    List<String> getAllIDs();

    List<Scheduler> findAllByChildOrderByDateAsc(Child child);

    @Query(value = "SELECT * FROM scheduler WHERE CURRENT_DATE=DATE(from_time) AND TIME(from_time)>CURRENT_TIME LIMIT 1",
            nativeQuery = true)
    Scheduler getUpcomingScheduledTask(long childId);
}
