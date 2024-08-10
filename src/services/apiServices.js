import axios from '../utils/axiosCustomize';

const PostSignIn = (email,password) =>{
    console.log(email,password)
    return axios.post(`api/v1/login`, {email: email,password: password});
}

const PostSignUp = (username,email,password) =>{
    return axios.post(`api/v1/register`, {username:username,email: email,password: password});
}

const logout = (email,refresh_token) => {
    return axios.post(`api/v1/logout`,{email,refresh_token});
}

const PostCreateUser = (email,password,username,role,image) => {
    const data = new FormData();
    data.append('email',email);
    data.append('password',password);
    data.append('username',username);
    data.append('role',role);
    data.append('userImage',image);
    console.log("image api: ",image)
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

const getQuizByUser = () => {
    axios.get("api/v1/quiz-by-participant");
}

const PostUpdateProfile = (username,image) => {
    const data = new FormData();
    data.append('username',username);
    data.append('userImage',image);

    return axios.post('api/v1/profile', data);
}

export {PostCreateUser,GetAllUsers,PutUpdateUser,DeleteUser,GetAllUsersWithPaginate,PostSignIn,PostSignUp,getQuizByUser,logout,PostUpdateProfile}