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