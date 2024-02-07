package com.uwu.emora.entity;

import com.uwu.emora.enums.ResponseType;
import com.uwu.emora.enums.RobotOutputType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RobotOutput {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private RobotOutputType outputType;
    private ResponseType responseType;
    private String content;
    @CreationTimestamp
    private LocalDateTime dateTime;
}
