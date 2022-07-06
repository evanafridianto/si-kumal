import Header from "./Header";
import Footer from "./Footer";

import CulinaryMap from "../pages/CulinaryMap";
import CulinaryList from "../pages/CulinaryList";
import CulinaryEdit from "../pages/CulinaryEdit";
import CulinaryAdd from "../pages/CulinaryAdd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CulinaryMap />}></Route>
          <Route path="/culinaries" element={<CulinaryList />}></Route>
          <Route path="/culinaries/add" element={<CulinaryAdd />}></Route>
          <Route path="/culinaries/edit/:id" element={<CulinaryEdit />}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
export default App;
