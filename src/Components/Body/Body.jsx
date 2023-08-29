import React, { useState, useEffect } from "react";
import { RestaurantCard } from "../Index";
import { restaurantList } from "../config";
import { logo, vector } from "../../Images/index";
import "../Body/Body.css";
import "../Body/Header.css";
import ShimarUI from "../ShimmarUI/ShimarUI";

function filterData(searchText, cardDataList) {
  const filterData = cardDataList.filter((restaurant) =>
    restaurant.data.data.name.includes(searchText)
  );
  return filterData;
}

function Body() {
  const [searchText, setSearchText] = useState(""); //useState is a function that return an array. First Element is state varible and second element is function that how we want to change the state
  const [restaurants, setRestaurants] = useState([]);
  console.log(restaurants);

  useEffect(()=>{
    getResturants();
  },[])

  async function  getResturants(){
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?&lat=19.8644542&lng=75.3557927")
    const json = await data.json();
    console.log(json);
    setRestaurants(json.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  }    

  

  return (restaurants.length === 0) ? <ShimarUI/> : (
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
              const data = filterData(searchText, restaurants);
              setRestaurants(data);
            }}
          >
            Search
          </button>
          {/* NAVBAR */}
        </div>
        <li className="nav-items">
          <ul>Home</ul>
          <ul>Offers</ul>
          <ul>
            <a href="">
              <img src={vector} alt="cart" />
            </a>
          </ul>
        </li>
      </div>
      {/* CARDS */}
      <div className="body-rest">
        {restaurants?.map((restaurant) => {
          return   <RestaurantCard restaurant={...restaurant} key={restaurant?.info?.id} /*key={restaurant.data.data.id}*/ /> 
        })}
      </div>
    </>
  );
}

export default Body;
