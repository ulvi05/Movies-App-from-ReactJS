import axios from "axios";
import { BASE_URL } from "./constants";

export async function getAll(endpoint) {
  let response = { data: null, error: null, loading: true };

  await axios
    .get(`${BASE_URL}/${endpoint}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.error = err;
    })
    .finally(() => {
      response.loading = false;
    });
  return response;
}

// get :id fetch

export async function getID(endpoint, id) {
  let response = { data: null, error: null, loading: true };

  try {
    const res = await axios.get(`${BASE_URL}/${endpoint}/${id}`);
    response.data = res.data;
  } catch (err) {
    response.error = err;
  } finally {
    response.loading = false;
  }

  return response;
}

//delete fetch

export async function deleteAPI(endpoint, id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting data:", err);
    throw err;
  }
}

//patch fetch

export async function patchAPI(endpoint, id, payload) {
  try {
    const res = await axios.patch(`${BASE_URL}/${endpoint}/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("Error patching data:", err);
    throw err;
  }
}

//put fetch

export async function putAPI(endpoint, id, payload) {
  try {
    const res = await axios.put(`${BASE_URL}/${endpoint}/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("Error updating data:", err);
    throw err;
  }
}

//post fetch
export async function postAPI(endpoint, payload) {
  try {
    const res = await axios.post(`${BASE_URL}/${endpoint}`, payload);
    return res.data;
  } catch (err) {
    console.error("Error posting data:", err);
    throw err; 
  }
}