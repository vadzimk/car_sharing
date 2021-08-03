import axios from 'axios';


const baseUrl = '/api/test';

const date = async () => {
  try{
    const res = await axios.get(baseUrl + '/date');
    return res.data;
  } catch (e){
    console.log('error', e);
  }

};


const testService = {date};
export default testService;