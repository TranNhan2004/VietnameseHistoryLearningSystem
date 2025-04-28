CREATE TABLE learners
(
    id           CHAR(22)                                                NOT NULL,
    learner_rank ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL DEFAULT 'BEGINNER',
    point        INT                                                     NOT NULL DEFAULT 0,
    best_score   INT                                                     NULL,
    worst_score  INT                                                     NULL,
    CONSTRAINT pk_learners PRIMARY KEY (id)
);

ALTER TABLE learners
    ADD CONSTRAINT FK_LEARNERS_ON_ID FOREIGN KEY (id) REFERENCES base_users (id) ON DELETE CASCADE;