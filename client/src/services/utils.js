export const fetchData = async (url, method = "GET", data = undefined) => {
  const headers = {
      'Content-Type': 'application/json',
  };

  const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
  });
  
  const rs = await res.json();
  if (!res.ok) {
      throw new Error(rs.message);
  }
  
  return rs;
};

export const fetchDataWithToken = async (url, method = "GET", data = undefined) => {
  const token = localStorage.getItem('token');
  if (!token)
    throw new Error("No token");
  
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
  };
  
  const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
  });
  
  const rs = await res.json();
  if (!res.ok) {
      throw new Error(rs.message);
  }
  
  return rs;
};

export const convertQuery = (query) => {
  const { page = 1, limit = 15, sort = "", q = "" } = query;
  let queryString = `page=${page}&limit=${limit}&sort=${sort}&search=${q}`;
  
  const rating = query['rating_option'];
  let minRating = 0, maxRating = 10;

  switch (rating) {
    case "1":
      minRating = 9;
      break;
    case "2":
      minRating = 7;
      maxRating = 9;
      break;
    case "3":
      minRating = 5;
      maxRating = 7;
      break;
    case "4":
      maxRating = 5;
      break;
    default:
        break;
  }

  if (minRating > 0) {
    queryString += `&vote_average[gt]=${minRating}`;
  }

  if (maxRating < 10) {
    queryString += `&vote_average[lt]=${maxRating}`;
  }

  const {release_date_from, release_date_to} = query;
  if (release_date_from) {
    queryString += `&release_date[gte]=${release_date_from}`;
  }
  if (release_date_to) {
    queryString += `&release_date[lte]=${release_date_to}`;
  }

  return queryString;
}