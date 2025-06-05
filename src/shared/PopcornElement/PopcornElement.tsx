import React from "react";
import PopcornImage from "../../assets/SinglePopcorn.png";

interface PopcornItemProps {
  id: string;
  top: number;
  left?: number;
  right?: number;
  width: number;
  rotate?: number;
  zIndex?: number;
}

const PopcornItem: React.FC<PopcornItemProps> = ({
  id,
  top,
  left,
  right,
  width,
  rotate,
  zIndex,
}) => {
  const itemStyle: React.CSSProperties = {
    position: "absolute",
    top: `${top}%`,
    width: `${width}%`,
    zIndex: zIndex,
    ...(left !== undefined && { left: `${left}%` }),
    ...(right !== undefined && { right: `${right}%` }),
    ...(rotate !== undefined && { transform: `rotate(${rotate}deg)` }),
  };

  return (
    <img
      src={PopcornImage}
      alt="popcorn"
      id={id}
      className="float-item"
      style={itemStyle}
    />
  );
};

export default PopcornItem;
