import axios from 'axios';

import { API_URL } from '../../const';

export const createTask = async task => axios.post(`${API_URL}/tasks`, task);

export const deleteTask = id => axios.delete(`${API_URL}/tasks/${id}`);

export const getTask = async id => {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
}

export const getTasks = async name => {
    const url = '/tasks';
    if (name) {
        const regex = new RegExp(name, "i");
        url.concat(`?filter[where][name][regexp]=${regex}`);
    }

    const response = await axios.get(`${API_URL}/${url}`);
    return response.data;
}

export const updateTask = (id, task) => axios.patch(`${API_URL}/tasks/${id}`, task);
