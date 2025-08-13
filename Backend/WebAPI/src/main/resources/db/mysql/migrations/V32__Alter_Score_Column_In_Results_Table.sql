ALTER TABLE results
    DROP COLUMN correct_answers_number;

ALTER TABLE results
    MODIFY end_time datetime NULL;

ALTER TABLE results
    MODIFY score DOUBLE NULL;