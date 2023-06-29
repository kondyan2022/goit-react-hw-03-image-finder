import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '36866601-178af3e0308e9ca859765384a',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};
async function fetchImages(query, page = 1) {
  const queryString = String(query).split(/ {1,}/).join('+');
  const response = await axios('', {
    params: {
      q: queryString,
      page: page,
    },
  });
  return response;
}

export default fetchImages;
