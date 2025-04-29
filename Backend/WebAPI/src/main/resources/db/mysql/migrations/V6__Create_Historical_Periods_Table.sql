CREATE TABLE historical_periods
(
    id         CHAR(22)      NOT NULL,
    name       VARCHAR(1024) NOT NULL,
    start_year INT           NOT NULL,
    end_year   INT           NOT NULL CHECK ( end_year > start_year ),
    CONSTRAINT pk_historical_periods PRIMARY KEY (id)
);