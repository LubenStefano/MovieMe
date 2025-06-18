import React from "react";
import SinglePopcornImg from "./../../../assets/SinglePopcorn.png";
import SodaImg from "./../../../assets/Soda.png";
import TicketImg from "./../../../assets/Ticket.png";
import type { CinemaItemProps } from "../../../types/index.ts";


export default function CinemaItem({
  id,
  top,
  left,
  right,
  width,
  rotate,
  zIndex,
  type
}: CinemaItemProps ) {
  // Hide on phones only (max-width: 700px)
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 700px)").matches) {
    return null;
  }

  const itemStyle: React.CSSProperties = {
    position: "absolute",
    top: `${top}%`,
    width: `${width}%`,
    zIndex: zIndex,
    ...(left !== undefined && { left: `${left}%` }),
    ...(right !== undefined && { right: `${right}%` }),
    ...(rotate !== undefined && { transform: `rotate(${rotate}deg)` }),
  };

  let imageSrc;
  
  switch (type) {
    case "popcorn":
        imageSrc = SinglePopcornImg;
        break;
    case "soda":
        imageSrc = SodaImg;
        break;
    case "ticket":
        imageSrc = TicketImg;
        break;
    default:
        imageSrc = TicketImg;
        break;
  }


  return (
    <img
      src={imageSrc}
      alt="popcorn"
      id={id}
      className="float-item"
      style={itemStyle}
    />
  );
}
