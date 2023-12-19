import axios from "./axios";

export const registerRequest = (user, role) => axios.post("/register", { ...user, role });

export const loginRequest = user => axios.post(`/login`, user)

export const verityTokenRequest = () => axios.get('/verify')

