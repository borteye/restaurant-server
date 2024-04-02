import { Request, Response, json } from "express";
import pool from "../../db";
import * as queries from "./queries";
import { DishInfo } from "../types/dishes";
import { CountryDetails } from "../types/country";

const getDishes = (req: Request, res: Response) => {
  pool.query(queries.DISHES, (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.status(200).json(result.rows);
    }
  });
};

const getCountryDish = (req: Request, res: Response) => {
  const { name, countryid }: CountryDetails = req.body;

  pool.query(
    queries.COUNTRY_EXISTENCE,
    [name, countryid],
    (err: Error, result: any) => {
      if (err) throw err;
      console.log(err);
      console.log(result);
      if (result.rows.length) {
        pool.query(queries.COUNTRY_DISH, [countryid], (err, result) => {
          if (err) throw err;
          console.log(err);
          console.log(result);
          if (result.rows.length) {
            const countryDish: DishInfo[] = result.rows;
            console.log(countryDish);
            res.status(200).json(countryDish);
          } else if (!result.rows.length) {
            res.json({ error: "No content found" });
          }
        });
      } else if (!result.rows.length) {
        res.status(400).json({ error: "Country not found" });
      }
    }
  );
};

export { getDishes, getCountryDish };
