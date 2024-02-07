package com.uwu.emora.service.impl;

import com.uwu.emora.dto.child.ChildDto;
import com.uwu.emora.entity.Child;
import com.uwu.emora.exception.CustomServiceException;
import com.uwu.emora.repository.ChildRepository;
import com.uwu.emora.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChildServiceImpl implements ChildService {

    private final ChildRepository childRepository;

    @Override
    public void updateChild(ChildDto childDto) {
        Optional<Child> optionalChild = childRepository.findById(childDto.getId());
        if (optionalChild.isPresent()) {
            Child child = optionalChild.get();
            child.setFirstName(childDto.getFirstName());
            child.setLastName(childDto.getLastName());
            child.setEmergencyContactNumber(childDto.getEmergencyContactNumber());
            child.setGender(childDto.getGender());
            child.setAge(childDto.getAge());
            child.setAddress(childDto.getAddress());
            childRepository.save(child);
        } else {
            throw new CustomServiceException("Child not found!");
        }
    }

    @Override
    public ChildDto getChildDetails(long id) {
        Optional<Child> optionalChild = childRepository.findById(id);
        if (optionalChild.isPresent()) {
            Child child = optionalChild.get();
            ChildDto childDto = new ChildDto();
            childDto.setId(child.getId());
            childDto.setFirstName(child.getFirstName());
            childDto.setLastName(child.getLastName());
            childDto.setEmergencyContactNumber(child.getEmergencyContactNumber());
            childDto.setGender(child.getGender());
            childDto.setAge(child.getAge());
            childDto.setAddress(child.getAddress());
            return childDto;
        } else {
            throw new CustomServiceException("Child not found!");
        }
    }
}
