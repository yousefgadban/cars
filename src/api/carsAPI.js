import axios from 'axios'
const api = axios.create({
    baseURL: "https://6177eef89c328300175f5c4a.mockapi.io/api/v1/cars"
})

export const GetAllCars = async ()=>{
    return await api.get("/")
}

export const UpdateCurrentUser = async (id, params)=>{
    return await api.put(`/${id}`, params)
}

export const DeleteCar = async (id)=>{
    return await api.delete(`/${id}`)
}

export const AddNewCar = async (params)=>{
    return await api.post(`/`, params)
}


