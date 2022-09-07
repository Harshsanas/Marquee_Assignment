import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import List from "./Components/List/List"
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Search from "./Components/Search/Search";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/add-company" element={<Search />} />
          <Route exact path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
