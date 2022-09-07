import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 60%;
  margin: 30px auto;
  padding: 20px;
  Button {
    margin: 20px auto;
    background-color: purple;
    font-weight: 500;
    height: 50px;
    font-size: 20px;
  }
  Button:hover {
    margin: 20px auto;
    background-color: white;
    color: purple;
    border: 2px solid purple;
    font-weight: 500;
    height: 50px;
    font-size: 20px;
  }
  p {
    font-size: 14px;
    color: gray;
    cursor: pointer;
  }

  .pSearchRight {
    float: right;
  }

  .pSearchLeft {
    float: left;
    margin-top: -15px;

    p {
      margin-top: -5px;
    }

    .navbar-text {
      color: white;
      text-decoration: none;
    }

    .navbar-text:hover {
      color: purple;
    }
  }

  .tabelContent {
    margin-top: 150px;
    border: 1px solid black;

    table {
      width: 100%;
    }
    th {
      font-size: 18px;
      width: 49%;
      text-align: left;
    }
    hr {
      width: 200%;
    }
  }
`;



export default function List() {
  const [list, setList] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/companyname")
      .then((res) => {
        setList(res.data.rows);
        console.log(res.data.rows);
      })
      .catch((err) => console.log(err));
  }, []);

  function onChangeHandle(e) {
    console.log("e.target.value", e.target.value);
    if (e.target.value === "") {
      window.location.reload(true);
      const tempArr = list;
      setList(tempArr);
      return;
    }
    const searchResult = list.filter((item) =>
      item.cname.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setList(searchResult);
  }

  return (
    <div>
      {console.log("arrData", list)}
      <ListContainer>
        <div className="pSearchLeft">
          <Button variant="contained">
            <NavLink to="/add-company" className="navbar-text">
              Company +{" "}
            </NavLink>
          </Button>
          <p>Show Entries</p>
        </div>
        <div className="pSearchRight">
          <TextField
            id="filled-search"
            label="Search by Company Name..."
            type="text"
            variant="filled"
            onChange={onChangeHandle}
          />
          <p>Search Company</p>
        </div>
        {list.length ? (
          <div className="tabelContent">
            <table>
              <tr>
                <th>CIN</th>
                <th>Name</th>
              </tr>
              {list.length > 0 &&
                list?.map((item) => {
                  return (
                    <>
                      <hr />
                      <tr key={item.cid}>
                        {" "}
                        <td>{item.cid}</td>
                        <td>{item.cname}</td>
                      </tr>
                    </>
                  );
                })}
            </table>
          </div>
        ) : (
          <div className="random-div">No Data Added</div>
        )}
      </ListContainer>
    </div>
  );
}
