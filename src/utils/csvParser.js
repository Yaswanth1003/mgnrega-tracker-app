import Papa from 'papaparse';

export const loadCSVData = async () => {
  try {
    const response = await fetch('/mgnrega_data.csv');
    const csvText = await response.text();
    
    const result = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });
    
    return result.data;
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};

export const getStates = (data) => {
  const states = [...new Set(data.map(row => row.state_name))];
  return states.filter(s => s).sort();
};

export const getDistricts = (data, stateName) => {
  const filtered = data.filter(row => row.state_name === stateName);
  const districts = [...new Set(filtered.map(row => row.district_name))];
  return districts.filter(d => d).sort();
};

export const getDistrictData = (data, stateName, districtName) => {
  return data.filter(row => 
    row.state_name === stateName && 
    row.district_name === districtName
  );
};