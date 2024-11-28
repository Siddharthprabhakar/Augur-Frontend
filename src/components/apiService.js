// apiService.js

import { mockShipments, mockMetrics } from './mockData';

// Simulate fetching shipments
export const fetchShipments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockShipments);
    }, 1000); // Simulate a network delay
  });
};

// Simulate fetching metrics
export const fetchMetrics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMetrics);
    }, 1000); // Simulate a network delay
  });
};
