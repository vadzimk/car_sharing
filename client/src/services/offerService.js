import api from './api.js';

const getOffers = async(bbox, dateFrom, dateTo, attributes) => {
  const res = await api.get('/offers', {params:{bbox, dateFrom, dateTo, attributes}});
  console.log(res.status);
  console.log(res);
  return {
    success: res.status===200,
    data: res.data,
  };
};

export default {getOffers};