package com.uwu.emora.entity;

import com.uwu.emora.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;
    private int age;
    private String address;
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String relationship;
    private String username;
    private String password;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Child> children;
}
