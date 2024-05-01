import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options as any);
};

const GraphComponent = () => {
  const [salesData, setSalesData] = useState<{
    dates: string[];
    subtotals: number[];
  } | null>(null);

  useEffect(() => {
    fetchSalesData();
  }, []);

  Chart.register(...registerables);

  const fetchSalesData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/analytics/salesdata"
      );
      const data = await response.json();

      // Format the dates
      const formattedDates = data.dates.map(formatDate);
      const sortedDates = formattedDates.sort(
        (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
      );

      setSalesData({ dates: sortedDates, subtotals: data.subtotals });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const chartData = {
    labels: salesData ? salesData.dates : [],
    datasets: [
      {
        label: "Total Sales Revenue",
        data: salesData ? salesData.subtotals : [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} className="w-full" />
    </div>
  );
};

export default GraphComponent;
