import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState(""); // Foydalanuvchi kiritgan shahar
  const [weather, setWeather] = useState(null); // API dan kelgan ob-havo ma'lumoti
  const [error, setError] = useState(""); // Xatolik xabari

  const DEEPSEEK_API_KEY = "sk-6420a69a5bc746179bb4e1f630ffb958"; // Deepseek API kaliti
  const DEEPSEEK_API_URL = `https://api.deepseek.com/v1/weather`; // Deepseek API manzili

  // Ob-havo ma'lumotlarini olish funksiyasi
  const fetchWeather = async () => {
    try {
      const response = await axios.get(DEEPSEEK_API_URL, {
        params: {
          city: city,
          api_key: DEEPSEEK_API_KEY,
          units: "metric", // Haroratni °C da olish uchun
        },
      });
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Shahar topilmadi yoki xatolik yuz berdi.");
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ob-havo Dasturi</h1>
      <input
        type="text"
        placeholder="Shahar nomini kiriting..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Ob-havoni ko'rsatish</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Harorat: {weather.main.temp} °C</p>
          <p>Havo: {weather.weather[0].description}</p>
          <p>Namlik: {weather.main.humidity}%</p>
          <p>Shamol tezligi: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;