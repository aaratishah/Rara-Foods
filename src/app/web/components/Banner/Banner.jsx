import React from "react";
import bannerImage from "image/background.png";

const Banner = ({ children, bannerText = "Search" }) => (
  <section
    className="bg_cover"
    style={{
      backgroundImage: `url(${bannerImage})`,
      height: "200px",
      backgroundPosition: "top center",
    }}
  >
    <div className="container">
      <div className="page-banner-content text-center">
        <h2
          className="title"
          style={{ marginTop: "120px", fontFamily: "sans-serif" }}
        >
          {bannerText}
        </h2>
        {children}
      </div>
    </div>
  </section>
);

export default Banner;
