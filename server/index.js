const express = require("express");
const app = express();
const cors = require("cors");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  database: "Marquee_Equity",
  host: "localhost",
  port: 5432,
});
//middleware
app.use(express.json());
app.use(cors());

//to get all company names
app.get("/companyname", async (req, res) => {
  try {
    const allCompanyNames = await pool.query("SELECT * FROM company");
    res.json(allCompanyNames);
    console.log(allCompanyNames);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
