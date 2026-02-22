import { configureStore } from '@reduxjs/toolkit'
import { MessageSlice } from './MessageSlice'
const store = configureStore({
  reducer: MessageSlice.reducer,
})
export default store
