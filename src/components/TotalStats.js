import React, { useState, useEffect } from 'react';
import CountUp from './CountUp';

function TotalStats() {
  const [totalSitesAllTime, setTotalSitesAllTime] = useState(0);
  const [totalSitesThisYear, setTotalSitesThisYear] = useState(0);
  const [totalSitesLastYear, setTotalSitesLastYear] = useState(0);
  const [avgPerMonthAllTime, setAvgPerMonthAllTime] = useState(0);
  const [avgPerYearAllTime, setAvgPerYearAllTime] = useState(0);
  const [avgPerMonthThisYear, setAvgPerMonthThisYear] = useState(0);
  const [avgPerYearThisYear, setAvgPerYearThisYear] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.ttfconstruction.com/jobsitesPerMonth.php');
        const data = await response.json();

        if (data && data.length > 0) {
          let allTime = 0;
          let thisYear = 0;
          let lastYear = 0;
          const currentYear = new Date().getFullYear();
          const allYears = new Set();

          data.forEach(item => {
            const year = parseInt(item.year, 10);
            const count = parseInt(item.new_jobsites, 10) || 0;

            allTime += count;
            allYears.add(year);

            if (year === currentYear) {
              thisYear += count;
            } else if (year === currentYear - 1) {
              lastYear += count;
            }
          });

          const numMonthsAllTime = data.length;
          const numYearsAllTime = allYears.size;
          const numMonthsThisYear = data.filter(item => parseInt(item.year, 10) === currentYear).length;

          setTotalSitesAllTime(allTime);
          setTotalSitesThisYear(thisYear);
          setTotalSitesLastYear(lastYear);
          setAvgPerMonthAllTime(numMonthsAllTime > 0 ? allTime / numMonthsAllTime : 0);
          setAvgPerYearAllTime(numYearsAllTime > 0 ? allTime / numYearsAllTime : 0);
          setAvgPerMonthThisYear(numMonthsThisYear > 0 ? thisYear / numMonthsThisYear : 0);
          setAvgPerYearThisYear(thisYear > 0 ? thisYear : 0); // Average per year is just the total for this year

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="w-[95%] mx-auto mt-[50px] overflow-x-auto">
      <div className="flex flex-nowrap gap-[20px]">
       <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(avgPerYearAllTime)} /></p>
          <p className='text-[18px] text-center text-white'>Avg. per Year (All Time)</p>
        </div>
        <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(totalSitesThisYear)} /></p>
          <p className='text-[18px] text-center text-white'>Total Sites This Year</p>
        </div>
        <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(avgPerYearThisYear)} /></p>
          <p className='text-[18px] text-center text-white'>Avg. per Year (This Year)</p>
        </div>
        <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(totalSitesLastYear)} /></p>
          <p className='text-[18px] text-center text-white'>Total Sites Last Year</p>
        </div>
        <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(avgPerMonthAllTime)} /></p>
          <p className='text-[18px] text-center text-white'>Avg. per Month (All Time)</p>
        </div>
        
        <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(avgPerMonthThisYear)} /></p>
          <p className='text-[18px] text-center text-white'>Avg. per Month (This Year)</p>
        </div>

        <div className="stat-card bg-[#0e1013] min-w-[300px] flex items-center flex-col justify-center rounded-lg h-[150px]">
          <p className='text-[55px] -mt-[10px] font-semibold text-white'><CountUp end={parseInt(totalSitesAllTime)} /></p>
          <p className='text-[18px] text-center text-white'>Total Sites All Time</p>
        </div>
      </div>
    </div>

  );
}

export default TotalStats;