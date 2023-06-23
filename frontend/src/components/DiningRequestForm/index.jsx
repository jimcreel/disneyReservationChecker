import { set } from 'mongoose';
import { useState, useEffect } from 'react';
import { getAllRestaurants } from '../../../utils/backend';



export default function DiningRequestForm () {

    const [restaurants, setRestaurants]  = useState([]);

    useEffect(() => {
        getAllRestaurants()
        .then(result => {
            console.log(result)
            setRestaurants(result)
        })
        
    }, [])

    let diningHTML = 'loading...'
    if (restaurants.length > 0) {
        let restaurantList = Object.keys(restaurants.availability)
        console.log(restaurantList)
        let restaurantNames = restaurantList.map((restaurant, idx) => {
            const pattern = /^(\d+);.*?=([^;]+)/;
            const matches = restaurant.match(pattern);
            const restaurantId = matches[1];
            const restaurantType = matches[2];
            console.log(restaurantId)
            console.log(restaurantType)
    }
        )}
    

    return (
        <>
            This is the dining request form
        </> 
    )
}
