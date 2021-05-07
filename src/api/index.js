import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'})

//esta func va a pasar para cada request
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => { return API.get('/posts') }
export const createPost = (newPost) => {
    return API.post('/posts', newPost)
}
export const updatePost = (id, updatedPost) => API.patch(`posts/${id}`, updatedPost)
export const deletePost = async (id) => {
    try {
        await API.delete(`posts/${id}`)
    } catch (error) {
        console.log(error)
    }
}
export const likePost = (id) => API.patch(`posts/${id}/likePost`)
export const signIn = (formData) => API.post('/users/signin',formData)
export const signUp = (formData) => API.post('/users/signup',formData)