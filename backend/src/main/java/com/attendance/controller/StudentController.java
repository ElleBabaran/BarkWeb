package com.attendance.controller;

import com.attendance.model.Student;
import com.attendance.repository.StudentRepository;
import com.attendance.dto.StudentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentRepository.findAll());
    }

    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody StudentDTO dto) {
        if (studentRepository.existsById(dto.getStudentId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Student student = new Student();
        student.setStudentId(dto.getStudentId());
        student.setStudentName(dto.getStudentName());
        student.setYearLevel(dto.getYearLevel());
        student.setBlock(dto.getBlock());
        student.setProgram(dto.getProgram());
        student.setPhotoFolder(dto.getPhotoFolder());
        student.setFaceEncodingPath(dto.getFaceEncodingPath());

        Student saved = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable String id,
            @RequestBody StudentDTO dto) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setStudentName(dto.getStudentName());
                    student.setYearLevel(dto.getYearLevel());
                    student.setBlock(dto.getBlock());
                    student.setProgram(dto.getProgram());
                    student.setPhotoFolder(dto.getPhotoFolder());
                    student.setFaceEncodingPath(dto.getFaceEncodingPath());
                    return ResponseEntity.ok(studentRepository.save(student));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
