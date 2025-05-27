CREATE TABLE learners
(
    id          CHAR(22)                                                NOT NULL,
    `rank`      ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL DEFAULT 'BEGINNER',
    point       INT                                                     NOT NULL DEFAULT 0 CHECK ( point >= 0 ),
    best_score  DOUBLE                                                  NULL,
    worst_score DOUBLE                                                  NULL,
    CONSTRAINT pk_learners PRIMARY KEY (id)
);

ALTER TABLE learners
    ADD CONSTRAINT FK_LEARNERS_ON_ID FOREIGN KEY (id) REFERENCES base_users (id);