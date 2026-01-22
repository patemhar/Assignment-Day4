import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center w-full h-130'>
      <h1>Not Found!</h1>
      <button onClick={() => navigate("/shop/products")} className="border-b ml-2">Go back To Products Page</button>
    </div>
  )
}

export default NotFound