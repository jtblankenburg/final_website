import axios from 'axios';
import { showAlert } from './alerts';

export const updateHomePage = async(data) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/homePage/5f1b8ff10e5d152cc838bde5',
            data
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Home page updated successfully');
            window.setTimeout(()=> {
                location.assign('/editHomePage');
            }, 500);
        };

    } catch(err) {
        showAlert('danger', err.response.data.message);
    }
};