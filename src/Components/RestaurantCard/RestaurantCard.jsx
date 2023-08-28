import React from "react";
import "./RestaurantCard.css";
import { IMG_CDN_LINK } from "../config";

function RestaurantCard({ restaurant }) {
  const { name, costForTwoString, cuisines , cloudinaryImageId } = restaurant?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.info
  return (
    <div className="card-data">
      <img
        src={
          IMG_CDN_LINK +
          cloudinaryImageId
        }
      />{" "}
      {/*image*/}
      <div className="cardinfo">
        <h4>{name}</h4> {/*restaurantName*/}
        <h3>{costForTwoString}</h3> {/*price */}
        <h3>{cuisines.join(", ")}</h3> {/* cuisines */}
      </div>
    </div>
  );
}

export default RestaurantCard;
