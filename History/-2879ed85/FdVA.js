import { configureStore } from '@reduxjs/toolkit';
import reportReducer from './reportSlice';

export default configureStore({
  reducer: {
    report: reportReducer,
  },
});
