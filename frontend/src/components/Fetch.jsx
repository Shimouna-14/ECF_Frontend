const FetchData = async (url, setting) => {
    try {
      const response = await fetch(url); 
      const data = await response.json();
      // console.log(data);
      setting(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };
  
export default FetchData;