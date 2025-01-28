import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const JobsitesPerMonth = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const monthNameToNumber = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };

  const groupDatesByYear = (orders) => {
    const groupedData = {};

    orders.forEach((order) => {
        if (order.year === "0" || order.month === null) return; // Skip invalid data

      const year = parseInt(order.year, 10); // Parse year as integer
      const monthName = order.month;
      const month = monthNameToNumber[monthName];

      if (isNaN(year) || month === undefined) {
          console.warn(`Invalid date: Year - ${order.year}, Month - ${order.month}`);
          return; // Skip if year or month is invalid
      }

      if (!groupedData[year]) {
        groupedData[year] = new Array(12).fill(0);
      }

      groupedData[year][month] += order.new_jobsites; // Use new_jobsites value
    });

    return groupedData;
  };

  const getData = async () => {
    try {
      const response = await fetch('https://api.ttfconstruction.com/jobsitesPerMonth.php');
      const data = await response.json();

      if (data?.length) {
        const groupedData = groupDatesByYear(data);

        const seriesData = Object.keys(groupedData).map((year) => ({
          name: `${year}`,
          data: groupedData[year],
        }));

        setChartData({
            series: seriesData,
            options: { // *** FULL OPTIONS OBJECT HERE ***
              chart: {
                type: 'line',
                height: 350,
                toolbar: { show: false },
                background: '#0e1013',
              },
              theme: {
                mode: 'dark',
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
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                ],
                labels: {
                  style: {
                    colors: '#E5E7EB',
                  },
                },
              },
              yaxis: {
                labels: {
                  formatter: (value) => `${value} Jobsites`, // Corrected label
                  style: {
                    colors: '#E5E7EB',
                  },
                },
              },
              tooltip: {
                shared: true,
                intersect: false,
                theme: 'dark',
              },
              legend: {
                position: 'bottom',
                labels: {
                  colors: '#E5E7EB',
                },
              },
              grid: {
                borderColor: '#374151',
              },
            }, // *** END OF OPTIONS OBJECT ***
          });

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="w-[95%] mx-auto mt-[50px] px-[20px] py-[10px] bg-[#0e1013] rounded-2xl">
      <h2 className="relative -top-[10px]">New Jobsites Per Month</h2>
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

export default JobsitesPerMonth;