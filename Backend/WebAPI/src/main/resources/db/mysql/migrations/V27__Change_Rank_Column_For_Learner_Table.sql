ALTER TABLE learners
    ADD learner_rank VARCHAR(255) NULL;

ALTER TABLE learners
    MODIFY learner_rank VARCHAR(255) NOT NULL;

ALTER TABLE learners
    DROP COLUMN `rank`;