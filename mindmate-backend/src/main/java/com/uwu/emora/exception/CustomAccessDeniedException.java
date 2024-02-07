package com.uwu.emora.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.access.AccessDeniedException;

/**
 * Created by :- Intellij Idea
 * Author :- Tharindu
 * Date :- 2020-05-07
 */
@Getter
@Setter
@ToString
public class CustomAccessDeniedException extends AccessDeniedException {

    private int status;
    private String message;

    public CustomAccessDeniedException(int status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
