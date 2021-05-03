import axios from 'axios'

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => { return axios.get(url) }
export const createPost = (newPost) => {
    return axios.post(url, newPost)
}
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = async (id) => {
    try {
        await axios.delete(`${url}/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)