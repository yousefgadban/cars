import axios from 'axios'
const api = axios.create({
    baseURL: "https://6177eef89c328300175f5c4a.mockapi.io/api/v1/clients"
})

export const GetAllUsers = async ()=>{
    return await api.get("/")
}

export const GetUserData = async (id)=>{
    return await api.get("/"+id);
}

export const GetMemberData = async (id)=>{
    return await api.get(`/${id}/members/${id}`);
}

export const GetAllMembers = async (id)=>{
    return await api.get(`/${id}/actions`)
}

export const UpdateEmployeeCar=async(id, params)=>{
    return await api.put(`/${id}/members/${id}`, params)
}

export const RemoveCarFromUser=async(id, params)=>{
    return await api.put(`/${id}/members/${id}`, params)
}

export const AddWithDrawal=async(params)=>{
    return await api.post(`/${params.customerId}/actions`, params)
}

export const TransferCash=async(params)=>{
    return await api.post(`/${params.customerId}/actions`, params)
}

export const AddNewUser=async(params)=>{
    return await api.post(`/`, params)
}



export const DeleteUser = async (id)=>{
    return await api.delete("/"+id)
}


