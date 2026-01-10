package com.attendance.repository;

import com.attendance.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudent_StudentId(String studentId);
    List<Attendance> findBySchedule_ScheduleId(Long scheduleId);
    List<Attendance> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
}