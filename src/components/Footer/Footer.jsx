import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";

import noraisedpinkies from "../../../public/images/noraisedpinkies.png";

//This is a super simple footer element, that attributes the application as being a part of Bunnycup Winery

function Footer() {
  return (
    <div>
      <Box
        className="footerItem"
        style={{
          backgroundImage: `url(${noraisedpinkies})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "150px",
          height: "25vh",
          color: "black",
        }}
      >
        <footer>&copy; Bunnycup Winery</footer>
      </Box>
    </div>
  );
}

export default Footer;
