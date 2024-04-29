"use client"
import Image from 'next/image'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, CircularProgress, Divider, Popover, Stack, Typography } from '@mui/material';
import CardComponent from './components/CardComponent';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddItemForm from './components/AddItemForm';
import useGetLocalData from './hooks/useGetLocalData';
import LeftNavbar from './components/LeftNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setFoodList, setLimit, setRefresh, setSort } from './redux/slices/kitchenSlice';
import toast, { Toaster } from 'react-hot-toast';


interface FoodList {
  id: number;
  name: string;
  image: string;
  short_details: string;
  price: number;
  delivery_charge: number;
}

export default function Home() {

  const dispatch = useDispatch();
  const foodList = useSelector((state: RootState) => state.foods.foodList);
  const limit = useSelector((state: RootState) => state.foods.limit);
  const sort = useSelector((state: RootState) => state.foods.sort);
  const refresh = useSelector((state: RootState) => state.foods.refresh);

  const { localData } = useGetLocalData(refresh);

  // delete function 
  const deleteItem = (id: number) => {
    const updatedData = foodList.filter((item: FoodList) => item.id !== id);
    setDataOnLocal(updatedData);
    dispatch(setRefresh(!refresh));
    toast.success('Deleted Successfully!')
  }

  // fetch data 
  useEffect(() => {
    fetch('foodlist.json')
      .then(res => res.json())
      .then(data => setDataOnLocal(data))
  }, []);

  const setDataOnLocal = (data: FoodList[]) => {
    localStorage.setItem('foodList', JSON.stringify(data))
  }

  useEffect(() => {
    dispatch(setFoodList(localData));
    if(limit > 6){
      dispatch(setLimit(foodList.length + 1));
    }
  }, [refresh, localData, dispatch])

  //  sort functions 
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSort(event.target.value));
  };

  const lth = () => {
    let sortFoodList = [...foodList].sort((a, b) => a.price - b.price);
    dispatch(setFoodList(sortFoodList));
  }
  const htl = () => {
    let sortFoodList = [...foodList].sort((a, b) => b.price - a.price);
    dispatch(setFoodList(sortFoodList));
  }

  console.log(foodList, "list food");

  return (
    <div className='text-[var(--secondary-color)] body-bg'>
      <div>
        <nav className='py-8 px-0 md:px-12'>
          <div className='flex justify-between items-center bg-[var(--primary-color)] p-4 rounded-full '>
            <div>
              <LeftNavbar />
            </div>
            <div className='text-center'>
              <Image className='mx-auto' src="/assets/chef.png" alt='icon' width={"50"} height={"50"} />
              <p className='lugrasimo-regular text-xl font-semibold'>Remote Kitchen</p>
            </div>
            <div className='flex items-center justify-center'>
              <ShoppingCartCheckoutOutlinedIcon className='w-8 h-8 mr-6 cursor-pointer md:block hidden' />
              <AccountCircleIcon className='w-8 h-8 mr-6 cursor-pointer md:block hidden' />
            </div>
          </div>
        </nav>
      </div>

      <div className='md:mt-24 mt-12 md:mx-14 mx-4'>
        <div className='flex justify-between md:items-center items-start mb-3 md:flex-row flex-col gap-4 '>
          <div className='flex md:items-center items-start gap-3 md:flex-row flex-col'>
            <div className='flex items-center gap-3'>
              <Image
                className="rounded-full"
                src="/assets/food-delivery.gif"
                alt="food menu"
                height="50"
                width="50"
              />
              <p className='text-2xl font-semibold mr-7'>Foods Menu</p>
            </div>

            <div className='flex items-center justify-between'>
              <FormControl
                variant="filled"
                sx={{
                  m: 1,
                  minWidth: 100,
                  maxWidth: 160,
                  height: 40,
                  '& .MuiInputLabel-root': {
                    color: '#444444',
                  },
                  '& .MuiFilledInput-root': {
                    '&:before': {
                      borderBottomColor: '#77DD61',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'green',
                    },
                    '&:after': {
                      borderBottomColor: '#77DD61',
                    },
                    '&:focus-within': {
                      '&:after': {
                        borderBottomColor: '#77DD61',
                      },
                    },
                  },
                }}
                className='border border-[var(--primary-color)]'
              >
                <InputLabel id="demo-simple-select-autowidth-label">
                  <FilterListIcon className='w-5 h-5' /> Sort
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={sort}
                  onChange={handleChange}
                  autoWidth
                  label="Sort"
                  className='h-12'
                >
                  <MenuItem onClick={lth} value={'lth'}>Prize lower to higher</MenuItem>
                  <MenuItem onClick={htl} value={'htl'}>Prize higher to lower</MenuItem>
                </Select>
              </FormControl>

              <div className='md:hidden block'>
                <AddItemForm />
              </div>
            </div>
          </div>

          {/* add item  */}
          <div className='md:block hidden'>
            <AddItemForm />
          </div>
        </div>

        <Divider variant='middle' />

        <div className='mb-32'>

          {/* loader  */}
          {
            foodList.length === 0 ?
              <div className="h-[280px] grid place-content-center">
                <CircularProgress color="success" />
              </div> : ""
          }

          <div className='mt-6 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center max-w-[720px] lg:max-w-[1200px] mx-auto'>
            {
              foodList.slice(0, limit).map(foodData => <CardComponent key={foodData.id} foodData={foodData} deleteItem={deleteItem} />)
            }
          </div>

          <div className='text-center'>
            <Button
              className={`font-semibold bg-green-600 px-8 py-3 text-white card-radius hover:bg-green-400 hover:text-black ${limit > 6 ? "hidden" : "inline-block"}`}
              style={{ textTransform: 'none' }}
              onClick={()=> dispatch(setLimit(foodList.length + 1))}
            >
              Show All
            </Button>
          </div>
        </div>

      </div>

      <footer className='h-[200px] w-full bg-green-400 flex items-center justify-center'>
        <div className='text-center'>
          <Image
            className='mx-auto'
            src="/assets/chef.png"
            alt='icon'
            width={"50"}
            height={"50"}
          />
          <p className='lugrasimo-regular text-xl font-semibold'>Remote Kitchen</p>
        </div>
      </footer>
      <Toaster />
    </div >
  );
}
