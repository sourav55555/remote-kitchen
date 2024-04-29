import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useGetLocalData from '../hooks/useGetLocalData';
import { fromJSON } from 'postcss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setRefresh } from '../redux/slices/kitchenSlice';
import toast from 'react-hot-toast';

interface FoodList {
    id: number;
    name: string;
    image: string;
    short_details: string;
    price: number;
    delivery_charge: number;
}

export default function AddItemForm() {

    const dispatch = useDispatch();
    const refresh = useSelector((state: RootState) => state.foods.refresh);

    // get local storage data 
    const { localData } = useGetLocalData(refresh);


    // add item function
    const handleAddData = (formJson: FoodList) => {
        formJson.id = localData.length + 1;
        console.log(formJson, "add data");
        localData.push(formJson)
        localStorage.setItem('foodList', JSON.stringify(localData));
        dispatch(setRefresh(!refresh));
        toast.success('Item added successfully!')
    }
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant='contained'
                className='custom-bg text-[var(--secondary-color)]'
                startIcon={<AddCircleOutlineIcon />}
                style={{ textTransform: 'none' }}
                onClick={handleClickOpen}
            >
                Add an item
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson: FoodList = {
                            id: 0, 
                            name: formData.get('name') as string,
                            image: formData.get('image') as string,
                            short_details: formData.get('short_details') as string,
                            price: parseFloat(formData.get('price') as string), 
                            delivery_charge: parseFloat(formData.get('delivery_charge') as string)
                        };
                        handleAddData(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle className='text-center'>Add your recipe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Recipe Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="price"
                        name="price"
                        label="Recipe Price"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="delivery-charge"
                        name="delivery_charge"
                        label="Delivery charge"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        label="Recipe Details"
                        id="recipe-details"
                        name="short_details"
                        multiline
                        rows={4}
                        variant="standard"
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        type="url"
                        fullWidth
                        variant="standard"
                        label="Recipe Image Url"
                        id="image"
                        name="image"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className='text-red-600 mb-3'
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='mb-3 mr-3'
                        variant='contained'
                        type="submit"
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}