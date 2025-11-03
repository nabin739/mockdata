import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <h1 className="page-title">Our Products</h1>
        <Products />
      </div>
      <Footer />
    </div>
  );
}

export default App;
