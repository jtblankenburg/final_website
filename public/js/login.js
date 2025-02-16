import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email,password)=> {
    console.log(email,password);
    try 
    {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        //console.log(res);

        if(res.data.status === 'success')
        {
            showAlert('success','Logged in successfully!');
            window.setTimeout(()=> {
                location.assign('/');
            }, 1500);
        }

    } catch(err)
    {
        showAlert('danger',err.response.data.message);
        //console.log(err.response.data);
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',

        });
        if(res.data.status === 'success'){
            window.setTimeout(()=> {
                location.assign('/');
            }, 2000);
        }
    } catch(err) {
        showAlert('danger', 'Error logging out try again');
    }
};