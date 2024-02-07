package com.uwu.emora.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Scheduler {

    @Id
    private String id;

    private LocalDate date;
    private String note;
    private LocalDateTime remindTime;
    private LocalDateTime fromTime;
    private LocalDateTime toTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Child child;
}
