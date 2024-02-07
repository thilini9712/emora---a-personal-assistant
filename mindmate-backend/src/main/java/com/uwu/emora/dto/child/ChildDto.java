package com.uwu.emora.dto.child;

import com.uwu.emora.enums.Gender;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChildDto {
    private long id;
    private String firstName;
    private String lastName;
    private String address;
    private String emergencyContactNumber;
    private Gender gender;
    private int age;
    private String parentName;
}
