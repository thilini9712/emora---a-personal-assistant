package com.uwu.emora.service;

import com.uwu.emora.dto.child.ChildDto;
import org.springframework.stereotype.Service;

@Service
public interface ChildService {
    void updateChild(ChildDto childDto);

    ChildDto getChildDetails(long id);
}
