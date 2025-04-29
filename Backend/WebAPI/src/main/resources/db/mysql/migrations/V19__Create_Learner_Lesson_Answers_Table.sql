CREATE TABLE learner_lesson_answers
(
    id               CHAR(22) NOT NULL,
    learner_id       CHAR(22) NOT NULL,
    lesson_id        CHAR(22) NOT NULL,
    answer_option_id CHAR(22) NOT NULL,
    CONSTRAINT pk_learner_lesson_answers PRIMARY KEY (id)
);

ALTER TABLE learner_lesson_answers
    ADD CONSTRAINT uc_lla_learner_and_lesson_and_answer_option UNIQUE (learner_id, lesson_id, answer_option_id);

ALTER TABLE learner_lesson_answers
    ADD CONSTRAINT FK_LEARNER_LESSON_ANSWERS_ON_ANSWER_OPTION FOREIGN KEY (answer_option_id) REFERENCES answer_options (id) ON DELETE CASCADE;

ALTER TABLE learner_lesson_answers
    ADD CONSTRAINT FK_LEARNER_LESSON_ANSWERS_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id) ON DELETE CASCADE;

ALTER TABLE learner_lesson_answers
    ADD CONSTRAINT FK_LEARNER_LESSON_ANSWERS_ON_LESSON FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE;