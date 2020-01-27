package com.erp.leave.controller;

import com.erp.leave.enums.LeaveStatus;
import com.erp.leave.model.Leave;
import com.erp.leave.repository.LeaveRepository;
import com.erp.leave.service.LeaveService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.annotation.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class LeaveControllerTest {
    private static final ObjectMapper om = new ObjectMapper();

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String startDate = "2020-01-01";
    String endDate = "2020-01-02";
    LocalDate fromDate =LocalDate.parse(startDate,formatter);
    LocalDate toDate=LocalDate.parse(endDate,formatter);

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeaveRepository mockRepository;

    @MockBean
    private LeaveService mockLeaveService;

    @Before("test")
    public void init() throws ParseException {
        Leave leave = new Leave(1L, "beniamin", "leave request", "description", "sales",
                "sick leave", "by employee", "comment", fromDate, toDate, LeaveStatus.APPROVED, 2L);
        when(mockRepository.findById(1L)).thenReturn(Optional.of(leave));
    }

    @org.junit.Test
    public void find_leaveIdNotFound_404() throws Exception {
        mockMvc.perform(get("/appDetail/")).andExpect(status().isNotFound());
    }


    @org.junit.Test
    public void find_leaveId_OK() throws Exception {
        Leave leave = new Leave(1L, "beniamin", "leave request", "description", "sales",
                "sick leave", "by employee", "comment", fromDate, toDate, LeaveStatus.APPROVED, 2L);
        when(mockLeaveService.showAppDetail(1L)).thenReturn(leave);

        mockMvc.perform(get("/api/appDetail/1")
                .contentType(MediaType.APPLICATION_JSON))
                /*.andDo(print())*/
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.leaveid", is(1)))
                .andExpect(jsonPath("$.employeeName", is("beniamin")))
                .andExpect(jsonPath("$.requestType", is("leave request")))
                .andExpect(jsonPath("$.fromDate", is("2020-01-01")))
                .andExpect(jsonPath("$.toDate", is("2020-01-02")))
                .andExpect(jsonPath("$.department", is("sales")))
                .andExpect(jsonPath("$.description", is("description")))
                .andExpect(jsonPath("$.leaveType", is("sick leave")))
                .andExpect(jsonPath("$.mode", is("by employee")))
                .andExpect(jsonPath("$.comment", is("comment")))
                .andExpect(jsonPath("$.status", is("APPROVED")))
                .andExpect(jsonPath("$.numberOfDays", is(2)));

        verify(mockLeaveService, times(1)).showAppDetail(1L);

    }

    @org.junit.Test
    public void save_leave_OK() throws Exception {

        Leave leave = new Leave(1L, "beniamin", "leave request", "description", "sales",
                "sick leave", "by employee", "comment", fromDate, toDate, LeaveStatus.APPROVED, 2L);
        when(mockLeaveService.createApp(any(Leave.class))).thenReturn(leave);

        mockMvc.perform(post("/api/create")
                .content(om.writeValueAsString(leave))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                //.accept(MediaType.APPLICATION_JSON))
                /*.andDo(print())*/
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.leaveid", is(1)))
                .andExpect(jsonPath("$.employeeName", is("beniamin")))
                .andExpect(jsonPath("$.requestType", is("leave request")))
                .andExpect(jsonPath("$.fromDate", is("2020-01-01")))
                .andExpect(jsonPath("$.toDate", is("2020-01-02")))
                .andExpect(jsonPath("$.department", is("sales")))
                .andExpect(jsonPath("$.description", is("description")))
                .andExpect(jsonPath("$.leaveType", is("sick leave")))
                .andExpect(jsonPath("$.mode", is("by employee")))
                .andExpect(jsonPath("$.comment", is("comment")))
                .andExpect(jsonPath("$.status", is("APPROVED")))
                .andExpect(jsonPath("$.numberOfDays", is(2)));

        verify(mockLeaveService, times(1)).createApp(any(Leave.class));

    }

    @org.junit.Test
    public void delete_leave_OK() throws Exception {
        Leave leave = new Leave(1L, "beniamin", "leave request", "description", "sales",
                "sick leave", "by employee", "comment", fromDate, toDate, LeaveStatus.APPROVED, 2L);

        doNothing().when(mockLeaveService).deleteApp(leave);

        mockMvc.perform(delete("/api/app/delete/1"))
                /*.andDo(print())*/
                .andExpect(status().isOk());

        verify(mockLeaveService, times(1)).showAppDetail(1L);
    }

    @org.junit.Test
    public void update_Leave_OK() throws Exception {

        Leave leave = new Leave(1L, "beniamin", "leave request", "description", "sales",
                "sick leave", "by employee", "comment", fromDate, toDate, LeaveStatus.APPROVED, 2L);
        when(mockLeaveService.updateApp(any(Leave.class), any(Leave.class))).thenReturn(leave);

        mockMvc.perform(put("/api/app/edit/1")

                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.leaveid", is(1)))
                .andExpect(jsonPath("$.employeeName", is("beniamin")))
                .andExpect(jsonPath("$.requestType", is("leave request")))
                .andExpect(jsonPath("$.fromDate", is("2020-01-01")))
                .andExpect(jsonPath("$.toDate", is("2020-01-02")))
                .andExpect(jsonPath("$.department", is("sales")))
                .andExpect(jsonPath("$.description", is("description")))
                .andExpect(jsonPath("$.leaveType", is("sick leave")))
                .andExpect(jsonPath("$.mode", is("by employee")))
                .andExpect(jsonPath("$.comment", is("comment")))
                .andExpect(jsonPath("$.status", is("APPROVED")))
                .andExpect(jsonPath("$.numberOfDays", is(2)));

        verify(mockLeaveService, times(1)).updateApp(any(Leave.class), any(Leave.class));


    }
}