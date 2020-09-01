import axios from 'axios';
import { showAlert } from './alerts';

export const updateRushPage = async(data) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/rushPage/5f3ad64c63f39c525cdaf58a',
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Rush Page updated successfully');
            window.setTimeout(()=> {
                location.assign('/editRushPage');
            }, 500);
        }
    } catch(err) {
        showAlert('danger', err.response.data.message);
    }
};