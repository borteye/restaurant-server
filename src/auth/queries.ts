const ALL_USERS = "SELECT * FROM users";
const CHECK_USER_EXISTENCE =
  "SELECT * FROM users WHERE username = $1 AND password = $2";
const CHECK_EXISTENCE =
  "SELECT username, password FROM users WHERE username = $1 OR email = $2";
const USER_LOGIN = "SELECT * FROM users WHERE username = $1 AND password = $2";
const GET_USER_BY_ID = "SELECT * FROM users WHERE id = $1";
const ADD_USER =
  "INSERT INTO users (username, email, password) VALUES ( $1, $2, $3)";

export {
  ALL_USERS,
  CHECK_USER_EXISTENCE,
  CHECK_EXISTENCE,
  USER_LOGIN,
  GET_USER_BY_ID,
  ADD_USER,
};

// const UPDATE_USER =
//   "UPDATE students SET name = $1, email = $2, age = $3 , dob = $4 WHERE id = $5";

// const DELETE_USER = "DELETE FROM students WHERE id = $1";
