import api from './API';

export const createProduct = body => 
    api.post('/api/app/product', body).then(({ data }) => data);

export const getAllProducts = () => 
    api.get('/api/app/product').then(({ data }) => data.items);

export const getProducts = (params = { maxResultCount: 10, skipCount: 0}) =>
    api.get('/api/app/product', { params }).then(({ data }) => data);

export const getProductById = id =>
    api.get(`/api/app/product/${id}`).then(({ data }) => data);

export const updateProduct = (body, id) =>
    api.put(`/api/app/product/${id}`, body).then(({ data }) => data);

export const removeProduct = id => 
    api.delete(`/api/app/product/${id}`);

export const getProductGroups = () =>
    api.get('api/app/product/product-group-lookup').then(({ data }) => data);

export const getImage = id =>
    api.get(`api/app/product/${id}/image-content`).then(({ data }) => data);