import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import leadReducer from '../slices/leadSlice'
import tagReducer from '../slices/tagSlice'
import commentReducer from '../slices/commentSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        leads: leadReducer,
        tags: tagReducer,
        comments: commentReducer
    }
})

export default store