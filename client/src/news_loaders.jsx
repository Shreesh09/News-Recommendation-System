import axios from 'axios';
import { headers, SERVER_URL } from './keys.jsx';

const recommendationLoader = async ({ params }) => {
    let state = 0
    let page = params.page ?? 1;
    let response;
    try {
        response = await axios.get(`${SERVER_URL}/getNewsRecommendation`, { params: { page }, headers: headers });
    } catch (error) {
        console.log(error);
    }
    const articles = response.data;
    return { state, page, articles };
  }
  
  const historyLoader = async ({ params }) => {
    let state = 1
    let page = params.page ?? 1;
    let response;
    try {
        response = await axios.get(`${SERVER_URL}/getUserHistory`, { params: { page }, headers: headers });
    } catch (error) {
        console.log(error);
    }
    const articles = response.data;
    return { state, page, articles };
  }
  
  const searchLoader = async ({ params }) => {
    let state = 2
    let search = params.search;
    let page = params.page ?? 1;
    let response;
    try {
        response = await axios.get(`${SERVER_URL}/search`, { params: { search, page }, headers: headers });
    } catch (error) {
        console.log(error);
    }
    const articles = response.data;
    return { state, page, articles, search };
  }

  export { recommendationLoader, historyLoader, searchLoader};