CREATE TABLE lessons
(
    id                   CHAR(22)      NOT NULL,
    updated_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title                VARCHAR(1024) NOT NULL,
    video_url            VARCHAR(2048) NULL,
    likes                INT           NOT NULL DEFAULT 0,
    views                INT           NOT NULL DEFAULT 0,
    `description`        VARCHAR(1024) NULL,
    historical_period_id CHAR(22)      NOT NULL,
    admin_id             CHAR(22)      NULL,
    CONSTRAINT pk_lessons PRIMARY KEY (id)
);

ALTER TABLE lessons
    ADD CONSTRAINT FK_LESSONS_ON_ADMIN FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE SET NULL;

ALTER TABLE lessons
    ADD CONSTRAINT FK_LESSONS_ON_HISTORICAL_PERIOD FOREIGN KEY (historical_period_id) REFERENCES historical_periods (id) ON DELETE RESTRICT;