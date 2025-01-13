import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const YearsOrders = ({ orders }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Helper function to process dates
  const groupDatesByYear = (dates) => {
    const groupedData = {};

    dates.forEach((dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-indexed months

      if (!groupedData[year]) {
        groupedData[year] = new Array(12).fill(0); // Initialize with 12 months
      }

      groupedData[year][month] += 1; // Increment the count for the respective month
    });

    return groupedData;
  };

  useEffect(() => {
    if (orders?.length) {
      const groupedData = groupDatesByYear(orders);

      // Prepare chart series
      const seriesData = Object.keys(groupedData).map((year) => ({
        name: `${year}`,
        data: groupedData[year],
      }));

      // Update chart data
      setChartData({
        series: seriesData,
        options: {
          chart: {
            type: 'line',
            height: 350,
            toolbar: { show: false },
            background: '#0e1013', // Set background color to black
          },
          theme: {
            mode: 'dark', // Enable dark mode
          },
          colors: ['#1A56DB', '#7E3BF2', '#F97316', '#E91E63', '#00E676'],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
            width: 2,
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            labels: {
              style: {
                colors: '#E5E7EB', // Light text color for dark mode
              },
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => `${value} Orders`,
              style: {
                colors: '#E5E7EB', // Light text color for dark mode
              },
            },
          },
          tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark', // Tooltip theme for dark mode
          },
          legend: {
            position: 'bottom',
            labels: {
              colors: '#E5E7EB', // Light text color for legend
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
    <div className="w-[95%] mx-auto mt-[50px] px-[20px] py-[10px] bg-[#0e1013] rounded-2xl">
        <h2 className='relative -top-[10px]'> Shipping + Return </h2>
      {chartData.series.length > 0 && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default YearsOrders;



