import axios from 'axios';
import { headers, SERVER_URL } from './keys.jsx';
import { redirect } from 'react-router-dom';

const recommendationLoader = async ({ params }) => {
    let state = 0
    let page = params.page ?? 1;
    let response;
    try {
        response = await axios.get(`${SERVER_URL}/getNewsRecommendation`, { params: { page }, headers: headers });
        const articles = response.data;
        return { state, page, articles };
    } catch (error) {
        if(error.response.status !=  500) 
            return redirect('/login');
        console.log(error);
    }
    return {};
  }
  
  const historyLoader = async ({ params }) => {
    let state = 1
    let page = params.page ?? 1;
    let response;
    try {
        response = await axios.get(`${SERVER_URL}/getUserHistory`, { params: { page }, headers: headers });
        const articles = response.data;
        return { state, page, articles };
    } catch (error) {
        if(error.response.status !=  500) 
            return redirect('/login');
        console.log(error);
    }
    return {};
  }
  
  const searchLoader = async ({ params }) => {
    let state = 2
    let search = params.search;
    let page = params.page ?? 1;
    let response;
    try {
        response = await axios.get(`${SERVER_URL}/search`, { params: { search, page }, headers: headers });
        const articles = response.data;
        return { state, page, articles, search };
    } catch (error) {
        if(error.response.status !=  500) 
            return redirect('/login');
        console.log(error);
    }
    return {};
  }

  export { recommendationLoader, historyLoader, searchLoader};