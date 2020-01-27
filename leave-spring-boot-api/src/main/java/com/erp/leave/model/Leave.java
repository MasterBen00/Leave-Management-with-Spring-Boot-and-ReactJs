package com.erp.leave.model;


import com.erp.leave.enums.LeaveStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "leave_information")
public class Leave {

    @Id
    @Column(name = "leave_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveid;

    @Column(name = "employee_name", nullable = false)
    private String employeeName;


    @Column(name = "request_type", nullable = false)
    private String requestType;


    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "leave_type", nullable = false)
    private String leaveType;

    @Column(name = "mode")
    private String mode;

    @Column(name = "comment" , columnDefinition = "TEXT")
    private String comment;


    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private LeaveStatus status;

    @Column(name = "number_days")
    private Long numberOfDays;



}
