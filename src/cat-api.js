const BASE_API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_Pf6TQswVRH9Evu1FuMHlfi9EJTbLroUshBofydxVS09W8oeXeopbTSN55FiZAFCA';

export function fetchBreeds() {
    return fetch(
        `${BASE_API_URL}/breeds?api_key=${API_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText || response.status);
        }
        return response.json();
    })
};

export function fetchCatByBreed(breedId) {
    return fetch(
        `${BASE_API_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText || response.status);
        }
        return response.json();
    })
};