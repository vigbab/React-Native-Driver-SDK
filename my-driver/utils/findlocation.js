import axios from 'axios';

const getLocationName = async (latitude, longitude) => {
    console.log(longitude,latitude)
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7b483ce86cff4b878e10e62c449e0619&no_annotations=1`
    );

    if (response.data.results.length > 0) {
        // console.log(response.data.results[0].formatted)
      return response.data.results[0].formatted;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getLocationName;


