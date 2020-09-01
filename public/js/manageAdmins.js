import axios from 'axios';
import {showAlert} from './alerts';

export const manageAdmin = async (id, data, message, type) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:3000/api/v1/users/${id}`,
            data
        });

        if(res.data.status === 'success')
        {
            showAlert(`${type}`, message);
            window.setTimeout(()=> {
                location.assign('/adminpage');
            }, 3000);
        }
    } catch(err) {
        showAlert('danger', 'Error with request users');
    }
};