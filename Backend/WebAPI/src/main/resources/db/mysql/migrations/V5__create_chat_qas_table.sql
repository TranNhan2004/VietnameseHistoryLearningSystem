CREATE TABLE chat_qas
(
    id              CHAR(22)   NOT NULL,
    question        TEXT       NOT NULL,
    answer          MEDIUMTEXT NOT NULL,
    liked           BIT(1)    DEFAULT 0,
    disliked        BIT(1)    DEFAULT 0,
    chat_history_id CHAR(22)   NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_chat_qas PRIMARY KEY (id)
);

ALTER TABLE chat_qas
    ADD CONSTRAINT FK_CHAT_QAS_ON_CHAT_HISTORY FOREIGN KEY (chat_history_id) REFERENCES chat_histories (id);