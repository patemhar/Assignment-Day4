import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import ApiClient from '../services/apiClient';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/cartSlice';

export async function productDetailsLoader({ params }: any) {
  const api = new ApiClient("https://dummyjson.com");
  const id = params.id;
  const response = await api.get<any>(`/products/${id}`)
  if(!response) {
      throw new Response("Product not found", { status: response.status });
  }
  return response;
}

const Product = () => {

  const dispatch = useDispatch();

  const product = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="relative max-w-3xl mx-auto p-6">

      <div className="flex gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-48 h-48 object-cover rounded-lg border"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.brand}</p>
          <p className="mt-2 text-lg font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Stock: {product.stock} ({product.availabilityStatus})
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <ul className="mt-2 space-y-2">
          {product.reviews.map((review: any, index: any) => (
            <li key={index} className="border p-2 rounded">
              <p className="font-semibold">
                {review.reviewerName} - ⭐ {review.rating}
              </p>
              <p className="text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Warranty: {product.warrantyInformation}</p>
        <p>Shipping: {product.shippingInformation}</p>
        <p>Return Policy: {product.returnPolicy}</p>
      </div>

      <div className='flex gap-2 mt-4'>
          <button
              onClick={() => dispatch(addProduct({...product}))} 
              className='p-2 rounded-lg border shadow-md transition-400 hover:shadow-lg'
          >
              Add to Cart
          </button>

          <button
            className='p-2 rounded-lg border shadow-md transition-400 hover:shadow-lg'
            onClick={() => navigate("customize")}
          >
            Customise
          </button>
      </div>

      <div className="fixed top-4/12 left-2/12 md:left-5/12">
        <Outlet context={{ product }} />
      </div>

    </div>
  )
}

export default Product