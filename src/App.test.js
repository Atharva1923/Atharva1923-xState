import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders all dropdowns correctly on initial load', () => {
  render(<App />);

  // Check that the 'Select Country' dropdown is present
  const countryDropdown = screen.getByLabelText(/select country/i);
  expect(countryDropdown).toBeInTheDocument();
  
  // Check that the 'Select State' dropdown is present but disabled
  const stateDropdown = screen.getByLabelText(/select state/i);
  expect(stateDropdown).toBeInTheDocument();
  expect(stateDropdown).toBeDisabled();
  
  // Check that the 'Select City' dropdown is present but disabled
  const cityDropdown = screen.getByLabelText(/select city/i);
  expect(cityDropdown).toBeInTheDocument();
  expect(cityDropdown).toBeDisabled();
});

test('country dropdown renders options after fetching', async () => {
  // Mock fetch response for countries
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(['Australia', 'India', 'United States']),
    })
  );

  render(<App />);

  // Check that the 'Select Country' dropdown has options after fetching
  const countryDropdown = screen.getByLabelText(/select country/i);
  expect(await screen.findByText('Australia')).toBeInTheDocument();
  expect(await screen.findByText('India')).toBeInTheDocument();
  expect(await screen.findByText('United States')).toBeInTheDocument();
});
