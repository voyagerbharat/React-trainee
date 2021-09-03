const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(r =>
    r.json()
  );
  return response;
}

// fetch is used to fetch data from remote and it returns promise , so we use then and data is in raw format we convert it to json then simple console it
