import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Reset the global fetch mock before each test
beforeEach(() => {
  global.fetch = jest.fn();
});

// Cleanup the global fetch mock after each test
afterEach(() => {
  global.fetch.mockRestore();
});

test('renders all dropdowns correctly on initial load', () => {
  render(<App />);

  // Check that the 'Select Country' dropdown is present
  const countryDropdown = screen.getByLabelText(/select country/i);
  expect(countryDropdown).toBeInTheDocument();

  // Check that the 'Select State' dropdown is present but initially disabled
  const stateDropdown = screen.getByLabelText(/select state/i);
  expect(stateDropdown).toBeInTheDocument();
  expect(stateDropdown).toBeDisabled();

  // Check that the 'Select City' dropdown is present but initially disabled
  const cityDropdown = screen.getByLabelText(/select city/i);
  expect(cityDropdown).toBeInTheDocument();
  expect(cityDropdown).toBeDisabled();
});

test('country dropdown renders options after fetching', async () => {
  // Mock fetch response for countries
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(['Australia', 'India', 'United States']),
  });

  render(<App />);

  // Check that the 'Select Country' dropdown has options after fetching
  const countryDropdown = screen.getByLabelText(/select country/i);
  expect(await screen.findByText('Australia')).toBeInTheDocument();
  expect(await screen.findByText('India')).toBeInTheDocument();
  expect(await screen.findByText('United States')).toBeInTheDocument();

  // Verify fetch was called
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(expect.any(String)); // You can add a more specific URL match here.
});
