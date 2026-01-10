package com.attendance.controller;

import com.attendance.model.Schedule;
import com.attendance.model.Subject;
import com.attendance.model.Room;
import com.attendance.repository.ScheduleRepository;
import com.attendance.repository.SubjectRepository;
import com.attendance.repository.RoomRepository;
import com.attendance.dto.ScheduleDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "*")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private RoomRepository roomRepository;

    // Get all schedules
    @GetMapping
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleRepository.findAll());
    }

    // Get schedule by ID
    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        return scheduleRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Create new schedule
    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody ScheduleDTO dto) {
        Schedule schedule = new Schedule();

        // Set subject
        Subject subject = subjectRepository.findById(dto.getSubjectId())
            .orElseThrow(() -> new RuntimeException("Subject not found"));
        schedule.setSubject(subject);

        // Set room
        Room room = roomRepository.findById(dto.getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found"));
        schedule.setRoom(room);

        schedule.setDayOfWeek(dto.getDayOfWeek());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setProfessor(dto.getProfessor());
        schedule.setBlock(dto.getBlock());

        Schedule saved = scheduleRepository.save(schedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Update schedule
    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(
            @PathVariable Long id,
            @RequestBody ScheduleDTO dto) {
        return scheduleRepository.findById(id)
            .map(schedule -> {
                // Update subject
                Subject subject = subjectRepository.findById(dto.getSubjectId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
                schedule.setSubject(subject);

                // Update room
                Room room = roomRepository.findById(dto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));
                schedule.setRoom(room);

                schedule.setDayOfWeek(dto.getDayOfWeek());
                schedule.setStartTime(dto.getStartTime());
                schedule.setEndTime(dto.getEndTime());
                schedule.setProfessor(dto.getProfessor());
                schedule.setBlock(dto.getBlock());

                return ResponseEntity.ok(scheduleRepository.save(schedule));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Delete schedule
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
