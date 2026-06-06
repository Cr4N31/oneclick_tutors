-- ============================================================
-- Oneclick Tutors — PostgreSQL Schema
-- DB: oneclick_db | Owner: oneclick_admin
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- STUDENTS
-- ============================================================
CREATE TABLE students (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    programme       VARCHAR(100),
    level           INT CHECK (level IN (100, 200, 300, 400)),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE courses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(20) NOT NULL UNIQUE,  -- e.g. GST101
    title           TEXT NOT NULL,
    programme       VARCHAR(100),
    credit_units    INT DEFAULT 2
);

-- ============================================================
-- STUDENT ↔ COURSE (junction — what courses a student offers)
-- ============================================================
CREATE TABLE student_courses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at     TIMESTAMP DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

-- ============================================================
-- MODULES (belong to a course)
-- ============================================================
CREATE TABLE modules (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_number   INT NOT NULL,
    title           TEXT NOT NULL,
    UNIQUE (course_id, module_number)
);

-- ============================================================
-- UNITS (belong to a module)
-- ============================================================
CREATE TABLE units (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    unit_number     INT NOT NULL,
    title           TEXT NOT NULL,
    raw_text        TEXT,           -- extracted PDF content (Claude reads this)
    pdf_path        TEXT,           -- local path e.g. /pdfs/GST101/module1/unit1.pdf
    extracted_at    TIMESTAMP,
    UNIQUE (module_id, unit_number)
);

-- ============================================================
-- SUMMARIES (AI-generated, cached per unit)
-- ============================================================
CREATE TABLE summaries (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id         UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE UNIQUE,
    overview        TEXT,
    key_concepts    JSONB,          -- ["concept1", "concept2"]
    definitions     JSONB,          -- [{"term": "...", "definition": "..."}]
    keynotes        JSONB,          -- ["keynote1", "keynote2"]
    generated_at    TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- QUESTIONS (AI-generated, cached — reused across students)
-- ============================================================
CREATE TABLE questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_id       UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    unit_id         UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    question        TEXT NOT NULL,
    options         JSONB NOT NULL,  -- ["A. ...", "B. ...", "C. ...", "D. ..."]
    correct_answer  CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
    explanation     TEXT,
    difficulty      VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'pro')),
    generated_at    TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- QUIZ ATTEMPTS (per student, per session)
-- ============================================================
CREATE TABLE quiz_attempts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id),
    module_id       UUID REFERENCES modules(id),    -- null if unit-scoped
    unit_id         UUID REFERENCES units(id),      -- null if module-scoped
    scope           VARCHAR(20) CHECK (scope IN ('unit', 'module')),
    difficulty      VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'pro')),
    score           INT NOT NULL,
    total           INT NOT NULL,
    answers         JSONB,          -- [{question_id, selected, correct}]
    taken_at        TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- EXAM SESSIONS (full course exam — simulates NOUN e-exam)
-- ============================================================
CREATE TABLE exam_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id),
    score           INT NOT NULL,
    total           INT NOT NULL,
    duration_secs   INT,            -- actual time taken
    time_limit_secs INT,            -- NOUN standard e.g. 5400 = 90mins
    answers         JSONB,          -- [{question_id, selected, correct}]
    taken_at        TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INDEXES (for common query patterns)
-- ============================================================
CREATE INDEX idx_modules_course       ON modules(course_id);
CREATE INDEX idx_units_module         ON units(module_id);
CREATE INDEX idx_questions_unit       ON questions(unit_id);
CREATE INDEX idx_questions_module     ON questions(module_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_quiz_student         ON quiz_attempts(student_id);
CREATE INDEX idx_exam_student         ON exam_sessions(student_id);
CREATE INDEX idx_student_courses      ON student_courses(student_id);
