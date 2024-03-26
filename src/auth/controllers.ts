import { Request, Response, json } from "express";
import pool from "../../db";
import * as queries from "./queries";
import { UserDetails, UserInfo } from "../types/auth";

const allUsers = (req: Request, res: Response) => {
  pool.query(queries.ALL_USERS, (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.status(200).json(result.rows);
    }
  });
};

const userLogin = (req: Request, res: Response) => {
  const { username, password }: UserInfo = req.body;
  pool.query(
    queries.CHECK_USER_EXISTENCE,
    [username, password],
    (err, result) => {
      console.log(result.rows);
      if (err) throw err;
      if (result.rows.length) {
        const user:UserDetails = result.rows[0];
        res.status(200).json({ result: user, success: "user found" });
      } else if (!result.rows.length) {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  );
};

const registerUser = (req: Request, res: Response) => {
  const { username, email, password }: UserDetails = req.body;
  pool.query(queries.CHECK_EXISTENCE, [username, email], (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.status(401).json({ error: "user already exists" });
    } else if (!result.rows.length) {
      pool.query(
        queries.ADD_USER,
        [username, email, password],
        (err, result) => {
          console.log(result);
          if (err) {
            res.json({
              error:
                "Oops! Something went wrong while signing you up. Please check your information and try again.",
            });
          }
          res.status(200).json({ success: "Account successfully created." });
        }
      );
    }
  });
};
export { allUsers, userLogin, registerUser };