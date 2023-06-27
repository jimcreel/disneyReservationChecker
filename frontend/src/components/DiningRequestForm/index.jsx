import { set } from 'mongoose';
import { useState, useEffect } from 'react';
// import { getAllRestaurants } from '../../../utils/backend';
import axios from 'axios';



export default function DiningRequestForm () {

    const [restaurants, setRestaurants]  = useState([]);

    useEffect(() => {
        getAllRestaurants()
        .then(result => {
            console.log(result)
            let restaurantList = Object.keys(result.availability)
        console.log(restaurantList)
        // let restaurantNames = restaurantList.map((restaurant, idx) => {
        //     const pattern = /^(\d+);.*?=([^;]+)/;
        //     const matches = restaurant.match(pattern);
        //     const restaurantId = matches[1];
        //     const restaurantType = matches[2];
        //     // push a new object into the array
        //     return {id: restaurantId, type: restaurantType}
        //     })
        //     setRestaurants(restaurantNames)
    })
        })


    let diningHTML = 'loading...'
    if (restaurants.length > 0) {
        console.log(restaurants)
    }

    async function getAllRestaurants(req) {
      
        let result = await axios.get(`https://disneyland.disney.go.com/finder/api/v1/explorer-service/list-ancestor-entities/dlr/80008297;entityType=destination/2023-06-22/dining`)
        console.log(result.data)
        return result.data
      } 

    return (
        <>
            This is the dining request form
        </> 
    )
}
