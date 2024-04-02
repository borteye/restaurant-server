import { Request, Response, json } from "express";
import pool from "../../db";
import * as queries from "./queries";

const getCategories = (req: Request, res: Response) => {
  pool.query(queries.CATEGORIES, (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.status(200).json(result.rows);
    }
  });
};

export { getCategories };
