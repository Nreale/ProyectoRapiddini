import React from "react";
import Carrusel from "./Carrusel";
import CategoriasSection from "./CategoriasSection";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__section">
        <Carrusel />
      </div>

      <div className="home__section">
        <CategoriasSection />
      </div>

      <div className="home__section">
        <Carrusel />
      </div>
    </div>
  );
}

export default Home;