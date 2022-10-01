
CREATE DATABASE bug_hunter_news; 

CREATE TABLE users(
  id       VARCHAR(35)   NOT NULL DEFAULT(uuid()), 
  email    VARCHAR(100)  NOT NULL, 
  password TEXT NOT NULL, 

  CONSTRAINT pk_users_id PRIMARY KEY(id), 
  CONSTRAINT uk_users_email UNIQUE(email) 
); 

CREATE TABLE platforms(
  id   INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  CONSTRAINT uk_platforms UNIQUE(name)
); 

CREATE TABLE user_api_keys(
  user_id      VARCHAR(35) NOT NULL, 
  platform_id  INT NOT NULL, 
  api_key      TEXT NOT NULL, 
  CONSTRAINT pk_user_api_keys PRIMARY KEY(user_id, platform_id), 
  CONSTRAINT fk_user_api_keys_user_id FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_user_api_keys_platform_id FOREIGN KEY(platform_id) REFERENCES platforms(id)
);

CREATE TABLE user_favourite_programs(
  user_id      VARCHAR(35) NOT NULL, 
  platform_id  INT NOT NULL, 
  program_id   VARCHAR(35) NOT NULL, -- id do programa na plataforma. 
  CONSTRAINT pk_user_favourite_programs PRIMARY KEY(user_id, platform_id), 
  CONSTRAINT fk_user_favourite_programs_user_id FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_user_favourite_programs_platform_id FOREIGN KEY(platform_id) REFERENCES platforms(id)
);