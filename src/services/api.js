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

  await axios
    .get(`${BASE_URL}/${endpoint}/${id}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.error = err;
    })
    .finally(() => {
      response.loading = false;
    });
}

//delete fetch

export async function deleteAPI(endpoint, id) {
  let response = null;
  await axios.delete(`${BASE_URL}/${endpoint}/${id}`).then((res) => {
    response = res.data;
  });

  return response;
}

//patch fetch

export async function patchAPI(endpoint, id, payload) {
  let response = null;
  await axios.patch(`${BASE_URL}/${endpoint}/${id}`, payload).then((res) => {
    response = res.data;
  });
  return response;
}

//put fetch

export async function putAPI(endpoint, id, payload) {
  let response = null;
  await axios.put(`${BASE_URL}/${endpoint}/${id}`, payload).then((res) => {
    response = res.data;
  });
  return response;
}

//post fetch
export async function postAPI(endpoint, id, payload) {
  let response = null;
  await axios.post(`${BASE_URL}/${endpoint}/${id}`, payload).then((res) => {
    response = res.data;
  });
  return response;
}
