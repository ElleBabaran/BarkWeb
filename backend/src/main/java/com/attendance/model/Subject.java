package com.attendance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long subjectId;
    
    @Column(name = "subject_code", unique = true, nullable = false, length = 20)
    private String subjectCode;
    
    @Column(name = "subject_name", unique = true, nullable = false, length = 100)
    private String subjectName;
    
    @Column(nullable = false)
    private Integer units = 3;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @OneToMany(mappedBy = "subject")
    private Set<Schedule> schedules = new HashSet<>();
}