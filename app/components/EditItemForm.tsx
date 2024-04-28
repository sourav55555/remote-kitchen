import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import useGetLocalData from '../hooks/useGetLocalData';
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

interface Props {
    foodData: FoodList;
}

const EditItemForm: React.FC<Props> = ({ foodData }) => {

    const { id, name, image, short_details, price, delivery_charge } = foodData;

    const dispatch = useDispatch();
    const refresh = useSelector((state: RootState) => state.foods.refresh)

    const { localData } = useGetLocalData(refresh);

    const [open, setOpen] = React.useState<boolean>(false);

    // edit data function 
    const handleSetData = (formJson: { [k: string]: any }) => {
        const updatedData = localData.map(item => {
            if (item.id === id) {
                return { ...item, ...formJson };
            }
            return item;
        });
        localStorage.setItem('foodList', JSON.stringify(updatedData));
        dispatch(setRefresh(!refresh));
        toast.success('Item edited successfully!')
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <IconButton onClick={handleClickOpen} className='bg-black bg-opacity-20 text-green-800' aria-label="Edit item details" title='Edit item details'>
                <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
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
                        const formJson = Object.fromEntries((formData as any).entries());
                        handleSetData(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle className='text-center'>Edit item details</DialogTitle>
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
                        defaultValue={name}
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
                        defaultValue={price}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="delivery-charge"
                        name="delivery-charge"
                        label="Delivery charge"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={delivery_charge}
                    />
                    <TextField
                        label="Recipe Details"
                        id="recipe-details"
                        name="recipe-details"
                        multiline
                        rows={4}
                        variant="standard"
                        fullWidth
                        margin="dense"
                        defaultValue={short_details}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        type="url"
                        name='imageUrl'
                        id='imageUrl'
                        label="Edit image url"
                        fullWidth
                        variant="standard"
                        defaultValue={image}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className='text-red-600 mb-3' onClick={handleClose}>Cancel</Button>
                    <Button className='mb-3 mr-3' variant='contained' type="submit">Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditItemForm;