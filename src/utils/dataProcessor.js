const getMonthNumber = (month) => {
    const months = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
      January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
      July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
    };
    return months[month] || 0;
  };
  
  export const getLatestData = (districtData) => {
    if (!districtData || districtData.length === 0) return null;
    const sorted = [...districtData].sort((a, b) => {
      if (a.fin_year !== b.fin_year) return b.fin_year.localeCompare(a.fin_year);
      return getMonthNumber(b.month) - getMonthNumber(a.month);
    });
    const latest = sorted[0];
    return latest
      ? {
          ...latest,
          Total_Individuals_Worked: Number(latest.Total_Individuals_Worked),
          Total_No_of_Works_Takenup: Number(latest.Total_No_of_Works_Takenup),
          Average_Wage_rate_per_day_per_person: Number(latest.Average_Wage_rate_per_day_per_person),
          Average_days_of_employment_provided_per_Household: Number(latest.Average_days_of_employment_provided_per_Household),
        }
      : null;
  };
  
  export const getPreviousData = (districtData) => {
    if (!districtData || districtData.length < 2) return null;
    const sorted = [...districtData].sort((a, b) => {
      if (a.fin_year !== b.fin_year) return b.fin_year.localeCompare(a.fin_year);
      return getMonthNumber(b.month) - getMonthNumber(a.month);
    });
    const previous = sorted[1];
    return previous
      ? {
          ...previous,
          Total_Individuals_Worked: Number(previous.Total_Individuals_Worked),
          Total_No_of_Works_Takenup: Number(previous.Total_No_of_Works_Takenup),
          Average_Wage_rate_per_day_per_person: Number(previous.Average_Wage_rate_per_day_per_person),
          Average_days_of_employment_provided_per_Household: Number(previous.Average_days_of_employment_provided_per_Household),
        }
      : null;
  };
  
  export const getTrendData = (districtData) => {
    if (!districtData || districtData.length === 0) return [];
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    const trendData = districtData
      .map(row => ({
        ...row,
        monthNum: getMonthNumber(row.month),
        Total_Individuals_Worked: Number(row.Total_Individuals_Worked),
        Total_No_of_Works_Takenup: Number(row.Total_No_of_Works_Takenup),
        Average_Wage_rate_per_day_per_person: Number(row.Average_Wage_rate_per_day_per_person),
        Average_days_of_employment_provided_per_Household: Number(row.Average_days_of_employment_provided_per_Household),
      }))
      .filter(row => {
        const rowDate = new Date(`${row.fin_year.split('-')[0]}-${row.monthNum}-01`);
        return rowDate >= sixMonthsAgo && rowDate <= today;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.fin_year.split('-')[0]}-${a.monthNum}-01`);
        const dateB = new Date(`${b.fin_year.split('-')[0]}-${b.monthNum}-01`);
        return dateA - dateB;
      });
    return trendData;
  };
  
  export const formatNumber = (num) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)} K`;
    return num?.toString() || "0";
  };
  