package com.uwu.emora.service;

import com.uwu.emora.dto.parent.ParentDto;
import com.uwu.emora.dto.parent.PasswordChangeDto;
import org.springframework.stereotype.Service;

@Service
public interface ParentService {
    void updateParent(ParentDto parentDto);

    ParentDto getParentDetails(long id);

    void changePassword(PasswordChangeDto passwordChangeDto);
}
