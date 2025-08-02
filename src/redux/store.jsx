import { userReducer } from "./user/reducer";
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore(
    {
        reducer:{
            //acts as combineReducer
            userDetails:userReducer,

            // canFurther addlike
            //posts: postReducer
        }
    }
);

