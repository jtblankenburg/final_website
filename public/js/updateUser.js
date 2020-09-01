import axios from 'axios';
import {showAlert} from './alerts';

export const updateData = async (data, type) => {
    try{
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if(res.data.status === 'success'){
            showAlert('success', `${type.toUpperCase()} updated successfully`);
        }
    } catch(err){
        showAlert('danger', err.response.data.message);
    }
};

export const deleteMe = async () => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: '/api/v1/users/deleteMe'
        });
        if(res.status==204) {
            showAlert('success', 'Account has been deleted successfully');
        }
    } catch(err) {
        showAlert('danger', 'Error Deleting Account');
    }
};
