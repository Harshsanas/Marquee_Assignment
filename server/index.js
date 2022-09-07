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

// app.get("/companyname", async(req,res)=>{
//     try{
//         const allCompanyNames = await pool.query("SELECT * FROM company");
//         res.json(allCompanyNames);
//         console.log(allCompanyNames)
//     }catch(err){
//         console.log(err);
//     }
// })

app.get("/companyname", async (req, res) => {
  try {
    const allCompanyNames = await pool.query("SELECT * FROM company");
    res.json(allCompanyNames);
    console.log(allCompanyNames);
  } catch (err) {
    console.log(err);
  }
});

app.get("/addedcompany", async (req, res) => {
  try {
    const allCompanyNames = await pool.query("SELECT * FROM companylist");
    res.json(allCompanyNames);
    console.log(allCompanyNames);
  } catch (err) {
    console.log(err);
  }
});


app.post("/addcompany", async (req, response) => {try {
  const {cname} = req.body
  const companyListName = await pool.query("INSERT INTO companylist(cname) VALUES(?) RETURNING *",[cname],(err,res)=>{
    if(err){
      throw err
    }
  });
  res.json(companyListName);
  console.log(companyListName);
} catch (err) {
  console.log(err);
}
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
