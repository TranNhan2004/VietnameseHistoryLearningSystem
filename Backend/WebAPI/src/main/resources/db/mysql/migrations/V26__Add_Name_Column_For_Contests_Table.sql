ALTER TABLE contests
    ADD name VARCHAR(512) NOT NULL;

ALTER TABLE contests
    ADD CONSTRAINT uc_contests_name UNIQUE (name);