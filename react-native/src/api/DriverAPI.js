import api from './API';

export const createDriver = body => 
    api.post('/api/app/driver', body).then(({ data }) => data);

export const getAllDrivers = () => 
    api.get('/api/app/driver').then(({ data }) => data.items);

export const getDrivers = (params = { maxResultCount: 10, skipCount: 0}) =>
    api.get('/api/app/driver', { params }).then(({ data }) => data);

export const getDriverById = id =>
    api.get(`/api/app/driver/${id}`).then(({ data }) => data);

export const updateDriver = (body, id) =>
    api.put(`/api/app/driver/${id}`, body).then(({ data }) => data);

export const removeDriver = id => 
    api.delete(`/api/app/driver/${id}`);

export const getDriverNo = () =>
    api.get('api/app/driver/driver-no').then(({ data }) => data);

export const getImage = id =>
    api.get(`api/app/driver/${id}/image-content`).then(({ data }) => data);