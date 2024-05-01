import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";

// Register linear scale module
Chart.register(...registerables);

const GraphComponent = () => {
  // Fake total sales revenue data
  const totalSalesRevenueData = [5000, 7000, 6000, 8000];

  const [chartData, setChartData] = useState({
    labels: ["Product 1", "Product 2", "Product 3", "Product 4"],
    datasets: [
      {
        label: "Total Sales Revenue",
        data: totalSalesRevenueData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const chartOptions: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraphComponent;
