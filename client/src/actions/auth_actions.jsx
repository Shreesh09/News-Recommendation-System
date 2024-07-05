import { redirect } from "react-router-dom";
import { SERVER_URL } from "../config/keys";
import axios from "axios";

async function loginAction({request}) {
  const formData = await request.formData();
  try {
    const username = formData.get('username');
    const password = formData.get('password');
    const response = await axios.post(`${SERVER_URL}/login`, {username, password})
    sessionStorage.setItem('token', response.data.access_token);
    sessionStorage.setItem('username', username)
    return redirect('/home/dashboard/1');
  } catch (e) {
    console.log(e)
    return "Invalid username or password"
  }
}

async function registrationAction({request}) {
  const formData = await request.formData();
  try {
    const username = formData.get('username');
    const password = formData.get('password');
    await axios.post(`${SERVER_URL}/createUser`, {username, password})
  } catch (e) {
    console.log(e)
  }
  return redirect('/login');
}

export { registrationAction, loginAction};