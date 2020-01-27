package com.erp.leave.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "employee_dept")
public class EmployeeAndDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_name")
    private String employeeName;

    @Column(name = "department")
    private String department;

    @Column(name = "Leave_type")
    private String leaveType;


}
