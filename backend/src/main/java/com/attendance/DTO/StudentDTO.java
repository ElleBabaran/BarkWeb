package com.attendance.dto;

public class StudentDTO {
    private String studentId;
    private String studentName;
    private Integer yearLevel;
    private String block;
    private String program;
    private String photoFolder;
    private String faceEncodingPath;

    // Getters & Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public Integer getYearLevel() { return yearLevel; }
    public void setYearLevel(Integer yearLevel) { this.yearLevel = yearLevel; }

    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public String getPhotoFolder() { return photoFolder; }
    public void setPhotoFolder(String photoFolder) { this.photoFolder = photoFolder; }

    public String getFaceEncodingPath() { return faceEncodingPath; }
    public void setFaceEncodingPath(String faceEncodingPath) { this.faceEncodingPath = faceEncodingPath; }
}
