import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../store/cartSlice";
import type { cartItems } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartCard({ id, images, title, description, price, stock, category, quantity, customizations} : cartItems) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="grid md:grid-cols-2">
            <div className="flex gap-4 border-2 rounded-2xl p-4">
                <div>
                    <div className="text-xl font-bold mb-2 line-clamp-1 text-cyan-900 dark:text-cyan-500 cursor-pointer" onClick={() => {navigate(`/shop/product/${id}`)}}>{title}</div>
                    <div className="text-gray-600 mb-2 text-sm line-clamp-3">{description}</div>
                    <div className="text-gray-600 mb-2 text-sm line-clamp-2"><span className="font-semibold">Your Customizations: </span>{customizations? customizations : "No Customizations Added."}</div>
                    <div className="font-semibold mb-1">₹{price}</div>
                </div>
                <div className="flex flex-col gap-2">
                    <button onClick={() => dispatch(addProduct({id, images, title, description, price, stock, category}))} className="border px-1.5 rounded-lg flex justify-center items-center">+</button>
                    <div className="flex justify-center">{quantity}</div>
                    <button onClick={() => dispatch(removeProduct(id))} className="border flex justify-center items-center rounded-lg px-2">-</button>
                </div>
            </div>
            
        </div>
    )
}