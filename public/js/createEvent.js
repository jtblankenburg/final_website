import axios from 'axios';
import { showAlert } from './alerts';

export const createEvent = async(data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/events',
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Event created successfully');
        };

    } catch(err) {
        showAlert('danger', err.response.data.message);
    }
};