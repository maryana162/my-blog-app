import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
    switch(action.type){
        case 'getblogposts':
            return action.payload;
        case 'deletepost':
            return state.filter((blogPost) => {blogPost.id !== action.payload});
        case 'editpost':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            });
        default:
            return state
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')
        dispatch({ type: 'getblogposts', payload: response.data})
    }
}

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content })

        const response = await jsonServer.get('/blogposts')
        dispatch({ type: 'getblogposts', payload: response.data})
        
        if(callback){
            callback()
        }
    }
}

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content })
        dispatch({
            type: 'editpost', payload: { id, title, content }
        })
        if(callback){
            callback()
        }
    } 
}

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)
        
        dispatch({ type: 'deletepost', payload: id})
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, editBlogPost, deleteBlogPost, getBlogPosts }, [])