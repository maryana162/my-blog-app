import createDataContext from './createDataContext'
import { call } from 'react-native-reanimated'

const blogReducer = (state, action) => {
    switch(action.type){
        case 'addpost':
           return [...state, { 
               id: Math.floor(Math.random()*9999), title: action.payload.title, content = action.payload.content
            }]
        case 'deletepost':
            return state.filter((blogPost) => {blogPost.id !== action.payload})
        case 'editpost':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            })

        default:
            return state
    }
}

const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({ type: 'addpost', payload: {title, content}});
        callback();
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({
            type: 'editpost', payload: { id, title, content }
        })
        if(callback){
            callback()
        }
    } 
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'deletepost', payload: id})
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, editBlogPost, deleteBlogPost }, [])