import './App.css';
import Card from './components/card/card';
import CountryDetail from './components/cardDetail/cardDetail';
import Home from './pages/home';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Estado para controlar la página actual
  const [currentCountryCode, setCurrentCountryCode] = useState(null); // Estado para almacenar el código del país seleccionado

  // Función para cambiar a la página de detalles del país
  const goToCountryDetail = (countryCode) => {
    setCurrentPage('countryDetail');
    setCurrentCountryCode(countryCode);
  };

  // Función para volver a la página de inicio
  const goToHome = () => {
    setCurrentPage('home');
    setCurrentCountryCode(null);
  };

  return (
    <>
      {currentPage === 'home' && (
        <>
          <Home />
          <Card goToCountryDetail={goToCountryDetail} />
        </>
      )}
      {currentPage === 'countryDetail' && (
        <>
          <CountryDetail
            countryCode={currentCountryCode}
            goToCountryDetail={goToCountryDetail} // Pasar la función al componente
          />
          <button onClick={goToHome}>Return to the list of countries</button>
        </>
      )}
    </>
  );
}

export default App;
