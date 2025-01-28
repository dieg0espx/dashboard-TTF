import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const JobsitePerCompany = ({ orders }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Helper function to process orders and get the top 10 companies by unique theLocation count
  const getTopCompaniesByUniqueLocations = (orders) => {
    const companyLocations = {};

    // Collect unique theLocation values for each company
    orders.forEach((order) => {
      const company = order.company?.toLowerCase() || 'unknown'; // Use "unknown" for missing company names
      const location = order.theLocation?.toLowerCase() || 'unknown'; // Handle missing theLocation

      if (!companyLocations[company]) {
        companyLocations[company] = new Set();
      }

      companyLocations[company].add(location); // Add unique locations to the set
    });

    // Convert sets to counts and sort companies by unique theLocation count
    const sortedCompanies = Object.entries(companyLocations)
      .map(([company, locationsSet]) => ({
        company,
        uniqueLocations: locationsSet.size,
      }))
      .sort((a, b) => b.uniqueLocations - a.uniqueLocations)
      .slice(0, 10); // Take the top 10 companies

    // Separate labels (company names) and data (unique location counts)
    const labels = sortedCompanies.map((item) => item.company.toUpperCase().split(" ")[0]);
    const data = sortedCompanies.map((item) => item.uniqueLocations);

    return { labels, data };
  };

  useEffect(() => {
    if (orders?.length) {
      const { labels, data } = getTopCompaniesByUniqueLocations(orders);
      const maxValue = Math.max(...data); // Find the max value for y-axis

      // Update chart data
      setChartData({
        series: [
          {
            name: 'Jobsites',
            data: data,
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
          colors: ['#65D1B5'], // Single color for the bars
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 0,
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
            max: maxValue, // Set max value dynamically
            min: 0,
            labels: {
              style: {
                colors: '#E5E7EB', // Light text for dark mode
                fontSize: '10px',
              },
            },
          },
          tooltip: {
            shared: false,
            intersect: true,
            theme: 'dark',
          },
          legend: {
            show: false, // No legend needed for single series
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
      <h2 className="text-2xl font-bold mb-4 text-white">Jobsites Per Company</h2>
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

export default JobsitePerCompany;
