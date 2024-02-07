package com.uwu.emora.controller;

import com.uwu.emora.dto.child.ChildDto;
import com.uwu.emora.dto.CommonResponse;
import com.uwu.emora.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user/child")
@CrossOrigin
public class ChildController {

    private final ChildService childService;

    //http://localhost:8080/child/test
    @GetMapping(value = "/test")
    public ResponseEntity test() {
        return ResponseEntity.ok("Hello Test");
    }

    @PutMapping(value = "")
    public ResponseEntity updateChild(@RequestBody ChildDto childDto) {
        childService.updateChild(childDto);
        return ResponseEntity.ok(new CommonResponse<>(true, "Child Details Updated Successfully"));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getChildDetails(@PathVariable("id") long id) {
        ChildDto childDetails = childService.getChildDetails(id);
        System.out.println(childDetails);
        return ResponseEntity.ok(new CommonResponse<>(true, childDetails));
    }
}

//$2a$10$dDlzpYz52i/HkNy2Fr63L.ceUnQNfcPxExujGY3WdNe3sVaZjy6SS
