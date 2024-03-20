import api from './API';

export const getAllVehicles = () => 
    api.get('/api/app/vehicle').then(({ data }) => data.items);

export const getVehicles = (params = { maxResultCount: 10, skipCount: 0}) =>
    api.get('/api/app/vehicle', { params }).then(({ data }) => data);

export const getVehicleById = id =>
    api.get(`/api/app/vehicle/${id}`).then(({ data }) => data);

export const createVehicle = body => 
    api.post('/api/app/vehicle', body).then(({ data }) => data);

export const updateVehicle = (body, id) =>
    api.put(`/api/app/vehicle/${id}`, body).then(({ data }) => data);

export const removeVehicle = id => 
    api.delete(`/api/app/vehicle/${id}`);

export const getImage = id =>
    api.get(`api/app/vehicle/${id}/image-content`).then(({ data }) => data);