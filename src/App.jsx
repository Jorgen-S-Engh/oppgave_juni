import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("/api/static/boligprisstatistikk.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error loading data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const backgroundImage = selectedCity
    ? `url('/${selectedCity.toLowerCase()}.jpg')`
    : "none";

  return (
    <div>
      <h1>Boligpris Statistikk {selectedCity}</h1>
      <div className="main-content">
        {Object.keys(data).map((city) => (
          <div
            className="city-container"
            key={city}
            onClick={() => handleCityClick(city)}
          >
            <h4>{city}</h4>
          </div>
        ))}
      </div>
      {selectedCity && (
        <div className="city-info">
          <h2>{selectedCity}</h2>
          <ul>
            {Object.entries(data[selectedCity]).map(([key, value]) => (
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

export default App;
