import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
})

export const login = async (data: { email: string, password: string }) => api.post("/api/users/login", data)

export const register = async (data: { name: string, email: string, password: string }) => api.post("/api/users/register", data)

export const getNotes = async () => api.get("/api/notes");

export const createNote = async (data: any) => api.post("/api/notes");