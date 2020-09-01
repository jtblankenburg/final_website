import axios from 'axios';
import { showAlert } from './alerts';

export const deleteEvent = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/events/${id}`
        });
        if(res.status === 'success')
        {
            showAlert('success', 'Event deleted successfully');
        }
    } catch(err) {
        showAlert('danger', 'Error deleting event please try again later');
    }
};