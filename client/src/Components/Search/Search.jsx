import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBarField = styled.div`
  margin: 50px auto;
  width: 50%;
  text-align: center;
  Button {
    margin: 5px 20px;
    background-color: purple;
    font-weight: 500;
    height: 50px;
    font-size: 20px;
  }
  Button:hover {
    background-color: white;
    color: purple;
    border: 2px solid purple;
  }
`;
export default function Search(props) {
  const navigate = useNavigate();
  const[value,setValue] = useState("")
  const [list,setList]=useState([]);
  const [companyList,setCompanyList]=useState([]);

  
  const handleSearchSubmit = (e) => {
    navigate("/");
  };


  useEffect(() => {
    axios.get("http://localhost:5000/companyname").then((res) => {
        setList(res.data.rows);
        // console.log(res.data.rows)
      })
      .catch((err) => console.log(err));
  },[]);

  
const handleSearchChange=(e)=>{
  setValue(e.target.value);
}
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setCompanyList(...companyList,searchTerm)
    console.log(companyList)
    // console.log("search ", searchTerm);
  };

  return (
    <div className="search-container">
      <SearchBarField>
        <form onSubmit={handleSearchSubmit}>
          <div className="search-inner">
            <TextField
              id="filled-search"
              label="Search by Company Name..."
              type="text"
              variant="filled"
              value={value}
              onChange={handleSearchChange}
            />
            <Button
              variant="contained"
              onClick={() => {
                onSearch(value);
              }}
            >
              Submit
            </Button>
          </div>
          <div className="dropdown">
            {" "}
            {list
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const c_name = item.cname.toLowerCase();

                return (
                  searchTerm &&
                  c_name.startsWith(searchTerm) &&
                  c_name !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.cname)}
                  className="dropdown-row"
                  key={item.cid}
                >
                  {item.cname}
                </div>
              ))}
          </div>
        </form>
      </SearchBarField>
    </div>
  );
}
