package com.uwu.emora.dto.parent;

import com.uwu.emora.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParentDto {
    private long id;
    private String firstName;
    private String lastName;
    private String address;
    private String emergencyContactNumber;
    private Gender gender;
    private int age;
    private String relationship;
}
