

CREATE TABLE users (
   id         VARCHAR(36) DEFAULT uuid() NOT NULL, 
   email      VARCHAR(80) NOT NULL, 
   password   TEXT NOT NULL, 
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE programs (
  id   INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(40) NOT NULL, 

); 