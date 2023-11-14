import React, { useState } from "react";
import "./ItemCard.scss";

import { ReactComponent as DeleteIcon } from "../assets/trash.svg";
import SvgButton from "./SVGButton";

const ItemCard = ({ sneaker, onClick, onDelete }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`item-card ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="item-card__header">
        <h2 className="item-card__header__name">{sneaker.name}</h2>

        <SvgButton IconComponent={DeleteIcon} onClick={onDelete} />
      </div>

      <p className="item-card__brand">{sneaker.brand}</p>

      <div className="item-card__parameters">
        <div className="item-card__parameter">
          <div className="item-card__parameter__title">{sneaker.year}</div>
          <div className="item-card__parameter__subtitle">Year</div>
        </div>

        <div className="item-card__parameters__divider" />

        <div className="item-card__parameter">
          <div className="item-card__parameter__title">{sneaker.size}</div>
          <div className="item-card__parameter__subtitle">Size</div>
        </div>
        <div className="item-card__parameters__divider" />

        <div className="item-card__parameter">
          <div className="item-card__parameter__title">{sneaker.price}</div>
          <div className="item-card__parameter__subtitle">Price</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
