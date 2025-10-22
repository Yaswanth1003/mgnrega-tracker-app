import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #111, #222)",
        color: "#ccc",
        textAlign: "center",
        padding: "25px 10px",
        fontSize: "16px",
        marginTop: "60px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.4)",
      }}
    >
      <p style={{ margin: "6px 0", fontWeight: "600", color: "#f5f5f5" }}>
        MGNREGA District Performance Dashboard
      </p>
      <p style={{ margin: "4px 0", color: "#999" }}>
        Empowering citizens with transparent access to public data
      </p>
      <p style={{ margin: "8px 0", fontSize: "14px", color: "#777" }}>
        © {new Date().getFullYear()} Developed by Bobbili Yaswanth
      </p>
    </footer>
  );
};

export default Footer;
