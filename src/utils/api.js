const { REACT_APP_SERVER_URI } = process.env;

const api = {};

api.get = async (path) => {
  const token = localStorage.getItem('token');
  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  const response = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'GET',
    headers,
  }).then((result) => result.json());

  return response.data;
};

api.post = async (path, body) => {
  const token = localStorage.getItem('token');
  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  const response = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((result) => result.json());

  return response.data;
};

api.put = async (path, body) => {
  const token = localStorage.getItem('token');
  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  const response = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }).then((result) => result.json());

  return response.data;
};

api.delete = async (path, body) => {
  const token = localStorage.getItem('token');
  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body),
  }).then((result) => result.json());

  return;
};

export default api;
