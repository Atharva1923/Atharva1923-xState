import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch countries when the component mounts
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states based on the selected country
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error('Error fetching states:', error));
    } else {
      setStates([]); // Clear states when no country is selected
    }
  }, [selectedCountry]);

  // Fetch cities based on the selected state
  useEffect(() => {
    if (selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error fetching cities:', error));
    } else {
      setCities([]); // Clear cities when no state is selected
    }
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <h1>Location Selector</h1>

      {/* Dropdown Inputs in a Row */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {/* Country Dropdown */}
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry} // Disabled until a country is selected
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState} // Disabled until a state is selected
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Display the Selected Location */}
      {selectedCity && (
        <div style={{ marginTop: '20px' }}>
          <h2>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
