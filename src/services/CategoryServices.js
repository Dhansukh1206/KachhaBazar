import requests from './httpServices';

const CategoryServices = {
  getAllCategory() {
    return requests.get('/api/category/data');
  },
};

export default CategoryServices;
