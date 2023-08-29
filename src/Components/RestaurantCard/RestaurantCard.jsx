import React from "react";
import "./RestaurantCard.css";
import { IMG_CDN_LINK } from "../config";

function RestaurantCard({ restaurant }) {
  const { name , costForTwo, cuisines , cloudinaryImageId  } = restaurant?.info
  const { lastMileTravelString} = restaurant.info.sla
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
        <h3>{costForTwo}</h3> {/*price */}
        <h3>{lastMileTravelString}</h3>{/*  */}
        <h3>{cuisines.join(", ")}</h3> {/* cuisines */}
      </div>
    </div>
  );
}

export default RestaurantCard;

