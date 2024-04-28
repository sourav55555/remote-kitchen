import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Button, CardActionArea, CardActions, CardHeader, IconButton } from '@mui/material';
import ModalDialog from './ModalDialog';
import EditItemForm from './EditItemForm';
import DeleteConfirmationPopover from './DeletePopover';


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
    deleteItem: (id: number) => void;
    setRefresh: any;
}

const CardComponent: React.FC<Props> = ({ foodData, deleteItem }) => {

    const { id, name, image, short_details, price, delivery_charge } = foodData;

    const onDelete = ()=>{
        deleteItem(id);
    }

    return (
        <Card className='transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] border-[var(--primary-color)] text-[var(--secondary-color)] card-radius mx-auto xl:w-[350px] lg:w-[300px] sm:w-[330px] w-[300px]'>
            <div className='custom-bg p-4 text-xl font-semibold flex justify-between items-center'>
                <p>{name}</p>
                <EditItemForm foodData={foodData} />
            </div>

            <CardActionArea>
                <CardMedia
                    component="img"
                    style={{ height: "200px" }}
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <p className='text-gray-500 text-lg font-semibold'>Price: {price} $</p>
                    <p className='text-sm text-gray-500 font-semibold mt-2'> Delivery Charge: {delivery_charge} $</p>
                    <Button variant='contained' className='custom-bg text-[var(--secondary-color)] mt-4 ' style={{ textTransform: 'none' }} startIcon={<ShoppingBagIcon />}>Place Order</Button>

                </CardContent>
            </CardActionArea>

            <CardActions className='flex justify-center gap-2 items-center pb-4'>
                <ModalDialog name={name} short_details={short_details} />
                <DeleteConfirmationPopover onDelete={onDelete}/>
            </CardActions>
        </Card>
    )
}

export default CardComponent;