import React, { useState, useEffect } from 'react';
import { fetchShipments, fetchMetrics } from './apiService';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MainPanel() {
  const [shipments, setShipments] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('lastMonth');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [quantityFilter, setQuantityFilter] = useState('');

  const distributorData = [
    { name: 'Distributor A', lastMonth: 1200, forecastNextMonth: 1500, yearToDateAvg: 1300 },
    { name: 'Distributor B', lastMonth: 800, forecastNextMonth: 950, yearToDateAvg: 900 },
    { name: 'Distributor C', lastMonth: 1500, forecastNextMonth: 1400, yearToDateAvg: 1450 },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchShipments().then(setShipments);
    fetchMetrics().then(setMetrics);
  }, []);

  const handleCardClick = (dist) => {
    setSelectedDistributor(dist === selectedDistributor ? null : dist);
  };

// Filtering the shipments
const filteredShipments = shipments.filter((shipment) => {
  // Date Filter Logic
  const dateMatch = selectedDate === 'all' || (
    selectedDate === 'lastMonth' && new Date(shipment.date).getMonth() === new Date().getMonth() - 1
  ) || (
    selectedDate === 'lastYear' && new Date(shipment.date).getFullYear() === new Date().getFullYear() - 1
  );
  
  // Status Filter Logic
  const statusMatch = selectedStatus === 'all' || shipment.status.toLowerCase() === selectedStatus.toLowerCase();
  
  // Quantity Filter Logic
  const quantityMatch = !quantityFilter || (Number(quantityFilter) && shipment.quantity >= Number(quantityFilter));

  return dateMatch && statusMatch && quantityMatch;
});

  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Distributor Data Overview</h2>

      {/* Grid for distributor metrics */}
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
      <div className="divider my-14 text-4xl font-bold">Shipment Summary</div>

      {/* Shipments Stats */}
      <div className="stats bg-base-200 shadow-md">
        <div className="stat">
          <div className="stat-title">Total Shipments (Last Month)</div>
          <div className="stat-value text-primary">{metrics.totalShipments}</div>
          <div className="stat-desc">Total shipments across all distributors</div>
        </div>
        <div className="stat">
          <div className="stat-title">Shipment Performance</div>
          <div className="stat-value text-accent">
            {metrics.shipmentPerformance ? `${metrics.shipmentPerformance.onTime}% On Time` : 'Loading...'}
          </div>
          <div className="stat-desc">Percentage of on-time shipments</div>
        </div>
      </div>

      {/* Shipment List */}
      <h3 className="text-2xl font-semibold my-6">Shipment Details</h3>
      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center justify-between space-x-4">
          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dateFilter" className="font-semibold">Date</label>
            <select
              id="dateFilter"
              className="select select-bordered w-40"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="statusFilter" className="font-semibold">Status</label>
            <select
              id="statusFilter"
              className="select select-bordered w-40"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
              <option value="inTransit">In Transit</option>
            </select>
          </div>

          {/* Quantity Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="quantityFilter" className="font-semibold">Quantity</label>
            <input
              type="number"
              id="quantityFilter"
              className="input input-bordered w-40"
              value={quantityFilter}
              onChange={(e) => setQuantityFilter(e.target.value)}
              placeholder="Enter Quantity"
            />
          </div>
        </div>

        {/* Table */}
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="text-left">Shipment ID</th>
              <th className="text-left">Date</th>
              <th className="text-left">Status</th>
              <th className="text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.date}</td>
                <td>{shipment.status}</td>
                <td>{shipment.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
