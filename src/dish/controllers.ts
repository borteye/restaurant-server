import { Request, Response, json } from "express";
import pool from "../../db";
import * as queries from "./queries";
import { DishInfo, imageUpload } from "../types/dishes";
import { CountryDetails } from "../types/country";
import { uploadImage } from "../utils";

const getDishes = (req: Request, res: Response) => {
  pool.query(queries.DISHES, (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.status(200).json(result.rows);
    }
  });
};

const getCountryDish = (req: Request, res: Response) => {
  const { id } = req.params;
  pool.query(queries.COUNTRY_DISH, [id], (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      const countryDish: DishInfo[] = result.rows;

      res.status(200).json(countryDish);
    } else if (!result.rows.length) {
      res.json([]);
    }
  });
};

const addDish = async (req: Request, res: Response) => {
  const imageUrl = (await uploadImage(req, res)) as imageUpload;
  const { dishName, dishPrice, dishAvailable, country, category, description } =
    req.body;
  pool.query(
    queries.ADD_DISH,
    [
      dishName,
      dishAvailable,
      description,
      dishPrice,
      category,
      country,
      imageUrl.path,
    ],
    (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({
        success: "Dish successfully added",
      });
    }
  );
};

export { getDishes, getCountryDish, addDish };
