DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS affirmations;
DROP TABLE IF EXISTS health_tips;
DROP TABLE IF EXISTS health_info;
DROP TABLE IF EXISTS exercise_logs;
DROP TABLE IF EXISTS food_logs;
DROP TABLE IF EXISTS sleep_logs;
DROP TABLE IF EXISTS water_logs;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE water_logs(
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date date NOT NULL,
    amount_oz integer NOT NULL
);

CREATE TABLE sleep_logs(
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date date NOT NULL,
    sleep_type text NOT NULL CHECK (sleep_type IN ('Sleep','Nap')),
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL,
    duration integer NOT NULL
);

CREATE TABLE food_logs(
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date date NOT NULL,
    food_item text NOT NULL,
    calories integer,
    protein integer,
    carbs integer,
    fiber integer,
    fat integer
);

CREATE TABLE exercise_logs(
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date date NOT NULL,
    exercise_type text NOT NULL CHECK (exercise_type IN ('Stretching', 'Cardio','Strength Training','Flexibility Training','Balance Training')),
    duration integer NOT NULL
);

CREATE TABLE health_info(
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    username text NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    height integer NOT NULL,
    weight integer NOT NULL,
    age integer NOT NULL,
    biological_sex text NOT NULL CHECK (biological_sex IN ('Male','Female','Intersex')),
    gender text NOT NULL
);

CREATE TABLE health_tips(
    id serial PRIMARY KEY,
    category text NOT NULL,
    tip text NOT NULL
);

CREATE TABLE affirmations(
    id serial PRIMARY KEY,
    message text NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  image_url TEXT,
  description TEXT,
  ingredients JSONB NOT NULL,         
  instructions TEXT NOT NULL,
  username text NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);