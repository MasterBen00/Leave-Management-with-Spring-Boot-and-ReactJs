package com.erp.leave.controller;


import com.erp.leave.exception.ResourceNotFoundException;
import com.erp.leave.model.Leave;
import com.erp.leave.repository.LeaveRepository;
import com.erp.leave.service.EmployeeAndDepartmentService;
import com.erp.leave.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RestController
//@RequestMapping("/api")
public class LeaveController {
    @Autowired
    LeaveRepository leaveRepository;

    @Autowired
    LeaveService leaveService;

    @Autowired
    EmployeeAndDepartmentService employeeAndDepartmentService;

    @PostMapping("/create")
    //@ResponseStatus(HttpStatus.CREATED)
    public Leave createLeaveApp(@Valid @RequestBody Leave leave) {

        return leaveService.createApp(leave);
    }

    @GetMapping("/allApp")
    public List<Leave> getAllEmployees() {
        return leaveService.getAllApp();
    }

    @GetMapping("/appDetail/{id}")
    public ResponseEntity<Leave> getEmployeeById(@PathVariable(value = "id") Long leaveID)
            throws ResourceNotFoundException {
        Leave leave = leaveService.showAppDetail(leaveID);
                //.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + leaveID));
        return ResponseEntity.ok().body(leave);
    }

    @PutMapping("/app/edit/{id}")
    public ResponseEntity<Leave> updateLeave(@PathVariable(value = "id") Long leaveId,
                                                   @Valid @RequestBody Leave leaveDetails) throws ResourceNotFoundException {


        Leave leave = leaveService.showAppDetail(leaveId);
                //.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + leaveId));

       Leave updatedLeave = leaveService.updateApp(leave, leaveDetails);
        return ResponseEntity.ok(updatedLeave);
    }

    @PutMapping("/app/updateStatus/{id}")
    public Leave updateStatus(@PathVariable(value = "id") Long leaveId){
        Leave leave = leaveService.updateStatustoApproved(leaveId);
        return leave;
    }
    @PutMapping("/app/updateStatustoApproved/{id}")
    public Leave updateStatustoToApproved(@PathVariable(value = "id") Long leaveId){
        Leave leave = leaveService.updateStatustoToApproved(leaveId);
        return leave;
    }
    @PutMapping("/app/updateStatustoRefuse/{id}")
    public Leave updateStatusRefuse(@PathVariable(value = "id") Long leaveId){
        Leave leave = leaveService.updateStatustoRefuse(leaveId);
        return leave;
    }

    @DeleteMapping("/app/delete/{id}")
    public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") Long leaveId)
            throws ResourceNotFoundException {
        Leave leave = leaveService.showAppDetail(leaveId);
        //.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));

        leaveService.deleteApp(leave);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/employee")
    public List<String> showEmployee(){
        return employeeAndDepartmentService.showEmployee();
    }

    @GetMapping("/department")
    public List<String> showDepartment(){
        return employeeAndDepartmentService.showDepartment();
    }

    @GetMapping("/leaveType")
    public List<String> showLeaveType(){
        return employeeAndDepartmentService.showLeaveType();
    }
}
