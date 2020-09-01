import axios from 'axios';
import { showAlert } from './alerts';

export const addSpecificEventPhoto = async (data, id) => {
    try{
        const res = await axios({
            method: 'POST',
            url: `/api/v1/specificEvents/${id}/specificEventPhoto`,
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Image added successfully');
        }
    } catch(err) {
        showAlert('danger', err.response.data.message);
    }

};