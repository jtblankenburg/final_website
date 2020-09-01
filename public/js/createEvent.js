import axios from 'axios';
import { showAlert } from './alerts';

export const createEvent = async(data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/events',
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Event created successfully');
        };

    } catch(err) {
        showAlert('danger', err.response.data.message);
    }
};