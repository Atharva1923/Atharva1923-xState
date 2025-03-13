import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        <label htmlFor="country">Select Country: </label>
        <select id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="" disabled>Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          <label htmlFor="state">Select State: </label>
          <select id="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="" disabled>Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}

      {selectedState && (
        <div>
          <label htmlFor="city">Select City: </label>
          <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="" disabled>Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCity && (
        <div>
          <h2>You selected {selectedCity}, {selectedState}, {selectedCountry}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
