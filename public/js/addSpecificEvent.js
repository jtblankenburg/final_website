import axios from 'axios'
import { showAlert } from './alerts'

export const addSpecificEvent = async (data, id) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/events/${id}/specificEvent`,
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'specific event added successfully');
        }
    } catch(err) {
        showAlert('danger', err.response.data.message);
    }
};