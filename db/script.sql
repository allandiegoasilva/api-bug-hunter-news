
CREATE DATABASE bug_hunter_news; 
use bug_hunter_news; 

DROP TABLE IF EXISTS program_scopes;
DROP TABLE IF EXISTS program_payments;
DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS user_favourite_programs;
DROP TABLE IF EXISTS user_api_keys;
DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id   INT NOT NULL AUTO_INCREMENT,
  email    VARCHAR(100)  NOT NULL, 
  password TEXT NOT NULL, 

  CONSTRAINT pk_users_id PRIMARY KEY(id), 
  CONSTRAINT uk_users_email UNIQUE(email) 
); 

CREATE TABLE platforms(
  id   INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  logo TEXT NOT NULL, 
  CONSTRAINT pk_platforms_id PRIMARY KEY(id),
  CONSTRAINT uk_platforms UNIQUE(name)
); 

CREATE TABLE user_api_keys(
  user_id      INT NOT NULL, 
  platform_id  INT NOT NULL, 
  api_key      TEXT NOT NULL, 
  CONSTRAINT pk_user_api_keys PRIMARY KEY(user_id, platform_id), 
  CONSTRAINT fk_user_api_keys_user_id FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_user_api_keys_platform_id FOREIGN KEY(platform_id) REFERENCES platforms(id)
);

CREATE TABLE programs(
  id             INT NOT NULL AUTO_INCREMENT, 
  title          VARCHAR(150) NOT NULL, 
  image          TEXT NOT NULL, 
  launch         VARCHAR(15) NOT NULL, 
  link           TEXT NOT NULL, 
  avarage_bounty DECIMAL(10,2) DEFAULT 0, 
  description    TEXT NULL, 
  private        INT NOT NULL DEFAULT 0, -- true, false 
  platform_id    INT NOT NULL, 
  CONSTRAINT pk_programs_id PRIMARY KEY(id),
  CONSTRAINT fk_programs_platform_id FOREIGN KEY(platform_id) REFERENCES platforms(id)
);

CREATE TABLE program_payments(
  id_program   INT NOT NULL, 
  low_min      DECIMAL(10,2) DEFAULT 0,
  low_max      DECIMAL(10,2) DEFAULT 0,
  medium_min   DECIMAL(10,2) DEFAULT 0,
  medium_max   DECIMAL(10,2) DEFAULT 0,
  high_min     DECIMAL(10,2) DEFAULT 0,
  high_max     DECIMAL(10,2) DEFAULT 0,
  critical_min DECIMAL(10,2) DEFAULT 0,
  critical_max DECIMAL(10,2) DEFAULT 0,
  CONSTRAINT pk_program_payments_id_program PRIMARY KEY(id_program), 
  CONSTRAINT fk_program_payments_id_program FOREIGN KEY(id_program) REFERENCES programs(id)
);

CREATE TABLE program_scopes
(
 id          INT NOT NULL AUTO_INCREMENT, 
 id_program  INT NOT NULL, 
 domain      VARCHAR(300) NOT NULL, 
 elegible    INT NOT NULL DEFAULT 0, -- RANGE 1-2 Yes, NOT
 gravity     INT NOT NULL DEFAULT 1, -- RANGE 1-4 critical, medium, high, low 
 tecnologies TEXT NULL, 
 CONSTRAINT pk_program_scopes_id_program_domain PRIMARY KEY(id), 
 CONSTRAINT fk_program_scopes_id_program FOREIGN KEY(id_program) REFERENCES programs(id)
); 


CREATE TABLE user_favourite_programs(
  user_id      INT NOT NULL, 
  program_id   INT NOT NULL,  -- id do programa na plataforma. 
  CONSTRAINT pk_user_favourite_programs PRIMARY KEY(user_id, program_id), 
  CONSTRAINT fk_user_favourite_programs_user_id FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_user_favourite_programs_program_id FOREIGN KEY(program_id) REFERENCES programs(id)
);


-- INSERTs
INSERT INTO platforms(id, name, logo) 
     VALUES (1, 'Hackerone', 'hackerone.png'),
            (2, 'Intigriti', 'intigriti.png');


INSERT INTO programs(title, image, launch, description, private, favorite, platform_id, link)
VALUES ('ResMed', 
        'https://profile-photos.hackerone-user-content.com/variants/ic8vu0xt3xogerqal52y0uvh94ws/4de4742e9f2080cae5560af6ba87bfc10d4615dcad7477b4736323d9aefd0955',
        '10/2022', 
        'ResMed looks forward to working with the security community to find vulnerabilities in order to keep our businesses and customers safe.', 
        0, 
        0, 
        1, 
        "https://hackerone.com/resmed?type=team");
INSERT INTO program_payments(id_program) VALUES (3);
INSERT INTO program_scopes(id_program, domain, elegible, gravity, tecnologies)
     VALUES (3, 'resmed.com', 0, 1, "php;c#;javascript;NodeJS");
INSERT INTO program_scopes(id_program, domain, elegible, gravity, tecnologies)
     VALUES (3, 'resupply.resmed.com', 0, 1, "Amazon Web Services;C#;ASP.NET;ISS");
