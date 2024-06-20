import React from 'react'
import axios from 'axios'

// CENTRALIZING THE AXIOS 

const instance = axios.create(
    {
        baseURL: "https://fakestoreapi.com/"
    }
)

export default instance