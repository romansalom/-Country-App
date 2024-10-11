import { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';

const Card = ({ goToCountryDetail }) => {
  const [countries, setCountries] = useState([]);
  const [flags, setFlags] = useState([]);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:3000/countries');
      console.log('Countries API Response:', response.data);
      setCountries(response.data);
    } catch (err) {
      console.error('Error fetching countries:', err);
      setError('Failed to fetch countries');
    }
  };

  const fetchFlags = async () => {
    try {
      const response = await axios.get('http://localhost:3000/countries/flags');
      console.log('Flags API Response:', response.data);
      setFlags(response.data.data);
    } catch (err) {
      console.error('Error fetching flags:', err);
      setError('Failed to fetch flags');
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchFlags();
  }, []);

  return (
    <div className="cardContainerStyle">
      {error && <div className="errorStyle">{error}</div>}
      {countries.map((country) => {
        const flag = Array.isArray(flags)
          ? flags.find((flag) => flag.iso2 === country.countryCode)
          : null;

        return (
          <div
            key={country.countryCode}
            className="cardStyle"
            onClick={() => goToCountryDetail(country.countryCode)}
          >
            <h3>{country.name}</h3>
            {flag ? (
              <img
                src={flag.flag}
                alt={`${country.name} flag`}
                className="imageStyle"
              />
            ) : (
              <div>
                <img
                  src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                  className="imageStyle"
                  alt=""
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
