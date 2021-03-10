import axios from 'axios';

const key = '19732926-c388afddba2de31b45aabc7bd';

const fetchImages = ({ searchQuery, currentPage }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default fetchImages;
