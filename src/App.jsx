import "./App.css";
import React, { useState } from "react";
import jsonData from "./boligprisstatistikk.json";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import KrsImg from "/kristiansand.jpg";
import BergenImg from "/bergen.jpg";
import NorgeImg from "/norge.jpg";
import TromsoImg from "/tromso.jpg";
import TrondheimImg from "/trondheim.jpg";
import StavangerImg from "/stavanger.jpg";
import OsloImg from "/oslo.jpg";

function MyApp() {
  const [selectedCity, setSelectedCity] = useState("Norge");

  //---------Lar denne stå for å vise hvordan jeg ville ha hentet data fra apiet hvis det ikke hadde resultert i CORS feil.

  //   const [data, setData] = useState({});
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get("/api/static/boligprisstatistikk.json")
  //       .then((response) => {
  //         setData(response.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setError("Error loading data");
  //         setLoading(false);
  //       });
  //   }, []);

  //   if (loading) {
  //     return <h1>Loading...</h1>;
  //   }

  //   if (error) {
  //     return <h1>{error}</h1>;
  //   }

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const getBackgroundImage = (city) => {
    switch (city) {
      case "Bergen":
        return BergenImg;
      case "Kristiansand m/omegn":
        return KrsImg;
      case "Tromsø":
        return TromsoImg;
      case "Trondheim":
        return TrondheimImg;
      case "Stavanger m/omegn":
        return StavangerImg;
      case "Oslo":
        return OsloImg;
      default:
        return NorgeImg;
    }
  };

  const bgImgSrc = getBackgroundImage(selectedCity);

  return (
    <div className="content">
      <h1>Boligprisstatistikk</h1>
      <div className="city-container">
        {Object.keys(jsonData).map((city) => (
          <div
            key={city}
            className="city-item"
            onClick={() => handleCityClick(city)}
          >
            {city}
          </div>
        ))}
      </div>
      <div className="city-headline-container">
        <h2>{selectedCity}</h2>
      </div>

      {selectedCity && (
        <div
          className="city-info__container"
          style={{
            backgroundImage: `url(${bgImgSrc})`,
          }}
        >
          {Object.entries(jsonData[selectedCity]).map(([key, value]) => (
            <div key={key} className="city-info__unit">
              <div>
                <p>
                  {key} : {value}
                </p>
                {selectedCity !== "Norge"
                  ? `Tilsvarende tall i Norge: ${jsonData["Norge"][key]}`
                  : null}
              </div>
              <div>
                {parseFloat(value) >= 0 ? (
                  <BsGraphUpArrow className="up-arrow icon" />
                ) : (
                  <BsGraphDownArrow className="down-arrow icon" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApp;
