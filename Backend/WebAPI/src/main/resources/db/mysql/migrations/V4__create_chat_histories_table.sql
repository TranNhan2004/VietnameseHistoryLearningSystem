CREATE TABLE chat_histories
(
    id         CHAR(22)      NOT NULL,
    title      VARCHAR(1024) NOT NULL,
    learner_id CHAR(22)      NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_chat_histories PRIMARY KEY (id)
);

ALTER TABLE chat_histories
    ADD CONSTRAINT FK_CHAT_HISTORIES_ON_LEARNER FOREIGN KEY (learner_id) REFERENCES learners (id);