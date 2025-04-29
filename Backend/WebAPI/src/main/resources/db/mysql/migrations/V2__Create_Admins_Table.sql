CREATE TABLE admins
(
    id          CHAR(22)                                     NOT NULL,
    admin_level ENUM ('BASIC', 'ADVANCED', 'SUPER_ADVANCED') NOT NULL,
    CONSTRAINT pk_admins PRIMARY KEY (id)
);

ALTER TABLE admins
    ADD CONSTRAINT FK_ADMINS_ON_ID FOREIGN KEY (id) REFERENCES base_users (id);