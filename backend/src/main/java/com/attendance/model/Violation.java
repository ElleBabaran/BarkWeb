package com.attendance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "violations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Violation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "violation_number")
    private Long violationNumber;
    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @Column(name = "violation_type", length = 100)
    private String violationType;
    
    @Column(name = "missing_items", length = 255)
    private String missingItems;
    
    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}