import { BASE_URL } from "./constants";

const headers = new Headers({
  'x-rapidapi-host': import.meta.env.VITE_RAPID_HOST,
  'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
});

const handleResponse = (response: Response) => {
  if (!response.ok) throw response
  return response
}

export const getFoodProducts = (searchParam: string): Promise<Response> => {
  const URL = `${BASE_URL}/request.php?ingredient=${searchParam}`;
  return fetch(`${URL}`, { headers }).then(handleResponse);
};

export const getFoodProduct = (id: number): Promise<Response> => {
  const URL = `${BASE_URL}/product.php?id=${id}`;
  return fetch(`${URL}`, { headers }).then(handleResponse);
};