CREATE TABLE favorite_lessons
(
    id         CHAR(22) NOT NULL,
    learner_id CHAR(22) NOT NULL,
    lesson_id  CHAR(22) NOT NULL,
    CONSTRAINT pk_favorite_lessons PRIMARY KEY (id)
);

ALTER TABLE favorite_lessons
    ADD CONSTRAINT uc_fl_learner_and_lesson UNIQUE (learner_id, lesson_id);

ALTER TABLE favorite_lessons
    ADD CONSTRAINT FK_FAVORITE_LESSONS_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id) ON DELETE CASCADE;

ALTER TABLE favorite_lessons
    ADD CONSTRAINT FK_FAVORITE_LESSONS_ON_LESSON FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE;