CREATE TABLE study_progresses
(
    id         CHAR(22)  NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    progress   DOUBLE    NULL,
    learner_id CHAR(22)  NOT NULL,
    lesson_id  CHAR(22)  NOT NULL,
    CONSTRAINT pk_study_progresses PRIMARY KEY (id)
);

ALTER TABLE study_progresses
    ADD CONSTRAINT uc_sp_learner_and_lesson UNIQUE (learner_id, lesson_id);

ALTER TABLE study_progresses
    ADD CONSTRAINT FK_STUDY_PROGRESSES_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id) ON DELETE CASCADE;

ALTER TABLE study_progresses
    ADD CONSTRAINT FK_STUDY_PROGRESSES_ON_LESSON FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE;