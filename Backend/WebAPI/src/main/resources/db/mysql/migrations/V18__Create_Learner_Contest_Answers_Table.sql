CREATE TABLE learner_contest_answers
(
    id               CHAR(22) NOT NULL,
    learner_id       CHAR(22) NOT NULL,
    contest_id       CHAR(22) NOT NULL,
    answer_option_id CHAR(22) NOT NULL,
    CONSTRAINT pk_learner_contest_answers PRIMARY KEY (id)
);

ALTER TABLE learner_contest_answers
    ADD CONSTRAINT uc_lca_learner_and_contest_and_answer_option UNIQUE (learner_id, contest_id, answer_option_id);

ALTER TABLE learner_contest_answers
    ADD CONSTRAINT FK_LEARNER_CONTEST_ANSWERS_ON_ANSWER_OPTION FOREIGN KEY (answer_option_id) REFERENCES answer_options (id) ON DELETE CASCADE;

ALTER TABLE learner_contest_answers
    ADD CONSTRAINT FK_LEARNER_CONTEST_ANSWERS_ON_CONTEST FOREIGN KEY (contest_id) REFERENCES contests (id) ON DELETE CASCADE;

ALTER TABLE learner_contest_answers
    ADD CONSTRAINT FK_LEARNER_CONTEST_ANSWERS_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id) ON DELETE CASCADE;