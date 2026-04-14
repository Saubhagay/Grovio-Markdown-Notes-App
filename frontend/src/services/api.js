import axios from 'axios';

const rawApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/notes';
const API_URL = rawApiUrl.endsWith('/notes') ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, '')}/notes`;

export const getNotes = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createNote = async (note) => {
    const res = await axios.post(API_URL, note);
    return res.data;
};

export const updateNote = async (id, note) => {
    const res = await axios.put(`${API_URL}/${id}`, note);
    return res.data;
};

export const deleteNote = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};