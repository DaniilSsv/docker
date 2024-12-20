import React, { useEffect, useState } from 'react';

function App() {
  const [carBrands, setCarBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch car brands from the backend using fetch
  useEffect(() => {
    console.log(`${process.env.REACT_APP_API_URL}/car-brands`)
    fetch(`${process.env.REACT_APP_API_URL}/car-brands`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCarBrands(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching car brands');
        setLoading(false);
        console.error(err);  // Log the error for more details
      });
  }, []);

  return (
    <div className="App">
      <h1>Car Brands</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {carBrands.map((brand, index) => (
          <li key={index}>{brand}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
