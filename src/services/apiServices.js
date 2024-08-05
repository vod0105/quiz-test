import axios from '../utils/axiosCustomize';

const PostCreateUser = (email,password,username,role,image) => {
    const data = new FormData();
    data.append('email',email);
    data.append('password',password);
    data.append('username',username);
    data.append('role',role);
    data.append('userImage',image);

    return axios.post('api/v1/participant', data);
}

const PutUpdateUser = (id,username,role,image) => {
    const data = new FormData();
    data.append('id',id);
    data.append('username',username);
    data.append('role',role);
    data.append('userImage',image);

    return axios.put('api/v1/participant', data);
}

const DeleteUser = (idUser) => {
    return axios.delete('api/v1/participant', {data:{id:idUser}});
}


const GetAllUsers = () =>{
    return axios.get("api/v1/participant/all")
}

const GetAllUsersWithPaginate = (page,limit) =>{
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

export {PostCreateUser,GetAllUsers,PutUpdateUser,DeleteUser,GetAllUsersWithPaginate}