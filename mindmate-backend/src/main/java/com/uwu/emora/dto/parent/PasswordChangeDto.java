package com.uwu.emora.dto.parent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChangeDto {

    private long id;
    private String currentPassword;
    private String newPassword;
}
