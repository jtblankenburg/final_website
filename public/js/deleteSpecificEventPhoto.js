import axios from 'axios';
import { showAlert } from './alerts';

export const deleteSpecificEventPhoto = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:3000/api/v1/specificEventPhoto/${id}`
            
        });
        if(res.status === 'success') {
            showAlert('success', 'Image deleted successfully');
        }
    } catch(err) {
        showAlert('danger', err.response.message);
    }
};