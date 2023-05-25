import axios from 'axios';
const username = `${process.env.USER_NAME}`;
const password = `${process.env.PASSWORD}`;
const API = `${process.env.MAP_KEY}`;

const handleApiError = (error) => {
    console.error('API Error:', error);
    throw error;
  };
  const config = {
    auth: {
      username: username,
      password: password
    }, 
  };
  

const BASE_URL = "https://opensky-network.org/api/states/all"; //  API base URL

export const ResponseFlightAPI = async () => {
    
    try {
    const response= await axios.get(BASE_URL, config);
          return response;
        } catch (error) {
      handleApiError(error);
      }
};


export const baseUrl = () => 
{
   return `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places`
}