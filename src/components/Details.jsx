import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading';
import { toast } from 'react-toastify';


const Details = () => {

  const navigate = useNavigate();
  const [products,setProducts] = useContext(ProductContext);
  const [product,setProduct] = useState(null)
  const {id} = useParams();

  useEffect(() => {
    if(!product)
    setProduct(products.filter(p => p.id == id)[0]);
  }, [])

  const productDeleteHandler = (id)=>{
    const filterProducts = products.filter(product => product.id !== id);
    setProducts(filterProducts)
    // console.log(products);
    localStorage.setItem('products', JSON.stringify(filterProducts));
    navigate("/");
    toast.error("Product Deleted")
  }

  // console.log(product);

  return product ? (
    <div className='bg-zinc-300 h-screen w-screen flex justify-between items-center'>

        <div className='bg-white w-[70%] flex h-[80%] justify-between items-center p-[6%] m-auto border rounded-lg shadow-xl'>

            <img className='object-contain h-[80%] w-[40%]'
            src={`${product.image}`} alt="" />

            <div className='w-[50%]'>
                <h1 className=' text-4xl font-semibold title'>{product.title}</h1>

                <h2 className='category text-gray-500 text-lg font-semibold opacity-80 my-4 uppercase'>{product.category}</h2>
                <h2 className='price text-red-400 mb-4 text-xl '>$ {product.price}</h2>

                <p className='description text-black text-md mb-4'>{product.description}</p>

                <Link to={`/edit/${product.id}`} className='py-1 px-5 border rounded border-blue-200 text-blue-500 bg-white mr-3'>Edit</Link>
                <button onClick={()=>productDeleteHandler(product.id)} className='py-1 px-5 border rounded border-red-200 text-red-500 bg-white'>
                  Delete
                </button>

            </div>

        </div>

    </div>
    
  ) : <Loading/>
}

export default Details