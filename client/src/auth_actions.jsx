import { redirect } from "react-router-dom";
import { SERVER_URL } from "./keys";
import axios from "axios";


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

export { registrationAction};