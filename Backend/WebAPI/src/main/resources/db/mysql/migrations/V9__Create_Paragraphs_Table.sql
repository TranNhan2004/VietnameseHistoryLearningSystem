CREATE TABLE paragraphs
(
    id             CHAR(22) NOT NULL,
    content        TEXT     NOT NULL,
    ordinal_number INT      NOT NULL CHECK ( ordinal_number > 0 ),
    lesson_id      CHAR(22) NOT NULL,
    CONSTRAINT pk_paragraphs PRIMARY KEY (id)
);

ALTER TABLE paragraphs
    ADD CONSTRAINT FK_PARAGRAPHS_ON_LESSON FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE;