DROP DATABASE IF EXISTS Barkweb;
CREATE DATABASE BarkWeb;
USE BarkWeb;

DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS violations;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS colleges;

CREATE TABLE colleges(
	college_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
	college_code VARCHAR(10) UNIQUE NOT NULL, 
	college_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student(
	student_id VARCHAR(20) PRIMARY KEY,
	student_name VARCHAR(100) NOT NULL,
	block VARCHAR(10) NOT NULL,
	year_level INT NOT NULL,
	program VARCHAR(100),  -- ✅ Added program column here!
	photo_folder VARCHAR(255),
	face_encoding_path VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects(
	subject_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	subject_code VARCHAR(20) UNIQUE NOT NULL,
	subject_name VARCHAR(100) UNIQUE NOT NULL,
	units INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room (
    room_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL,             
    building VARCHAR(50),
    capacity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedules(
	schedule_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	subject_id BIGINT NOT NULL,
	room_id BIGINT NOT NULL, 
	day_of_week INT NOT NULL COMMENT '1=Monday, 6=Saturday',
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	professor VARCHAR(100) NOT NULL,
	block VARCHAR(10),
	FOREIGN KEY(subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
	FOREIGN KEY(room_id) REFERENCES room(room_id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
	enrollment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	student_id VARCHAR(20) NOT NULL,
	schedule_id BIGINT NOT NULL,
	FOREIGN KEY(schedule_id) REFERENCES schedules(schedule_id) ON DELETE CASCADE,
	FOREIGN KEY(student_id) REFERENCES student(student_id) ON DELETE CASCADE,
	UNIQUE KEY unique_enrollment (student_id, schedule_id)
);

CREATE TABLE attendance (
	attendance_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	student_id VARCHAR(20) NOT NULL,
	schedule_id BIGINT NOT NULL,
	timestamp DATETIME NOT NULL,
	status ENUM('present','late','absent') NOT NULL,
	uniform_compliant BOOLEAN DEFAULT TRUE, 
	photo_evidence VARCHAR(255),
	FOREIGN KEY(student_id) REFERENCES student(student_id),
	FOREIGN KEY(schedule_id) REFERENCES schedules(schedule_id),
	INDEX idx_student_date(student_id, timestamp),
	INDEX idx_schedule_date(schedule_id, timestamp)
);

CREATE TABLE violations (
	violation_number BIGINT AUTO_INCREMENT PRIMARY KEY,
	student_id VARCHAR(20) NOT NULL,
	violation_type VARCHAR(100),
	missing_items VARCHAR(255),
	timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(student_id) REFERENCES student(student_id) 
);

-- Insert data
INSERT INTO colleges (college_code, college_name) VALUES
('CCIT', 'College of Computing and Information Technology'),
('CEAS', 'College of Education, Arts and Sciences'),
('CBA', 'College of Business and Accountancy'),
('CAH','College of Allied Health'),
('COA', 'College of Architecture'),
('COE', 'College of Engineering'),
('CTHM', 'College of Tourism and Hospitality Management');

INSERT INTO room (room_number, building, capacity) VALUES
('501', 'MB', 40),
('410','MB', 40),
('517', 'MB', 40);

INSERT INTO subjects (subject_code, subject_name, units) VALUES
('CTINFGML', 'Information Management', 3),
('CCOMPORG', 'Computer Organization and Architecture', 3),
('CCMATAN2', 'Mathematical Analysis II', 3);

INSERT INTO schedules (subject_id, room_id, day_of_week, start_time, end_time, professor, block) VALUES
(1, 1, 2, '12:20', '15:00', 'Prof. Valdez', 'COM242'),
(1, 2, 5, '10:00', '11:30', 'Prof. Valdez', 'COM242'),
(2, 2, 2, '07:00', '09:00', 'Prof. Ku', 'COM242'),
(3, 3, 3, '09:00', '11:00', 'Prof. Ku', 'COM242');

-- ✅ Insert students WITH program field
INSERT INTO student (student_id, student_name, block, year_level, program, photo_folder, face_encoding_path) VALUES
('2024-1005618', 'Pamela Babaran', 'COM242', 2, 'BS Computer Science', 'photos/Pamela_Babaran', 'encodings/Pamela_Babaran.pkl'),
('2024-1009336', 'Flora Mae Openiano', 'COM242', 2, 'BS Computer Science', 'photos/Flora_Openiano', 'encodings/Flora_Openiano.pkl'),
('2024-1006541', 'Mielle Bautista', 'COM242', 2, 'BS Computer Science', 'photos/Mielle_Bautista', 'encodings/Mielle_Bautista.pkl');

INSERT INTO enrollments (student_id, schedule_id) VALUES
('2024-1005618', 1),
('2024-1005618', 2),
('2024-1005618', 3),
('2024-1006541', 1),
('2024-1006541', 2),
('2024-1006541', 3),
('2024-1009336', 1),
('2024-1009336', 2),
('2024-1009336', 3);

INSERT INTO attendance (student_id, schedule_id, timestamp, status, uniform_compliant) VALUES
('2024-1005618', 1, '2026-01-06 10:05:00', 'present', TRUE),
('2024-1005618', 2, '2026-01-06 10:05:00', 'present', TRUE),
('2024-1005618', 3, '2026-01-06 10:05:00', 'present', TRUE),
('2024-1006541', 1, '2026-01-06 10:06:00', 'present', FALSE),
('2024-1006541', 2, '2026-01-06 10:15:00', 'late', FALSE),
('2024-1006541', 3, '2026-01-06 10:05:00', 'present', TRUE),
('2024-1009336', 1, '2026-01-06 10:06:00', 'present', FALSE),
('2024-1009336', 2, '2026-01-06 10:15:00', 'present', FALSE),
('2024-1009336', 3, '2026-01-06 10:05:00', 'present', TRUE);

INSERT INTO violations (student_id, violation_type, missing_items) VALUES
('2024-1005618', 'incomplete_uniform', 'Pants'),
('2024-1009336', 'incomplete_uniform', 'Blue Polo');

-- Verify
SHOW TABLES;
DESCRIBE student;
SELECT * FROM student;