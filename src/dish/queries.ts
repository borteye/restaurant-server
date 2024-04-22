const DISHES = "SELECT * FROM dishes ORDER BY RANDOM() LIMIT 5";
const COUNTRY_DISH =
  "SELECT * FROM dishes WHERE countryid = $1 ORDER BY RANDOM() LIMIT 5";
const COUNTRY_EXISTENCE =
  "SELECT * FROM countries WHERE name = $1 AND countryid = $2 ";

const ADD_DISH =
  "INSERT INTO dishes (name, available, description, price, categoryid, countryid, imageUrl) VALUES ($1, $2, $3, $4, $5, $6, $7)";

export { DISHES, COUNTRY_EXISTENCE, COUNTRY_DISH, ADD_DISH };
