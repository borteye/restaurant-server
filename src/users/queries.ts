const CHECK_USER_ROLE = "SELECT * FROM users WHERE id = $1 AND role = $2";
const GET_CUSTOMERS = "SELECT * FROM users WHERE role = 'customer'";
const FLAG_CUSTOMER =
  "UPDATE users SET flagged = true, status = 'Archived' WHERE id = $1";

const CHECK_EXISTENCE =
  "SELECT * FROM users WHERE status = 'Active' AND id = $1";

const TOTAL_CUSTOMERS = "SELECT COUNT(*) FROM users WHERE role = 'customer'";
const ACTIVE_CUSTOMERS = "SELECT COUNT(*) FROM users WHERE status = 'Active'";
const ARCHIVED_CUSTOMERS =
  "SELECT COUNT(*) FROM users WHERE status = 'Archived'";

export {
  CHECK_USER_ROLE,
  GET_CUSTOMERS,
  FLAG_CUSTOMER,
  CHECK_EXISTENCE,
  TOTAL_CUSTOMERS,
  ACTIVE_CUSTOMERS,
  ARCHIVED_CUSTOMERS,
};
