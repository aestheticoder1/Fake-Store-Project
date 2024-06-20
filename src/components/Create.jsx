import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Create = () => {

    const navigate = useNavigate();

    const [products,setProducts] = useContext(ProductContext);

    const [title,setTitle] = useState("");
    const [image,setImage] = useState("");
    const [category,setCategory] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");

    const addProductHandler = (e)=>{
        e.preventDefault();

        if(price.length<1 || category.length<5 || description.length<5 || title.length<5 || image.length<5 ){
            alert("Each and Every field must have valid number of characters");
            return;
        }

        const newProduct = {id:nanoid(),title,image,category,price,description};
        setProducts([...products,newProduct]);
        localStorage.setItem("products",JSON.stringify([...products,newProduct]));
        toast.success("Product Added Successfully");
        navigate("/");
    }


  return (
    <div className='h-screen w-screen flex'>
    <Navbar/>

    <form onSubmit={addProductHandler} className='w-full h-full px-[5%] py-[1%] flex flex-col items-center' action="">
        <h1 className='text-4xl my-8 font-semibold'>Enter Product Details</h1>
        <input onChange={(e)=>setTitle(e.target.value)} value={title} className=' text-2xl bg-zinc-100 p-3 rounded-md w-1/2 mb-4' type="text" placeholder='Title' />
        <input onChange={(e)=>setImage(e.target.value)} value={image} className=' text-2xl bg-zinc-100 p-3 rounded-md w-1/2 mb-4' type='url' placeholder='Image Link' />
        <div className='flex justify-between w-1/2'>
            <input onChange={(e)=>setCategory(e.target.value)} value={category} className=' text-2xl bg-zinc-100 p-3 rounded-md w-[48%] mb-4' type='text' placeholder='Category' />
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className=' text-2xl bg-zinc-100 p-3 rounded-md w-[48%] mb-4' type='number' placeholder='Price' />
        </div>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} name="" id="" rows={8} cols={30} className=' text-2xl bg-zinc-100 p-3 rounded-md w-1/2 mb-4' placeholder='Product Description'></textarea>

        <button className='py-2 px-5 text-2xl border rounded border-blue-500 text-blue-500  font-semibold bg-white hover:bg-blue-500 hover:text-white'>
            Add Product
        </button>
    </form>
    </div>
  )
}

export default Create