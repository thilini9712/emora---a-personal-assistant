package com.uwu.emora.entity;

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
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "emotion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ChildEmotion> childEmotions;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "emotion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Resource> resources;
}
