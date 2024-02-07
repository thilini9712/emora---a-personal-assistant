package com.uwu.emora.entity;

import com.uwu.emora.enums.Day;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Timetable {

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private Day day;

    private String fromTime;
    private String toTime;
    private String task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Child child;
}
