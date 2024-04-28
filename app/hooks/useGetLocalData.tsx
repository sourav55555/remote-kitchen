import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface FoodList {
    id: number;
    name: string;
    image: string;
    short_details: string;
    price: number;
    delivery_charge: number;
  }

const useGetLocalData = (refresh: boolean) => {
    
    const [localData, setLocalData] = useState<FoodList[]>([]);

    useEffect(()=>{
        const data = localStorage.getItem('foodList');
        data ? setLocalData(JSON.parse(data)) : [];
    },[refresh])
    return { localData } ;
};

export default useGetLocalData;