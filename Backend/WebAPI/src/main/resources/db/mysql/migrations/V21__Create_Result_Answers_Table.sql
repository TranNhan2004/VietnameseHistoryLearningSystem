ALTER TABLE learner_contest_answers
    DROP FOREIGN KEY FK_LEARNER_CONTEST_ANSWERS_ON_ANSWER_OPTION;

ALTER TABLE learner_contest_answers
    DROP FOREIGN KEY FK_LEARNER_CONTEST_ANSWERS_ON_CONTEST;

ALTER TABLE learner_contest_answers
    DROP FOREIGN KEY FK_LEARNER_CONTEST_ANSWERS_ON_LEARNER;

CREATE TABLE result_answers
(
    id               CHAR(22) NOT NULL,
    result_id        CHAR(22) NOT NULL,
    answer_option_id CHAR(22) NOT NULL,
    CONSTRAINT pk_result_answers PRIMARY KEY (id)
);

ALTER TABLE result_answers
    ADD CONSTRAINT uc_ra_result_and_answer_option UNIQUE (result_id, answer_option_id);

ALTER TABLE result_answers
    ADD CONSTRAINT FK_RESULT_ANSWERS_ON_ANSWER_OPTION FOREIGN KEY (answer_option_id) REFERENCES answer_options (id) ON DELETE CASCADE;

ALTER TABLE result_answers
    ADD CONSTRAINT FK_RESULT_ANSWERS_ON_RESULT FOREIGN KEY (result_id) REFERENCES results (id) ON DELETE CASCADE;

DROP TABLE learner_contest_answers;