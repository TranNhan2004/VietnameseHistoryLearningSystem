CREATE TABLE contest_questions
(
    id                    CHAR(22) NOT NULL,
    point                 DOUBLE   NOT NULL CHECK ( point > 0 ),
    point_allocation_rule TEXT     NOT NULL DEFAULT '1:1.0',
    contest_id            CHAR(22) NOT NULL,
    question_id           CHAR(22) NOT NULL,
    CONSTRAINT pk_contest_questions PRIMARY KEY (id)
);

ALTER TABLE contest_questions
    ADD CONSTRAINT uc_cq_contest_and_question UNIQUE (contest_id, question_id);

ALTER TABLE contest_questions
    ADD CONSTRAINT FK_CONTEST_QUESTIONS_ON_CONTEST FOREIGN KEY (contest_id) REFERENCES contests (id) ON DELETE CASCADE;

ALTER TABLE contest_questions
    ADD CONSTRAINT FK_CONTEST_QUESTIONS_ON_QUESTION FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE;