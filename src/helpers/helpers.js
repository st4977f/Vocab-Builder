import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});

const vm = new Vue();
const baseURL = process.env.VUE_APP_API_BASE_URL || '/api';;

const handleError =
  (fn) =>
  async (...params) => {
    try {
      return await fn(...params);
    } catch (error) {
      vm.flash(
        `${error.response.status}: ${error.response.statusText}`,
        "error"
      );
      throw error;
    }
  };

export const api = {
  getWord: handleError(async (id) => {
    console.log('API call to:', `${baseURL}/${id}`);
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
  }),
  getWords: handleError(async () => {
    console.log('API call to:', `${baseURL}`);
    const res = await axios.get(`${baseURL}`);
    return res.data;
  }),
  deleteWord: handleError(async (id) => {
    console.log('API call to:', `${baseURL}/${id}`);
    const res = await axios.delete(`${baseURL}/${id}`);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    console.log('API call to:', `${baseURL}`);
    const res = await axios.post(`${baseURL}`, payload);
    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    console.log('API call to:', `${baseURL}/${payload._id}`);
    const res = await axios.put(`${baseURL}/${payload._id}`, payload);
    return res.data;
  }),
};
