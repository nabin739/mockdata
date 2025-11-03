import React, { useState } from "react";
import "./Navbar.css";
import { Menu, X } from "lucide-react"; 
 import logo from "../images/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <h2 className="logo">
         <img src={logo} alt="Logo" className="logo-image" />
          
        </h2>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>Home</li>
          <li>Products</li>
          <li>Deals</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
