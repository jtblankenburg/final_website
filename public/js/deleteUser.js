import axios from 'axios';
import { showAlert } from './alerts';

export const deleteUser = async (id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/users/${id}`
        });
        if(res.status == 204) {
            showAlert('success', 'User deleted successfully');
            window.setTimeout(()=> {
                location.assign('/manageUsers');
            }, 500);
        }

    } catch(err) {
        showAlert('danger', 'Error deleting user');
    }
};

