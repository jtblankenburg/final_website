import axios from 'axios';
import { showAlert } from './alerts';

export const deleteSpecificEvent = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/specificEvents/${id}`
        });
        if(res.status === 'success') {
            showAlert('success', 'Specific Event deleted successfully');
        }
    } catch(err) {
        showAlert('danger', 'Error deleting specific event try again later');
    }
};