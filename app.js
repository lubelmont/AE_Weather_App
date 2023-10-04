const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

const app = express();
const apiKey = '106221f1aaeaef29abf5c3b5d3116274';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación de clima en tiempo real');
});

app.get('/clima', async (req, res) => {
  const { ciudad } = req.query;

  if (!ciudad) {
    return res.status(400).json({ error: 'Debes proporcionar una ciudad.' });
  }

  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${ciudad}`
    );

    const weatherData = response.data;

    if (weatherData.error) {
      return res.status(404).json({ error: 'No se encontraron datos para la ciudad proporcionada.' });
    }

    res.json({ clima: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al consultar el clima.' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
