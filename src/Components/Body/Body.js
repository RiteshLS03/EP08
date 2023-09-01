import React, { useState, useEffect } from "react";
import { RestaurantCard } from "../Index";
// import { restaurantList } from "../config"; Downloaded LIST OF Restaurants
import { logo, vector , Homepage } from "../../Images/index"; /* Images for UI */
import "../Body/Body.css";
import "../Body/Header.css";
import ShimarUI from "../ShimmarUI/ShimarUI";


function filterData(searchText, allRestaurants) {
  const filterData = allRestaurants.filter((allRestaurants) =>
    allRestaurants?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
}



// function NoFound(filteredRestaurants , searchText , allRestaurants){

//  
//   let filteredRestaurantsLentgh = filteredRestaurants[filteredRestaurants.length]
//   if(filteredRestaurantsLentgh === 0){
//     return(<h1>No Results Found for {searchText}</h1>)
//   }
// }

function Body() {
  const [allRestaurants, setAllRestaurants] = useState([])
  const [searchText, setSearchText] = useState(""); //useState is a function that return an array. First Element is state varible and second element is function that how we want to change the state
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  console.log(filteredRestaurants);
  const [isLoggedIn,setIsLoggedIn] = useState("true");

  useEffect(()=>{
    getResturants();
  },[])

  async function  getResturants(){
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?&lat=19.8644542&lng=75.3557927")
    const json = await data.json();
    console.log(json);
    setAllRestaurants(json.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurants(json.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

  }    

  


  // avoid components to break
  if (!allRestaurants) return null;

  return (
    <>
      {/* LOGO */}
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        {/* SEARCHBAR  */}
        <div className="search-nav">
          <input
            type="text"
            id="searchbar"
            placeholder="Search, Order, Enjoy!"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // need to filter the data
              const data = filterData(searchText, allRestaurants);
              setFilteredRestaurants(data);
            }}
          >
            Search
          </button>
          {/* NAVBAR */}
        </div>
        <li className="nav-items">
          <ul>Home</ul>
          <ul>Food</ul>
          <ul>FAQ</ul>
          <ul>
            <a href="">
              <img src={vector} alt="cart" />
            </a>
          </ul>
          <ul>{
            isLoggedIn ? 
            <button onClick={()=>setIsLoggedIn(false)}>Logout</button> 
            : <button onClick={()=>setIsLoggedIn(true)}>Login</button> 
            }</ul>    
        </li>
      </div>
      
      
           {
          
     (allRestaurants.length === 0) ? <ShimarUI/> : 
     <div className="body-rest">
        {filteredRestaurants?.map((restaurant) => {
          return   <RestaurantCard restaurant={...restaurant} key={restaurant?.info?.id} /*key={restaurant.data.data.id}*/ /> 
        })}
      </div>}
  </> );
}

export default Body;
