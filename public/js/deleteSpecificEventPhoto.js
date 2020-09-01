import axios from 'axios';
import { showAlert } from './alerts';

export const deleteSpecificEventPhoto = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/specificEventPhoto/${id}`
            
        });
        if(res.status === 'success') {
            showAlert('success', 'Image deleted successfully');
        }
    } catch(err) {
        showAlert('danger', err.response.message);
    }
};