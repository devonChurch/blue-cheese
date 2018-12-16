"use strict";

const { Client } = require("pg");
const COLUMNS = ["id", "category", "description", "href", "icon", "title"].join(","); // prettier-ignore
const createClient = () => {
  const { USER: user, PASSWORD: password } = process.env;
  const host = "blue-cheese.cll2wd12vt6h.us-east-1.rds.amazonaws.com";
  const database = "blue_cheese";
  const port = 5432;

  return new Client({ user, password, host, database, port });
};

module.exports.search = async (event, context) => {
  let statusCode = 200;
  let body = "";
  const { text = "" } = event.pathParameters;
  const client = createClient();
  const sql = `SELECT ${COLUMNS} FROM food WHERE (lower(title) LIKE lower($1))`;
  const values = [`%${text}%`];

  try {
    await client.connect();
    const { rows = [] } = await client.query(sql, values);
    await client.end();

    body = JSON.stringify(rows);
  } catch (error) {
    (statusCode = 400), (body = JSON.stringify(error));
  }

  return { statusCode, body };
};
