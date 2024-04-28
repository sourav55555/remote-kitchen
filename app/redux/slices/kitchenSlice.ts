import { createSlice } from "@reduxjs/toolkit";

interface FoodItem {
    id: number;
    name: string;
    image: string;
    short_details: string;
    price: number;
    delivery_charge: number;
}

interface KitchenState {
    foodList: FoodItem[];
    limit: number;
    refresh: boolean;
    sort: string;
}

const initialState: KitchenState = {
    foodList: [],
    limit: 6,
    refresh: false,
    sort: ''
}

const kitchenSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        setSort: (state, action)=>{
            state.sort = action.payload;
        },
        setLimit: (state, action)=>{
            state.limit = action.payload;
        },
        setFoodList: (state, action) => {
            state.foodList = action.payload;
        },
        setRefresh: (state, action) =>{
            state.refresh = action.payload;
        }
    }
}) ;

export const {setSort, setLimit, setFoodList, setRefresh} = kitchenSlice.actions;

export default kitchenSlice.reducer;
