CREATE TABLE answer_options
(
    id          CHAR(22) NOT NULL,
    content     TEXT     NOT NULL,
    is_correct  BIT(1)   NOT NULL DEFAULT 0,
    question_id CHAR(22) NOT NULL,
    CONSTRAINT pk_answer_options PRIMARY KEY (id)
);

ALTER TABLE answer_options
    ADD CONSTRAINT FK_ANSWER_OPTIONS_ON_QUESTION FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE;