package com.uwu.emora.entity;

import com.uwu.emora.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;
    private String address;
    private String emergencyContactNumber;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private int age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Parent parent;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Resource> resources;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Scheduler> schedulers;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Timetable> timeTableRecords;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ChildEmotion> childEmotions;
}
