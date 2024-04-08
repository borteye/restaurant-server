const PLACE_ORDER = "INSERT INTO orders (userid, ordernumber, customer, itemordered, stauts, unitprice, quantity, orderdate, address, totalamount) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) "

export { PLACE_ORDER };
