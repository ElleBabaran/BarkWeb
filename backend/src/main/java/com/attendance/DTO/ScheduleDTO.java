package com.attendance.dto;

import java.time.LocalTime;

public class ScheduleDTO {
    private Long subjectId;
    private Long roomId;
    private Integer dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private String professor;
    private String block;

    // Getters & Setters
    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public Integer getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }

    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }
}
