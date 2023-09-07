import React, { useState, useEffect } from "react";
import { RestaurantCard } from "../Index";
import { logo, vector , Homepage } from "../../Images/index"; /* Images for UI */
import "../Body/Body.css";
import "../Body/Header.css";
import ShimarUI from "../ShimmarUI/ShimarUI";
import { SwiggyAPI_URL } from "../config.js";


function filterData(searchText, allRestaurants) {
  const filterData = allRestaurants.filter((allRestaurants) =>
    allRestaurants?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
}


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

    try {
      const response = await fetch(SwiggyAPI_URL);
      const json = await response.json();

      async function checkJsonData(jsondata){
        for(i=0;i < jsondata?.data?.cards.length; i++){

          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          if(checkData !== undefined){
            return checkData;
          }
        }
      }

      const resData = await checkJsonData(json);
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);

    } catch (error) {
      console.log(error)
    }
  }    

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
       </div> 
       }
      
  </> );
}

// export function InnerBody(){
//   return(
//       (allRestaurants.length === 0) ? <ShimarUI/> : 
 
//       <div className="body-rest">
//          {filteredRestaurants?.map((restaurant) => {
//            return   <RestaurantCard restaurant={...restaurant} key={restaurant?.info?.id} /*key={restaurant.data.data.id}*/ /> 
//          })}
//        </div> )
//        if (!allRestaurants) return null;
// }



export default Body;
