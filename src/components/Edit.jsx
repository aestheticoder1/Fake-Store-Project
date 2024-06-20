import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const Edit = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useContext(ProductContext);
    const {id} = useParams();
    const [product, setProduct] = useState({
        title:"",
        image:"",
        category:"",
        price:"",
        description:""
    });

    const changeHandler = (e) => {
        setProduct({...product, [e.target.name]: e.target.value });
        // console.log(e.target.name,e.target.value);
    }
    

    useEffect(()=>{
     
        setProduct(products.filter(p=> p.id == id)[0]);

    },[id])


    const addProductHandler = (e) => {
        e.preventDefault();

        if (product.price.length < 1 || product.category.length < 5 || product.description.trim().length < 5 || product.title.length < 5 || product.image.length < 5) {
            alert("Each and Every field must have valid number of characters");
            return;
        }

        // console.log(product)
        const p_idx = products.findIndex((p)=> p.id == id);

        const copyData = [...products];
        copyData[p_idx] = {...products[p_idx],...product};


        // const newProduct = { id: nanoid(), title, image, category, price, description };
        setProducts(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        navigate(-1);
        toast.success("Details Updated Successfully");
    }

    return (
        <div className='h-screen w-screen flex'>
            <Navbar />

            <form onSubmit={addProductHandler} className='w-full h-full px-[5%] py-[1%] flex flex-col items-center' action="">
                <h1 className='text-4xl my-8 font-semibold'>Edit Product Details</h1>
                <input onChange={changeHandler} name='title' value={product && product.title} className=' text-2xl bg-zinc-100 p-3 rounded-md w-1/2 mb-4' type="text" placeholder='Title' />
                <input onChange={changeHandler} name='image' value={product && product.image} className=' text-2xl bg-zinc-100 p-3 rounded-md w-1/2 mb-4' type='url' placeholder='Image Link' />
                <div className='flex justify-between w-1/2'>
                    <input onChange={changeHandler} name='category' value={product && product.category} className=' text-2xl bg-zinc-100 p-3 rounded-md w-[48%] mb-4' type='text' placeholder='Category' />
                    <input onChange={changeHandler} name='price' value={product && product.price} className=' text-2xl bg-zinc-100 p-3 rounded-md w-[48%] mb-4' type='number' placeholder='Price' />
                </div>
                <textarea onChange={changeHandler} name='description' value={product && product.description} id="" rows={8} cols={30} className=' text-2xl bg-zinc-100 p-3 rounded-md w-1/2 mb-4' placeholder='Product Description'></textarea>

                <button className='py-2 px-5 text-2xl border rounded border-blue-500 text-blue-500  font-semibold bg-white hover:bg-blue-500 hover:text-white'>
                    Edit Product
                </button>
            </form>
        </div>
    )
}

export default Edit