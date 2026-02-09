const API_URL = "https://fakestoreapi.com/products";

export async function fetchVideos() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    channel: item.category,
    thumbnail: item.image,
  }));
}