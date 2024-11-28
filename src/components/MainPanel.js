import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MainPanel() {
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  // Distributor data
  const distributorData = [
    {
      name: 'Distributor A',
      lastMonth: 1200,
      forecastNextMonth: 1500,
      yearToDateAvg: 1300,
      additionalData: 'Additional details about Distributor A...'
    },
    {
      name: 'Distributor B',
      lastMonth: 800,
      forecastNextMonth: 950,
      yearToDateAvg: 900,
      additionalData: 'Additional details about Distributor B...'
    },
    {
      name: 'Distributor C',
      lastMonth: 1500,
      forecastNextMonth: 1400,
      yearToDateAvg: 1450,
      additionalData: 'Additional details about Distributor C...'
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleCardClick = (dist) => {
    setSelectedDistributor(dist === selectedDistributor ? null : dist);
  };

  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Distributor Data Overview</h2>

      {/* Grid for metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {distributorData.map((dist, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg cursor-pointer"
            data-aos="fade-up"
            onClick={() => handleCardClick(dist)}
          >
            <div className="card-body">
              <h3 className="card-title text-xl">{dist.name}</h3>
              <p className="text-sm">
                <span className="font-bold">Last Month:</span> {dist.lastMonth} units
              </p>
              <p className="text-sm">
                <span className="font-bold">Forecast Next Month:</span> {dist.forecastNextMonth} units
              </p>
              <p className="text-sm">
                <span className="font-bold">Year-to-Date Avg:</span> {dist.yearToDateAvg} units
              </p>

              {/* Show additional data in a dropdown when the card is clicked */}
              {selectedDistributor === dist && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h4 className="font-semibold text-lg">Detailed Analytics</h4>
                  <p>{dist.additionalData}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="divider my-14 text-4xl font-bold">Summary</div>

      {/* Summary section */}
      <div className="stats bg-base-200 shadow-md">
        <div className="stat">
          <div className="stat-title">Total Goods Shipped (Last Month)</div>
          <div className="stat-value text-primary">
            {distributorData.reduce((acc, curr) => acc + curr.lastMonth, 0)}
          </div>
          <div className="stat-desc">Across all distributors</div>
        </div>

        <div className="stat">
          <div className="stat-title">Forecast for Next Month</div>
          <div className="stat-value text-secondary">
            {distributorData.reduce((acc, curr) => acc + curr.forecastNextMonth, 0)}
          </div>
          <div className="stat-desc">Projected units</div>
        </div>

        <div className="stat">
          <div className="stat-title">Year-to-Date Average</div>
          <div className="stat-value text-accent">
            {(
              distributorData.reduce((acc, curr) => acc + curr.yearToDateAvg, 0) /
              distributorData.length
            ).toFixed(2)}
          </div>
          <div className="stat-desc">Average per distributor</div>
        </div>
      </div>
    </main>
  );
}
