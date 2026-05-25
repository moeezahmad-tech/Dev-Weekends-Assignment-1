import React from "react";

const trimText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

const LongCard = (props: {
  id?: number;
  image?: string;
  name?: string;
  price?: number;
  desc?: string;
  side?: "user" | "admin";
}) => {
  return (
    <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <div className="flex items-center">
        <div className="">
          <img
            className="h-[83px] w-[83px] rounded-lg object-cover object-center"
            src={
              props.image ||
              "https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image2.png?raw=true"
            }
            alt=""
          />
        </div>
        <div className="ml-4">
          <p className="text-base font-medium text-navy-700">
            {props.name || "Food Name"}
          </p>
          <p className="ml-1 font-medium text-brand-500 hover:text-brand-500">
            {props.price ? `$${props.price}` : "$0.00"}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {trimText(
              props.desc?.toString() || "Food description goes here.",
              50,
            )}
          </p>
        </div>
      </div>
      { props.side !== "user" && (
        <a
          className="mr-4 flex items-center justify-center text-gray-600"
          href={`/edititem/${props.id}`}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path>
          </svg>
        </a>
      )}
    </div>
  );
};

export default LongCard;
