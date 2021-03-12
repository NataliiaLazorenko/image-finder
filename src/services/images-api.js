import axios from 'axios';

const key = '19732926-c388afddba2de31b45aabc7bd';

const fetchImages = ({ searchQuery = '', currentPage = 1, perPage = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    )
    .then(response => response.data);
};

export default fetchImages;
