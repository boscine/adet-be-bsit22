-- Run this in MySQL CMD to set up the database

CREATE DATABASE IF NOT EXISTS bsit_22;
USE bsit_22;

CREATE TABLE IF NOT EXISTS posts (
  post_id     INT           AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255)  NOT NULL,
  description TEXT          NOT NULL,
  status      ENUM('open', 'closed') NOT NULL DEFAULT 'open',
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO posts (title, description, status) VALUES
  ('Looking for Calculus Textbook', 'Need the Calculus by Stewart 8th edition for my Math class', 'open'),
  ('AutoCAD Notes Available', 'Sharing my AutoCAD drafting notes from last semester', 'open'),
  ('Scientific Calculator', 'Looking for a Casio fx-991ES Plus calculator to borrow', 'closed');

