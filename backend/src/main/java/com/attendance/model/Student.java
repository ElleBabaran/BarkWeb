package com.attendance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @Column(name = "student_id", length = 20)
    private String studentId;
    
    @Column(name = "student_name", nullable = false, length = 100)
    private String studentName;
    
    @Column(nullable = false, length = 10)
    private String block;
    
    @Column(name = "year_level", nullable = false)
    private Integer yearLevel;
    
    @Column(length = 100)
    private String program;
    
    @Column(name = "photo_folder", length = 255)
    private String photoFolder;
    
    @Column(name = "face_encoding_path", length = 255)
    private String faceEncodingPath;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @OneToMany(mappedBy = "student")
    private Set<Enrollment> enrollments = new HashSet<>();
    
    @OneToMany(mappedBy = "student")
    private Set<Attendance> attendanceRecords = new HashSet<>();
}