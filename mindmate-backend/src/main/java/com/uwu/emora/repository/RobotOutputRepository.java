package com.uwu.emora.repository;

import com.uwu.emora.entity.RobotOutput;
import com.uwu.emora.enums.RobotOutputType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RobotOutputRepository extends JpaRepository<RobotOutput, Long> {

    Optional<RobotOutput> findTopByOutputTypeOrderByDateTimeDesc(RobotOutputType type);
}
