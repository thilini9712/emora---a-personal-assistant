package com.uwu.emora.dto.auth;

import com.uwu.emora.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommonUserDetails implements CommonUserAuth {
    private String username;
    private String firstName;
    private String lastName;
    private String mobile;
    private String address;
    private Gender gender;
}
