const CHECK_ACTIVE_USERS =
  "SELECT * FROM users WHERE status = 'Active' AND username = $1 AND password = $2";

const CHECK_USER_EXISTENCE =
  "SELECT * FROM users WHERE username = $1 AND password = $2";
const CHECK_EXISTENCE =
  "SELECT username, password FROM users WHERE username = $1 OR email = $2";
const USER_LOGIN = "SELECT * FROM users WHERE username = $1 AND password = $2";
const GET_USER_BY_ID = "SELECT * FROM users WHERE id = $1";
const ADD_USER =
  "INSERT INTO users (username, email, password, phone_number, gender) VALUES ( $1, $2, $3, $4, $5)";

export {
  CHECK_ACTIVE_USERS,
  CHECK_USER_EXISTENCE,
  CHECK_EXISTENCE,
  USER_LOGIN,
  GET_USER_BY_ID,
  ADD_USER,
};
