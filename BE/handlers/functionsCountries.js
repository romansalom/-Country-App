const axios = require('axios');

// Handler para obtener la lista de países
const getCountries = async (req, res) => {
  try {
    const response = await axios.get(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Error fetching countries' });
  }
};

const countryBorders = async (req, res) => {
  const { countryCode } = req.params;

  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching country info:', error);
    res.status(500).json({ message: 'Error fetching country information' });
  }
};

const countriesPopulation = async (req, res) => {
  try {
    const response = await axios.get(
      'https://countriesnow.space/api/v0.1/countries/population'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries population:', error);
    res.status(500).json({ message: 'Error fetching countries population:' });
  }
};

const countriesFlags = async (req, res) => {
  try {
    const response = await axios.get(
      'https://countriesnow.space/api/v0.1/countries/flag/images'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries flags:', error);
    res.status(500).json({ message: 'Error fetching countries flags:' });
  }
};
module.exports = {
  getCountries,
  countryBorders,
  countriesPopulation,
  countriesFlags,
};
