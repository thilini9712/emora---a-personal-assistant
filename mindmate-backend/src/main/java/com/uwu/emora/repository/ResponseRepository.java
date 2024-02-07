package com.uwu.emora.repository;

import com.uwu.emora.entity.ChildEmotion;
import com.uwu.emora.entity.Resource;
import com.uwu.emora.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {

    Optional<Response> findByChildEmotion(ChildEmotion emotion);
}
