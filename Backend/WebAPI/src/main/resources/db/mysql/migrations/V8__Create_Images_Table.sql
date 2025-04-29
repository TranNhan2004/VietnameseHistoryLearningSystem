CREATE TABLE images
(
    id             CHAR(22)      NOT NULL,
    image_url      VARCHAR(2048) NOT NULL,
    ordinal_number INT           NOT NULL,
    lesson_id      CHAR(22)      NOT NULL,
    CONSTRAINT pk_images PRIMARY KEY (id)
);

ALTER TABLE images
    ADD CONSTRAINT FK_IMAGES_ON_LESSON FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE;