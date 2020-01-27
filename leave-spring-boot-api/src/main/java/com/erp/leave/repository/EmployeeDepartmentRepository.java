package com.erp.leave.repository;

import com.erp.leave.model.EmployeeAndDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EmployeeDepartmentRepository extends JpaRepository<EmployeeAndDepartment, Long> {

    @Query(value = "SELECT employee_name FROM employee_dept where employee_name is not null ", nativeQuery = true)
    List<String> findALLEmployee();

    @Query(value = "SELECT department FROM employee_dept where department is not null", nativeQuery = true)
    List<String> findAllDepartment();

    @Query(value = "SELECT leave_type FROM employee_dept where leave_type is not null", nativeQuery = true)
    List<String> findAllLeaveType();

}
