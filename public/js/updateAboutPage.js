import axios from 'axios';
import { showAlert } from './alerts';

export const updateAboutPage = async(data) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/aboutPage/5f1fa7e5dc287975909c9033',
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'About Page updated successfully');

        }
    } catch(err) {
            showAlert('danger', err.response.data.message);
    }
};