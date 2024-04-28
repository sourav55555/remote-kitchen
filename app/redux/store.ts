"use client";
import { configureStore } from "@reduxjs/toolkit";
import kitchenSlice from "./slices/kitchenSlice";

const store = configureStore({
    reducer: {
        foods: kitchenSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;