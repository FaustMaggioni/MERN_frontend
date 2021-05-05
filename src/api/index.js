import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'})

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
