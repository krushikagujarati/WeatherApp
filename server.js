const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Simulating a database of city names
const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
];

// Your OpenWeatherMap API key
const API_KEY = 'b53a491176e9cb0ad878e72178cc0a05';

app.get('/cities', (req, res) => {
    res.json(cities);
});

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if(data.cod === 200) {
            res.json(data);
        } else {
            res.status(400).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
const fetch = require('node-fetch');  // Install using npm install node-fetch

module.exports = app;

