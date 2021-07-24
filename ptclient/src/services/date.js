import axios from 'axios';


const baseUrl = '/api';

const dateService = async () => {
  try{
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (e){
    console.log('error', e);
  }

};

export default dateService;