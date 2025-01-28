import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const OrdersPerCompany = ({ orders }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Helper function to process orders and get the top 10 companies
  const getTopCompanies = (orders) => {
    const companyCounts = {};

    // Count occurrences for shipping and return for each company
    orders.forEach((order) => {
      const company = order.company?.toLowerCase() || 'unknown'; // Use "unknown" for missing company names
      const status = order.theStatus?.toLowerCase(); // Normalize status to lowercase

      if (!companyCounts[company]) {
        companyCounts[company] = { shipping: 0, return: 0 };
      }

      if (status === 'shipping' || status === 'Shipping') {
        companyCounts[company].shipping += 1;
      } else if (status === 'return' || status === 'Return') {
        companyCounts[company].return += 1;
      }
    });

    // Sort companies by total orders (shipping + return) in descending order and take the top 10
    const sortedCompanies = Object.entries(companyCounts)
      .map(([company, counts]) => ({
        company: company.split(' ')[0],
        shipping: counts.shipping,
        return: counts.return,
        total: counts.shipping + counts.return,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 15);

    // Separate labels (company names) and data (shipping and return counts)
    const labels = sortedCompanies.map((item) => item.company.toUpperCase());
    const shippingData = sortedCompanies.map((item) => item.shipping);
    const returnData = sortedCompanies.map((item) => item.return);

    return { labels, shippingData, returnData };
  };

  useEffect(() => {
    if (orders?.length) {
      const { labels, shippingData, returnData } = getTopCompanies(orders);
      const maxValue = Math.max(...[...shippingData, ...returnData]);

      // Update chart data
      setChartData({
        series: [
          {
            name: 'Shipping Orders',
            data: shippingData,
          },
          {
            name: 'Return Orders',
            data: returnData,
          },
        ],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
            background: '#0e1013',
          },
          theme: {
            mode: 'dark', // Enable dark mode
          },
          colors: ['#65D1B5', '#ff7f50'], // Colors for shipping and return bars
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 0,
              dataLabels: { position: 'top' },
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: labels,
            labels: {
              style: {
                colors: '#E5E7EB', // Light text for dark mode
                fontSize: '12px',
              },
            },
          },
          yaxis: {
            max: maxValue, // Dynamically adjust max to highest value
            min: 0,
            labels: {
              style: {
                colors: '#E5E7EB', // Light text for dark mode
                fontSize: '10px',
              },
            },
          },
          tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark',
          },
          legend: {
            show: true,
            labels: {
              colors: '#E5E7EB',
            },
          },
          grid: {
            borderColor: '#374151', // Subtle grid lines for dark mode
          },
        },
      });
    }
  }, [orders]);

  return (
    <div className="w-[100%] mx-auto px-[20px] py-[10px] bg-[#0e1013] rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Top 10 Companies: Shipping vs Return</h2>
      {chartData.series.length > 0 ? (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default OrdersPerCompany;
