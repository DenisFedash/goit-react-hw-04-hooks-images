const URL = 'https://pixabay.com/api';
const KEY = '25267969-1b21c6cce0210f4f694534b04';

function fetchImages(query, page = 1) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
}

export default fetchImages;
