const PLACE_ORDER =
  "INSERT INTO orders (userid, ordernumber, customer, status, orderdate, address, dishes) VALUES($1, $2, $3, $4, $5, $6, $7) ";

const ALL_ORDERS = "SELECT * FROM orders";

const CUSTOMER_ORDERS = "SELECT * FROM orders WHERE userid = $1";

const TOTAL_ORDERS = "SELECT COUNT(*) FROM orders";
const COMPLETED_ORDERS =
  "SELECT COUNT(*) FROM orders WHERE status = 'Complete'";
export {
  ALL_ORDERS,
  COMPLETED_ORDERS,
  CUSTOMER_ORDERS,
  PLACE_ORDER,
  TOTAL_ORDERS,
};
