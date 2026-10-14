CREATE DATABASE IF NOT EXISTS branova_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'branova'@'localhost'
  IDENTIFIED BY 'change_this_password';

GRANT ALL PRIVILEGES ON branova_db.* TO 'branova'@'localhost';
FLUSH PRIVILEGES;

-- Spring Data JPA creates/updates application tables when the backend starts.
-- Change the password here and set the same value in DB_PASSWORD.
