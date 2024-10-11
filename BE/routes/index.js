const express = require('express');
const router = express.Router();
const {
  getCountries,
  countryBorders,
  countriesPopulation,
  countriesFlags,
} = require('../handlers/functionsCountries');

router.get('/countries', getCountries);

router.get('/country/:countryCode', countryBorders);

router.get('/countries/population', countriesPopulation);

router.get('/countries/flags', countriesFlags);

module.exports = router;
