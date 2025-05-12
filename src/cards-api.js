import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export async function fetchImages(query, currentPage) {
  const response = await axios.get("/search/photos", {
    params: {
      query: query,
      page: currentPage,
      per_page: 12,
      client_id: "zRaCiU2tTRtoQWRD8gVnR0BZl4aKEhF9RQ7L9-gsK8E",
    },
  });

  const images = response.data.results.map((item) => ({
    id: item.id,
    smallUrl: item.urls.small,
    largeUrl: item.urls.full,
    description: item.alt_description || "No description",
  }));

  return {
    images,
    total: response.data.total,
  };
}
/*export async function fetchImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error("Помилка при завантаженні зображень");
  }

  const data = await response.json();
  return data.results;
}*/
