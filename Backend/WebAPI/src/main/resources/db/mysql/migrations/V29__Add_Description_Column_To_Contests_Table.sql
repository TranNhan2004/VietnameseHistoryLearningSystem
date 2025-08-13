ALTER TABLE contests
    ADD `description` VARCHAR(2048) NULL;

ALTER TABLE contests
    DROP COLUMN question_number;