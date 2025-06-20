const API_BASE = `${import.meta.env.VITE_REACT_APP_BASE_URL}/recommendations`;

export async function fetchRecommendations(
  userId,
  page = 1,
  limit = 10,
  token
) {

  console.log("Fetching recommendations with token:", token); // Add this here

  if (!token) throw new Error("No token provided");
  
  const url = new URL(API_BASE);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`, // pass JWT or auth token
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }
  return response.json(); // { movies, total, page, limit }
}
