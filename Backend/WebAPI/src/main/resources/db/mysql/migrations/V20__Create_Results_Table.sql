CREATE TABLE results
(
    id                    CHAR(22) NOT NULL,
    start_time            DATETIME NOT NULL,
    end_time              DATETIME NOT NULL CHECK ( end_time > start_time ),
    correct_answer_number INT      NOT NULL CHECK ( correct_answer_number >= 0 ),
    score                 DOUBLE   NOT NULL CHECK ( score >= 0 ),
    learner_id            CHAR(22) NOT NULL,
    contest_id            CHAR(22) NOT NULL,
    CONSTRAINT pk_results PRIMARY KEY (id)
);

ALTER TABLE results
    ADD CONSTRAINT uc_results_learner_and_contest UNIQUE (learner_id, contest_id);

ALTER TABLE results
    ADD CONSTRAINT FK_RESULTS_ON_CONTEST FOREIGN KEY (contest_id) REFERENCES contests (id) ON DELETE CASCADE;

ALTER TABLE results
    ADD CONSTRAINT FK_RESULTS_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id) ON DELETE CASCADE;