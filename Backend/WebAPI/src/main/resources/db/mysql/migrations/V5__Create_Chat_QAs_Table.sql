CREATE TABLE chat_qas
(
    id              CHAR(22)   NOT NULL,
    created_at      TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    question        TEXT       NOT NULL,
    answer          MEDIUMTEXT NOT NULL,
    liked           BIT(1)     NOT NULL DEFAULT 0,
    disliked        BIT(1)     NOT NULL DEFAULT 0,
    chat_history_id CHAR(22)   NOT NULL,
    CONSTRAINT pk_chat_qas PRIMARY KEY (id)
);

ALTER TABLE chat_qas
    ADD CONSTRAINT FK_CHAT_QAS_ON_CHAT_HISTORY FOREIGN KEY (chat_history_id) REFERENCES chat_histories (id) ON DELETE CASCADE;