import { Request, Response, json } from "express";
import pool from "../../db";
import * as queries from "./queries";
import { DishInfo, imageUpload } from "../types/dishes";
import { CountryDetails } from "../types/country";
import { uploadImage } from "../utils";

const getDishes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isId = id !== "";
  if (!isId) {
    return res.status(404).json({ error: "Not found" });
  }
  try {
    if (id) {
      pool.query(queries.COUNTRY_DISH, [id], (err, result) => {
        if (result.rows.length) {
          const countryDish: DishInfo[] = result.rows;
          res.status(200).json(countryDish);
        } else if (!result.rows.length) {
          res.json([]);
        }
      });
    } else {
      pool.query(queries.DISHES, (err, result) => {
        if (err) throw err;
        if (result.rows.length) {
          res.status(200).json(result.rows);
        }
      });
    }
  } catch (error) {
    console.error("Error retrieving dishes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addDish = async (req: Request, res: Response) => {
  const uploadedFile = (await uploadImage(req, res)) as imageUpload;
  const imageUrl = uploadedFile.path;
  console.log("imageUrl: ", imageUrl);
  const { dishName, dishPrice, dishAvailable, country, category, description } =
    req.body;
  console.log(
    dishName,
    dishPrice,
    dishAvailable,
    country,
    category,
    description
  );
  pool.query(
    queries.ADD_DISH,
    [
      dishName,
      dishAvailable,
      description,
      dishPrice,
      category,
      country,
      imageUrl,
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

export { getDishes, addDish };
