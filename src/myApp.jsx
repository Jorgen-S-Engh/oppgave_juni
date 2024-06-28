import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsonData from "./boligprisstatistikk.json";

function MyApp() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("/boligstatistikk.json")
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setError(`Det oppsto en feil. Feilkode: ${error.message}`);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>{error}</h1>;

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h1>My App</h1>
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
      {selectedCity && (
        <div className="city-info">
          <h2>{selectedCity}</h2>
          <ul>
            {Object.entries(jsonData[selectedCity]).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyApp;
