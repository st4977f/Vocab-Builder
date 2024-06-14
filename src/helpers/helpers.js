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
const baseURL = process.env.VUE_APP_ROUTER_URL;

const handleError =
  (fn) =>
  async (...params) => {
    try {
      return await fn(...params);
    } catch (error) {
      if (error.response) {
        // Error response from server
        const status = error.response.status;
        const statusText = error.response.statusText;
        const data = error.response.data;
        vm.flash(`${status}: ${statusText}`, "error");
        console.error(`Error: ${status} - ${statusText}`, data);
      } else if (error.request) {
        // Request made but no response received
        vm.flash("No response from server", "error");
        console.error("No response received:", error.request);
      } else {
        // Something else caused the error
        vm.flash("An unexpected error occurred", "error");
        console.error("Unexpected error:", error.message);
      }
      throw error;
    }
  };

export const api = {
  getWord: handleError(async (id) => {
    console.log(`GET request to: ${baseURL}${id}`);
    const res = await axios.get(`${baseURL}${id}`);
    console.log(`Response: `, res.data);
    return res.data;
  }),
  getWords: handleError(async () => {
    console.log(`GET request to: ${baseURL}`);
    const res = await axios.get(baseURL);
    console.log(`Response: `, res.data);
    return res.data;
  }),
  deleteWord: handleError(async (id) => {
    console.log(`DELETE request to: ${baseURL}${id}`);
    const res = await axios.delete(`${baseURL}${id}`);
    console.log(`Response: `, res.data);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    console.log(`POST request to: ${baseURL}`, payload);
    const res = await axios.post(baseURL, payload);
    console.log(`Response: `, res.data);
    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    console.log(`PUT request to: ${baseURL}${payload._id}`, payload);
    const res = await axios.put(`${baseURL}${payload._id}`, payload);
    console.log(`Response: `, res.data);
    return res.data;
  }),
};
