CREATE TABLE responses
(
    id              CHAR(22) NOT NULL,
    from_comment_id CHAR(22) NOT NULL,
    to_comment_id   CHAR(22) NOT NULL,
    CONSTRAINT pk_responses PRIMARY KEY (id)
);

ALTER TABLE responses
    ADD CONSTRAINT uc_res_from_comment_and_to_comment UNIQUE (from_comment_id, to_comment_id);

ALTER TABLE responses
    ADD CONSTRAINT FK_RESPONSES_ON_FROM_COMMENT FOREIGN KEY (from_comment_id) REFERENCES comments (id) ON DELETE CASCADE;

ALTER TABLE responses
    ADD CONSTRAINT FK_RESPONSES_ON_TO_COMMENT FOREIGN KEY (to_comment_id) REFERENCES comments (id) ON DELETE CASCADE;