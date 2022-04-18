import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '25267969-1b21c6cce0210f4f694534b04';

const fetchImages = async (query, pages = 1) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${pages}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};

export default fetchImages;
