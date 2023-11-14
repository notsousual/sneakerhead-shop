import React, { useState, useEffect } from "react";
import "./InputForm.scss";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import SvgButton from "./SVGButton";
import Button from "./Button";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";

const InputForm = ({
  sneaker = {},
  visibility = false,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const initialFormData = {
    name: sneaker.name || "",
    brand: sneaker.brand || "",
    price: sneaker.price || "",
    size: sneaker.size || "",
    year: sneaker.year || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formChanged, setFormChanged] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    brand: "",
    price: "",
    size: "",
    year: "",
  });

  useEffect(() => {
    setFormChanged(false);
  }, [visibility]);
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Ensure all formData values are strings before trimming
    for (const key in formData) {
      const value = formData[key];
      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = `${key} is required`;
        valid = false;
      } else {
        newErrors[key] = "";
      }
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onUpdate({
        ...sneaker,
        ...formData,
        _id: sneaker._id,
      });

      setFormChanged(false);
    }
  };
  return (
    <div style={{ display: visibility ? "block" : "none" }}>
      <div className="backdrop" />
      ''
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-form__header">
          <div className="input-form__header__name">
            {sneaker.name ?? "Add sneakers to your collection"}
          </div>
          <SvgButton IconComponent={CloseIcon} onClick={onClose} />
        </div>

        <div className="input-form__group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input-form__input"
            defaultValue={sneaker.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-form__group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            className="input-form__input"
            defaultValue={sneaker.brand}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-form__group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            className="input-form__input"
            defaultValue={sneaker.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-form__group">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            className="input-form__input"
            defaultValue={sneaker.size}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-form__group">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            id="year"
            className="input-form__input"
            defaultValue={sneaker.year}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-form__controls">
          <Button text="Save" disabled={!formChanged} onClick={() => {}} />
          <Button
            text="Delete"
            type="delete"
            onClick={() => {
              onDelete();
            }}
            icon={<DeleteIcon />}
          />
        </div>
      </form>
    </div>
  );
};

export default InputForm;
