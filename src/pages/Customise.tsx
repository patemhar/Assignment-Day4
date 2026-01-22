import { useDispatch } from "react-redux" 
import { addCustomdata } from '../store/cartSlice';
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

type OutletContextType = {
  product: any;
}

const Customise = () => {

  const [customization, setCustomization] = useState<string>("");
  const { product } = useOutletContext<OutletContextType>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = product.id;

  return (
    <dialog open className="p-6 border rounded-lg shadow-lg">
      <h2 className="font-semibold">Customise {product.title}</h2>
      <div className="mt-2">
        <input 
          type="text"
          placeholder="Enter customization"
          required
          className="border p-2 rounded"
          value={customization}
          onChange={(e) => setCustomization(e.target.value)}
        />
        <div className="mt-3 flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => dispatch(addCustomdata({id , data: customization}))}
          >
            Add
          </button>
          <button
            type="button" onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          > 
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default Customise