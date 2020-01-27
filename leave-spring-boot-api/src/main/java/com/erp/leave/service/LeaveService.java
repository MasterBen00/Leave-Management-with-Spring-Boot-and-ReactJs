package com.erp.leave.service;

import com.erp.leave.enums.LeaveStatus;
import com.erp.leave.model.Leave;
import com.erp.leave.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.DAYS;


@Service
public class LeaveService {

    @Autowired
    LeaveRepository leaveRepository;

    public List<Leave> getAllApp(){
        List<Leave> result = (List<Leave>) leaveRepository.findAll();
        if(result.size() > 0){
            return result;
        }
        else{
            return new ArrayList<Leave>();
        }
    }

    public Leave getLeaveById(Long id) throws Exception{

        Optional<Leave> leave = leaveRepository.findById(id);

        if(leave.isPresent()) {
            return leave.get();
        } else {
            throw new Exception("No leave App record exist for given id");
        }
    }

    public Leave showAppDetail(Long leaveId){
        return leaveRepository.findById(leaveId).get();
    }

    public Leave createApp(Leave leave){
        LocalDate fromDate = leave.getFromDate();
        LocalDate toDate = leave.getToDate();
        Long result = DAYS.between(fromDate,toDate)+1;
        leave.setNumberOfDays(result);
        leave.setStatus(LeaveStatus.TOAPPROVED);
        leave.setMode("By Employee");
        return leaveRepository.save(leave);
    }

    public Leave updateApp(Leave entity, Leave oldEntity){
        Optional<Leave> leave = leaveRepository.findById(entity.getLeaveid());

        if(leave.isPresent())
        {
            Leave newEntity = leave.get();
            newEntity.setDescription(oldEntity.getDescription());
            newEntity.setEmployeeName(oldEntity.getEmployeeName());
            newEntity.setFromDate(oldEntity.getFromDate());
            newEntity.setToDate(oldEntity.getToDate());
            LocalDate fromDate = oldEntity.getFromDate();
            LocalDate toDate = oldEntity.getToDate();
            Long result = DAYS.between(fromDate,toDate)+1;
            newEntity.setNumberOfDays(result);

            //newEntity.setNumberOfDays(entity.getNumberOfDays());
            newEntity.setLeaveType(oldEntity.getLeaveType());
            newEntity.setRequestType(oldEntity.getRequestType());
            newEntity.setStatus(oldEntity.getStatus());
            newEntity.setComment(oldEntity.getComment());
            newEntity.setDepartment(oldEntity.getDepartment());


            newEntity = leaveRepository.save(newEntity);

            return newEntity;
        } else {
            entity = leaveRepository.save(entity);

            return entity;
        }
    }

    public Leave updateStatustoToApproved(Long id){
        Leave leave = leaveRepository.findById(id).get();
        LeaveStatus currentStatus=leave.getStatus();
            leave.setStatus(LeaveStatus.TOAPPROVED);

        leaveRepository.save(leave);
        return leave;

    }


    public Leave updateStatustoApproved(Long id){
        Leave leave = leaveRepository.findById(id).get();
        LeaveStatus currentStatus=leave.getStatus();

            leave.setStatus(LeaveStatus.APPROVED);



        leaveRepository.save(leave);
        return leave;

    }

    public Leave updateStatustoRefuse(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId).get();
        LeaveStatus currentStatus=leave.getStatus();
            leave.setStatus(LeaveStatus.REFUSED);

        leaveRepository.save(leave);
        return leave;
    }

    public void deleteApp(Leave leave){
        leaveRepository.delete(leave);
    }
}
