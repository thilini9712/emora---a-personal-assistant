package com.uwu.emora.service.impl;

import com.uwu.emora.dto.parent.ParentDto;
import com.uwu.emora.dto.parent.PasswordChangeDto;
import com.uwu.emora.entity.Parent;
import com.uwu.emora.exception.CustomServiceException;
import com.uwu.emora.repository.ParentRepository;
import com.uwu.emora.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService {

    private final ParentRepository parentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateParent(ParentDto parentDto) {
        Optional<Parent> optionalParent = parentRepository.findById(parentDto.getId());
        if (optionalParent.isPresent()) {
            Parent parent = optionalParent.get();
            parent.setFirstName(parentDto.getFirstName());
            parent.setLastName(parentDto.getLastName());
            parent.setAddress(parentDto.getAddress());
            parent.setContactNumber(parentDto.getEmergencyContactNumber());
            parent.setGender(parentDto.getGender());
            parent.setAge(parentDto.getAge());
            parent.setRelationship(parentDto.getRelationship());

            parentRepository.save(parent);
        } else {
            throw new CustomServiceException("Parent not found!");
        }
    }

    @Override
    public ParentDto getParentDetails(long id) {
        Optional<Parent> optionalParent = parentRepository.findById(id);
        if (optionalParent.isPresent()) {
            Parent parent = optionalParent.get();
            ParentDto parentDto = new ParentDto();
            parentDto.setId(parent.getId());
            parentDto.setFirstName(parent.getFirstName());
            parentDto.setLastName(parent.getLastName());
            parentDto.setAddress(parent.getAddress());
            parentDto.setEmergencyContactNumber(parent.getContactNumber());
            parentDto.setGender(parent.getGender());
            parentDto.setAge(parent.getAge());
            parentDto.setRelationship(parent.getRelationship());
            return parentDto;
        } else {
            throw new CustomServiceException("Parent not found!");
        }
    }

    @Override
    public void changePassword(PasswordChangeDto passwordChangeDto) {
        Optional<Parent> optionalParent = parentRepository.findById(passwordChangeDto.getId());
        if (optionalParent.isPresent()) {
            Parent parent = optionalParent.get();
            if (passwordEncoder.matches(passwordChangeDto.getCurrentPassword(), parent.getPassword())) {
                parent.setPassword(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
                parentRepository.save(parent);
            } else {
                throw new CustomServiceException("Current Password Doesn't Match!");
            }
        } else {
            throw new CustomServiceException("Parent not found!");
        }
    }
}
