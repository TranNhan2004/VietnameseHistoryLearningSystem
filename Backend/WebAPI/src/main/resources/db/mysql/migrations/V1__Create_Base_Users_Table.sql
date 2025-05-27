CREATE TABLE base_users
(
    id            CHAR(22)      NOT NULL,
    updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_name     VARCHAR(64)   NOT NULL,
    email         VARCHAR(256)  NOT NULL,
    password      VARCHAR(128)  NOT NULL,
    first_name    VARCHAR(50)   NOT NULL,
    last_name     VARCHAR(100)  NOT NULL,
    date_of_birth DATE          NULL,
    is_active     BIT(1)        NOT NULL DEFAULT 0,
    avatar_url    VARCHAR(2048) NULL,
    last_login    TIMESTAMP     NULL,
    CONSTRAINT pk_base_users PRIMARY KEY (id)
);

ALTER TABLE base_users
    ADD CONSTRAINT uc_base_users_email UNIQUE (email);

ALTER TABLE base_users
    ADD CONSTRAINT uc_base_users_user_name UNIQUE (user_name);