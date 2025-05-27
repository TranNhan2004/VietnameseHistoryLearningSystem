CREATE TABLE questions
(
    id        CHAR(22) NOT NULL,
    content   TEXT     NOT NULL,
    lesson_id CHAR(22) NULL,
    CONSTRAINT pk_questions PRIMARY KEY (id)
);

ALTER TABLE questions
    ADD CONSTRAINT FK_QUESTIONS_ON_LESSON FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE SET NULL;