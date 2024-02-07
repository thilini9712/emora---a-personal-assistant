package com.uwu.emora.repository;

import com.uwu.emora.entity.Child;
import com.uwu.emora.entity.Timetable;
import com.uwu.emora.enums.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, String> {

    List<Timetable> findTimetablesByDayAndChildOrderByFromTime(Day day, Child child);

    Timetable findTimetableByDayAndFromTimeAndToTime(Day day, String fromTime, String toTime);

    @Query(value = "select id from timetable",nativeQuery = true)
    List<String> getAllIDs();
}
