CREATE TABLE contests
(
    id                  CHAR(22)  NOT NULL,
    updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    question_number     INT       NOT NULL CHECK ( question_number > 0 ),
    duration_in_minutes INT       NOT NULL CHECK ( duration_in_minutes > 0 ),
    start_time          DATETIME  NOT NULL,
    end_time            DATETIME  NOT NULL CHECK ( end_time > start_time ),
    CONSTRAINT pk_contests PRIMARY KEY (id)
);