import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom';
import assets from '../assets/assets';


const Navbar = () => {

    const [products] = useContext(ProductContext);

    let mySet = new Set();
    if(products){
        for(let i = 0; i < products.length; i++) {
            mySet.add(products[i].category);
        }
    }
   

    const uniqueCategories = Array.from(mySet);
    // console.log(uniqueCategories);

    const color = ()=>{
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        return `#${randomColor}`;
    }

  return (
        // {/* NAVBAR  */}
        <nav className='w-[15%] h-screen bg-zinc-100 flex flex-col items-center pt-5'>

            <Link to={`/`} className='py-0 pr-5 pl-1 border rounded border-blue-200 text-blue-500 flex items-center font-bold bg-white ' href="/create">
                <img className='w-12' src={assets.logo} alt="" />
                <div>Fake-Store</div>
            </Link>
            <hr className='w-[90%] bg-black h-[2px] my-3' />
            <h1 className='w-[80%] text-2xl mb-3 font-bold'>Categories</h1>
            <div className='w-[80%]'>
                {uniqueCategories.map((cat,idx)=>{

                    return(
                        <Link key={idx} to={`/?category=${cat}`} className='flex items-center mb-3 gap-2 hover:scale-105 font-semibold'>
                            <span style={{backgroundColor: color()}} className={`w-4 h-4 rounded-full`}></span>  
                            {cat}
                        </Link>
                    ) 

                })}
            </div>
            <hr className='w-[90%] bg-black h-[2px] my-3' />
            <Link to={`/create`} className='py-2 px-5 border rounded border-blue-200 text-blue-500  font-semibold bg-white' href="/create">
                Add New Products
            </Link>

        </nav>

  )
}

export default Navbar