import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} iFluids Store | Built for customer satisfaction</p>
    </footer>
  );
};

export default Footer;
