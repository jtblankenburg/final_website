import axios from 'axios';
import { showAlert } from './alerts';

export const updateRushPhoto = async(data, id) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/rushPhoto/${id}`,
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Photo updated successfully');
        }
    } catch(err) {
        showAlert('danger', err.response.data.message);
    }
};