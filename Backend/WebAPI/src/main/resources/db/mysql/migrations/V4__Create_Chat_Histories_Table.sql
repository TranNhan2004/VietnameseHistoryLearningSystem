CREATE TABLE chat_histories
(
    id         CHAR(22)      NOT NULL,
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title      VARCHAR(1024) NOT NULL,
    learner_id CHAR(22)      NOT NULL,
    CONSTRAINT pk_chat_histories PRIMARY KEY (id)
);

ALTER TABLE chat_histories
    ADD CONSTRAINT FK_CHAT_HISTORIES_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id) ON DELETE CASCADE;