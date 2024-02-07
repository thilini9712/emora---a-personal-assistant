package com.uwu.emora.controller;

import com.uwu.emora.dto.CommonResponse;
import com.uwu.emora.dto.parent.ParentDto;
import com.uwu.emora.dto.parent.PasswordChangeDto;
import com.uwu.emora.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user/parent")
@CrossOrigin
public class ParentController {

    private final ParentService parentService;

    @PutMapping(value = "")
    public ResponseEntity updateParent(@RequestBody ParentDto parentDto) {
        parentService.updateParent(parentDto);
        return ResponseEntity.ok(new CommonResponse<>(true, "Parent Details Updated Successfully"));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getParentDetails(@PathVariable("id") long id) {
        System.out.println("Get Parent Details");
        ParentDto parentDetails = parentService.getParentDetails(id);
        return ResponseEntity.ok(new CommonResponse<>(true, parentDetails));
    }

    @PutMapping(value = "/password/change")
    public ResponseEntity changePassword(@RequestBody PasswordChangeDto passwordChangeDto) {
        parentService.changePassword(passwordChangeDto);
        return ResponseEntity.ok(new CommonResponse<>(true, "Password Changed Successfully"));
    }
}
