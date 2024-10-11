import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './cardDetail.css';

const CountryDetail = ({ countryCode, goToCountryDetail }) => {
  const [countryDetail, setCountryDetail] = useState(null);
  const [flags, setFlags] = useState([]);
  const [error, setError] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const canvasRef = useRef(null); // Ref para el canvas

  const fetchCountryDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/country/${countryCode}`
      );
      setCountryDetail(response.data);
    } catch (err) {
      console.error('Error fetching country detail:', err);
      setError('Failed to fetch country details');
    }
  };

  const fetchFlags = async () => {
    try {
      const response = await axios.get('http://localhost:3000/countries/flags');
      setFlags(response.data.data);
    } catch (err) {
      console.error('Error fetching flags:', err);
      setError('Failed to fetch flags');
    }
  };

  const fetchPopulationData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/countries/population'
      );
      const populationDataArray = response.data.data;
      const countryName =
        countryDetail?.name ||
        countryDetail?.commonName ||
        countryDetail?.officialName;

      if (!countryName) {
        console.error('Country name is undefined:', countryDetail);
        return;
      }

      const matchedPopulationData = populationDataArray.find(
        (countryGroup) => countryGroup.country === countryName
      );

      console.log('Matched Population Data:', matchedPopulationData);

      if (matchedPopulationData) {
        setPopulationData(matchedPopulationData);
      } else {
        console.error('No population data found for country:', countryName);
      }
    } catch (err) {
      console.error('Error fetching population data:', err);
      setError('Failed to fetch population data');
    }
  };

  useEffect(() => {
    if (countryCode) {
      fetchCountryDetail();
      fetchFlags();
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryDetail) {
      fetchPopulationData();
    }
  }, [countryDetail]);

  useEffect(() => {
    if (populationData && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawChart(ctx, populationData.populationCounts);
    }
  }, [populationData]);

  const drawChart = (ctx, populationCounts) => {
    // Limpiar el canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Configurar las dimensiones del gráfico
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;

    const years = populationCounts.map((data) => data.year);
    const populations = populationCounts.map((data) => data.value);

    const maxPopulation = Math.max(...populations);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    // Escalar valores para que quepan en el canvas
    const scaleX = (width - 2 * padding) / (maxYear - minYear);
    const scaleY = (height - 2 * padding) / maxPopulation;

    // Dibujar ejes
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding); // Eje X
    ctx.lineTo(width - padding, padding); // Eje Y
    ctx.stroke();

    // Dibujar los puntos y líneas
    ctx.beginPath();
    ctx.moveTo(
      padding + (years[0] - minYear) * scaleX,
      height - padding - populations[0] * scaleY
    );
    for (let i = 1; i < years.length; i++) {
      const x = padding + (years[i] - minYear) * scaleX;
      const y = height - padding - populations[i] * scaleY;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Dibujar puntos en las posiciones
    ctx.fillStyle = 'red';
    populationCounts.forEach((data) => {
      const x = padding + (data.year - minYear) * scaleX;
      const y = height - padding - data.value * scaleY;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Mostrar 10 valores espaciados en el eje X (años)
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    const xStep = Math.floor(years.length / 10); // Dividir en 10 segmentos
    for (let i = 0; i < years.length; i += xStep) {
      const x = padding + (years[i] - minYear) * scaleX;
      ctx.fillText(years[i], x, height - padding + 15);
    }

    // Mostrar 10 valores en el eje Y (poblaciones) abreviados
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const yStep = maxPopulation / 10; // Dividir en 10 segmentos
    for (let i = 0; i <= 10; i++) {
      const populationValue = yStep * i;
      const y = height - padding - populationValue * scaleY;
      ctx.fillText(formatPopulation(populationValue), padding - 10, y);
    }
  };

  // Función para abreviar los números grandes en millones o miles
  const formatPopulation = (value) => {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M'; // Millones
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'K'; // Miles
    } else {
      return value.toString(); // Si es menor de 1000, se muestra completo
    }
  };

  const getFlagByCountryCode = (countryCode) => {
    return Array.isArray(flags)
      ? flags.find((flag) => flag.iso2 === countryCode)?.flag
      : null;
  };

  const handleBorderClick = (borderCountryCode) => {
    goToCountryDetail(borderCountryCode);
  };

  return (
    <div className="countryDetailContainer">
      {error && <div className="errorStyle">{error}</div>}
      {countryDetail ? (
        <div className="countryDetailContent">
          <h1 className="countryName">
            Official Name: {countryDetail.officialName}
          </h1>
          <h2 className="countryCommonName">{countryDetail.commonName}</h2>
          <h3 className="countryRegion">Region: {countryDetail.region}</h3>

          <h3 className="countryPopulation">Population Data:</h3>
          {populationData ? (
            <div>
              <canvas ref={canvasRef} width="400" height="300" />
            </div>
          ) : (
            <p>No population data found.</p>
          )}

          {countryDetail.borders && countryDetail.borders.length > 0 ? (
            <>
              <h1 className="borderst">Borders:</h1>
              <ul>
                {countryDetail.borders.map((border) => (
                  <li
                    key={border.countryCode}
                    onClick={() => handleBorderClick(border.countryCode)}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {border.commonName}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <img
            src={
              getFlagByCountryCode(countryDetail.countryCode) ||
              'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
            }
            alt={`${countryDetail.commonName} flag`}
            className="countryFlag"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryDetail;
