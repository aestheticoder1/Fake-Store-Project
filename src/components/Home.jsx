import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/Axios'

//REACT APP PROJECT
const Home = () => {

    const [products] = useContext(ProductContext);
    // console.log(products);

    const [filteredProducts, setFilteredProducts] = useState(null);

    const { search } = useLocation();

    const category = decodeURIComponent(search.split("=")[1]);

    const getProductsCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`)
            console.log(data);
            setFilteredProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(filteredProducts)
    useEffect(() => {

        if (category != 'undefined') {
            // getProductsCategory();
            setFilteredProducts(products.filter((p) => p.category == category));
        }
        else
            setFilteredProducts(products);

    }, [category, products])

    return filteredProducts !== null ? (
        <>
            <Navbar />

            {/* HOME PAGE */}
            <div className='w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto gap-2 justify-center'>

                {filteredProducts.map((item, idx) => {
                    return (
                        // {/* CARDS */}
                        <Link key={idx} to={`/details/${item.id}`} className='card hover:-translate-y-2 transition-all mr-3 my-3 border border-slate-200 shadow-lg rounded-lg w-[18%] h-[35vh] flex flex-col justify-center px-5 pt-2'>

                            {/* IMAGE DIV */}
                            <div className='transition-all cursor-pointer hover:scale-105 mb-3 w-full h-[70%] bg-contain bg-no-repeat bg-center bg-white'
                                style={{ backgroundImage: `url(${item.image})` }}></div>

                            {/* CONTENT DIV */}
                            <div className=''>
                                <h1 className=' transition-all duration-300 hover:text-blue-600 font-bold cursor-pointer text-[16px]'>{item.title.slice(0, 37)} {item.title.length > 37 ? <span> ...</span> : null}</h1>
                                <div className='font-semibold text-gray-700 opacity-80 my-1'><span>$</span>{item.price}</div>
                            </div>

                        </Link>

                    )
                })}

            </div>
        </>
    ) : (
        <Loading />
    )
}
export default Home