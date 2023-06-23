import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import { getAllRestaurants } from '../../../utils/backend';



export default function DiningRequestForm () {

    const [restaurants, setRestaurants]  = useState([]);

    useEffect(() => {
        getAllRestaurants()
        .then(result => {
            setRestaurants(result)
        })
        
    }, [])
    let diningHTML = 'loading...'
    if (restaurants) {
        console.log(restaurants)
    }
    return (
        <>
            This is the dining request form
        </> 
    )
}
