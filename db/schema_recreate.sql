-- DROP DATABASE trademe;
-- CREATE DATABASE trademe;

\c trademe;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLES --
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users 
(
    id bigserial PRIMARY KEY,
    uid uuid NOT NULL DEFAULT uuid_generate_v4(),    
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
);