import api from './API';

export const createTrip = body => 
    api.post('/api/app/trip', body).then(({ data }) => data);

export const getAllTrips = () => 
    api.get('/api/app/trip').then(({ data }) => data.items);

export const getTrips = (params = { maxResultCount: 10, skipCount: 0}) =>
    api.get('/api/app/trip', { params }).then(({ data }) => data);

export const getTripById = id =>
    api.get(`/api/app/trip/${id}`).then(({ data }) => data);

export const updateTrip = (body, id) =>
    api.put(`/api/app/trip/${id}`, body).then(({ data }) => data);

export const removeTrip = id => 
    api.delete(`/api/app/trip/${id}`);

export const getTripNo = () =>
    api.get('/api/app/trip/trip-no').then(({ data }) => data);

export const getDrivers = () =>
    api.get('/api/app/trip/driver-lookup').then(({ data }) => data);

export const getVehicles = () =>
    api.get('/api/app/trip/vehicle-lookup').then(({ data }) => data);