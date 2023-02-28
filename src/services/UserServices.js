import requests from "./httpServices";

const UserServices = {
  userLogin(body) {
    return requests.post("/api/retailer/login", body);
  },

  userRegister(body) {
    return requests.post("/user/register", body);
  },

  signUpWithProvider(body) {
    return requests.post("/user/signup", body);
  },

  updateUser(id, body) {
    return requests.put(`/user/${id}`, body);
  },
};

export default UserServices;
