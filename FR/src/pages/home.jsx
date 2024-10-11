const Home = () => {
  return (
    <div>
      {/* Header */}
      <header style={headerStyle}>
        <h1>Welcome to the Country App</h1>
      </header>

      {/* Body */}
      <main style={mainStyle}>
        <h2>Explore the Countries</h2>
        <p>
          On this application, you can get detailed information about different
          countries, including their populations, flags, and more. Browse
          through our database to learn about the world around you
        </p>
        <p>Select a country to see more information and statistics.</p>
      </main>
    </div>
  );
};

// Estilos en línea (puedes personalizarlos o usar un archivo CSS)
const headerStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  textAlign: 'center',
  padding: '1rem',
};

const mainStyle = {
  padding: '2rem',
};

export default Home;
