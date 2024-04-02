import { Request, Response, json } from "express";
import pool from "../../db";
import * as queries from "./queries";

const getCountries = (req: Request, res: Response) => {
  pool.query(queries.COUNTRIES, (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.status(200).json(result.rows);
    }
  });
};

export { getCountries };
