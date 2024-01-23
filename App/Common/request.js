import axios from 'axios';
import { BASE_URL } from '../utils/Baseurl';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sendRequst = (config) => {
  return axiosInstance
    .request(config)
}

export const getRequest = (path) => {
  return sendRequst({
    method: 'GET',
    url: path
  })
};

export const deletRequst = (path) =>{
  console.log(path);
  return sendRequst({
    method: 'DELETE',
    url: path
  })
}

export const postRequest = (path , data) =>{
  return sendRequst({
    method:'POST',
    url : path, 
    data : data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const putRequest = (path , data) =>{
  // console.log(path, data);
  return sendRequst({
    method:'PUT',
    url : path + data.id, 
    data : data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}