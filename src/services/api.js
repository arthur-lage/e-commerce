import axios from "axios";

const baseURL = "http://localhost:3001";

const api = {
  async getAll() {
    return await axios.get(`${baseURL}/products/get/all`);
  },
  async getByID(id) {
    return await axios.get(`${baseURL}/products/get/${id}`);
  },
  async addProduct(newProduct) {
    await axios.post(`${baseURL}/products/add`, newProduct);
  },
  async updateByID(id, newInfo) {
    await axios.patch(`${baseURL}/products/update/${id}`, newInfo);
  },
  async deleteAll() {
    await axios.delete(`${baseURL}/products/delete/all`);
  },
  async deleteByID(id) {
    await axios.delete(`${baseURL}/products/delete/${id}`);
  },
  async search(name){
    return await axios.get(`${baseURL}/products/search/${name}`);
  },
  async calculateRating(id){
    return await axios.patch(`${baseURL}/products/calculate-rating/${id}`)
  },
  async addComment(productId, data){
    return await axios.patch(`${baseURL}/products/comments/add/${productId}`, data)
  },
  async removeComment(productId, commentId){
    return await axios.patch(`${baseURL}/products/comments/remove/${productId}/${commentId}`)
  },
  async login(data){
    return await axios.post(`${baseURL}/users/login`, data)
  },
  async register(data){
    return await axios.post(`${baseURL}/users/register`, data)
  },
  async updateUser(userId, data){
    return await axios.patch(`${baseURL}/users/update/${userId}`, data)
  },
  async deleteUser(userId){
    return await axios.delete(`${baseURL}/users/delete/${userId}`)
  }
};

export default api;
