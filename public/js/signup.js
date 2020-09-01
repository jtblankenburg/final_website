import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Success, account created successfully');
            window.setTimeout(()=> {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        showAlert('danger',  err.response.data.message);
    }
};