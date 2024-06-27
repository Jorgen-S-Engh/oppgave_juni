import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function MyApp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    axios
      .get("/api/static/boligprisstatistikk.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setError(`Det oppsto en feil. Feilkode: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleCityClick = (city) => {
    setSelectedCity(city);
    console.log(city);
  };

  return (
    <div>
      <h1>My app</h1>
      <div className="city-container">
        {Object.keys(data).map((city) => {
          return (
            <div
              key={city}
              className="city-item"
              onClick={() => handleCityClick(city)}
            >
              {city}
            </div>
          );
        })}
      </div>
      {selectedCity && (
        <div className="city-info">
          <h2>{selectedCity}</h2>
          {Object.entries(data[selectedCity]).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApp;
