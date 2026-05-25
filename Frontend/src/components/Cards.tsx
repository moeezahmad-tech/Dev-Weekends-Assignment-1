import React from "react";
import handleAddToCart from "../lib/addToCart";

const Cards = (props: {
  id: string;
  productImage: string;
  productName: string;
  price: number;
}) => {


  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="mx-auto">
        <div className="max-w-xs  w-[300px]  cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
          <img
            className="w-full h-[200px] rounded-lg object-cover object-center"
            src={props.productImage}
            alt="product"
          />
          <p className="mt-4 pl-4 font-bold text-gray-500">
            {props.productName}
          </p>
          <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
            ${props.price.toFixed(2)}
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              className="text-center w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              onClick={() => handleAddToCart(props)}
            >
              Add to Cart
            </button>
            <a
              className="text-center w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 border border-red-300 hover:bg-red-100"
              href={`/product/${props.id}`}
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
