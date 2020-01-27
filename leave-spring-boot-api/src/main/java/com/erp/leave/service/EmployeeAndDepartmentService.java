package com.erp.leave.service;

import com.erp.leave.model.EmployeeAndDepartment;
import com.erp.leave.repository.EmployeeDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeAndDepartmentService {
    @Autowired
    EmployeeDepartmentRepository employeeDepartmentRepository;

    public List<String> showEmployee(){
        List<String> employeeAndDepartmentList = employeeDepartmentRepository.findALLEmployee();
            return employeeAndDepartmentList;

    }

    public List<String> showDepartment() {
        List<String> employeeAndDepartmentList = employeeDepartmentRepository.findAllDepartment();
        return employeeAndDepartmentList;
    }

    public List<String> showLeaveType() {
        List<String> employeeAndDepartmentList = employeeDepartmentRepository.findAllLeaveType();
        return employeeAndDepartmentList;
    }
}
