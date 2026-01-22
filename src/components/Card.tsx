import type { productInt } from '../constants/products'
import clsx from 'clsx';
import { addProduct } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function renderStockMessage(stock:number) {
  if (stock < 1) return <p className='text-sm text-red-500'>Out Of Stock</p>;
  if (stock < 10) return <p className='text-sm text-yellow-500'>Low Stock</p>;
  return <p className='text-sm'>In Stock</p>;
}

export default function Card({ id, images, title, description, price, stock, category }: productInt) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
    <div className='max-w-md h-130 bg-white border rounded-lg mex-h-100 border-gray-200 shadow hover:shadow-lg transition-shadow duration-300'>
        <div className='flex justify-center mt-6'>   
            {images && (
                <img
                    className='rounded-lg h-45 object-cover'
                    src={images[0]}
                    alt={title}
                />
            )}
        </div>
        <div className='p-4 h-79 relative flex flex-col flex-1'>
            <h2 className='text-xl font-bold mb-2 line-clamp-1 text-cyan-900 dark:text-cyan-500 cursor-pointer' onClick={() => {navigate(`/shop/product/${id}`)}}>
                {title}
            </h2>
            <p className='text-gray-600 mb-2 text-sm line-clamp-3'>
                {description ? description : "No Data Available"}
            </p>
            <p className='text-gray-600 mb-2 text-sm'>
                {category}
            </p>
            <p className="font-semibold mb-1">
                ₹{price}
            </p>
            {price > 100 && (
                <p className={clsx('text-amber-400 text-sm border-amber-400 p-1 border w-fit rounded-2xl', stock < 0 ? "disabled" : "")}>Premium</p>
            )}
            
            <p className='text-sm my-1'>Stock: {stock}</p>
            {renderStockMessage(stock)}
                <div className="flex absolute left-4 bottom-4 gap-2 mt-2">
                    <button
                        onClick={() => dispatch(addProduct({id, images, title, description, price, stock, category}))} 
                        className='p-2 rounded-lg border shadow-md transition-400 hover:shadow-lg'
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
