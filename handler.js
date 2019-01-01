"use strict";

const { Client } = require("pg");
const COLUMNS = ["id", "category", "description", "href", "icon", "title"];
const createClient = () => {
  const { USER: user, PASSWORD: password } = process.env;
  const host = "blue-cheese.cll2wd12vt6h.us-east-1.rds.amazonaws.com";
  const database = "blue_cheese";
  const port = 5432;

  return new Client({ user, password, host, database, port });
};

let statusCode = 200;
let body = "";

module.exports.search = async (event, context) => {
  const searchColumns = COLUMNS.join(",");
  const { text = "" } = event.pathParameters;
  const client = createClient();
  const sql = `SELECT ${searchColumns} FROM food WHERE (lower(title) LIKE lower($1))`;
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

module.exports.create = async (event, context) => {
  const { title, category, description, href, icon } = JSON.parse(event.body);
  const [id, ...remainingColumns] = COLUMNS;
  const createColumns = remainingColumns.join(",");
  const client = createClient();
  const sql = `INSERT INTO food(${createColumns}) VALUES($1, $2, $3, $4, $5)`;
  const values = [category, description, href, icon, title];

  try {
    await client.connect();
    await client.query(sql, values);
    await client.end();
  } catch (error) {
    (statusCode = 400), (body = JSON.stringify(error));
  }

  return { statusCode, body };
};

/**
CREATE TABLE food(
    id SERIAL PRIMARY KEY,
    category VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    href VARCHAR NOT NULL,
    icon VARCHAR NOT NULL,
    title VARCHAR NOT NULL
)

SELECT * FROM food

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Carrot
https://en.wikipedia.org/wiki/Carrot
🥕
The carrot is a root vegetable, usually orange in colour, though purple, black, red, white, and yellow cultivars exist.

Banana
https://en.wikipedia.org/wiki/Banana
🍌
A banana is an edible fruit produced by several kinds of large herbaceous flowering plants in the genus Musa.

Corn
https://en.wikipedia.org/wiki/Maize
🌽
Maize has become a staple food in many parts of the world, with the total production of maize surpassing that of wheat or rice.

Kiwifruit
https://en.wikipedia.org/wiki/Kiwifruit
🥝
Kiwifruit or Chinese gooseberry is the edible berry of several species of woody vines in the genus Actinidia.

Apple
https://en.wikipedia.org/wiki/Apple
🍎
An apple is a sweet, edible fruit produced by an apple tree and are the most widely grown species in the genus Malus.

Pineapple
https://en.wikipedia.org/wiki/Pineapple
🍍
The pineapple is a tropical plant with an edible multiple fruit consisting of coalesced berries, also called pineapples.

Potato
https://en.wikipedia.org/wiki/Potato
🥔
The potato is a staple food in many parts of the world and an integral part of much of the world's food supply.
*/
