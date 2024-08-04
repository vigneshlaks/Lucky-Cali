CREATE DATABASE IF NOT EXISTS lucky_cali_database;

USE lucky_cali_database;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  joinedDate DATE DEFAULT CURRENT_DATE,
  UNIQUE (email)
);

-- Create workout_logs table
CREATE TABLE workout_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create progress table
CREATE TABLE progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  progress TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create leaderboard table
CREATE TABLE leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  points INT NOT NULL,
  rank INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create challenges table
CREATE TABLE challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge VARCHAR(255) NOT NULL
);

-- Create user_challenges table
CREATE TABLE user_challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  challenge_id INT NOT NULL,
  status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);
