import api from './API';

export const createProductGroup = body => 
    api.post('/api/app/product-group', body).then(({ data }) => data);

export const getAllProductGroups = () => 
    api.get('/api/app/product-group').then(({ data }) => data.items);

export const getProductGroups = (params = { maxResultCount: 10, skipCount: 0}) =>
    api.get('/api/app/product-group', { params }).then(({ data }) => data);

export const getProductGroupById = id =>
    api.get(`/api/app/product-group/${id}`).then(({ data }) => data);

export const updateProductGroup = (body, id) =>
    api.put(`/api/app/product-group/${id}`, body).then(({ data }) => data);

export const removeProductGroup = id => 
    api.delete(`/api/app/product-group/${id}`);