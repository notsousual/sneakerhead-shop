import React, { useState, useEffect } from "react";
import "./App.scss";
import ItemCard from "./components/ItemCard";
import Button from "./components/Button";

import InputForm from "./components/InputForm";

import { ReactComponent as CalendarIcon } from "./assets/calendar.svg";
import { ReactComponent as PlusIcon } from "./assets/plus.svg";
import { ReactComponent as SizeIcon } from "./assets/size.svg";
import { ReactComponent as PriceIcon } from "./assets/dollar_sign.svg";

const sneakersMock = [
  {
    name: "The API link is expired!",
    brand: "Adidas",
    price: 80,
    size: 9.5,
    year: 2020,
  },
  {
    name: "Air Max 90",
    brand: "Nike",
    price: 120,
    size: 10,
    year: 2021,
  },
  {
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 55,
    size: 8,
    year: 2019,
  },
  {
    name: "Superstar",
    brand: "Adidas",
    price: 75,
    size: 9,
    year: 2022,
  },
  {
    name: "Classic Leather",
    brand: "Reebok",
    price: 70,
    size: 8.5,
    year: 2020,
  },
];

const link =
  "https://crudcrud.com/api/5303db441c614aa79c4a6f3fe27841b9/sneakers";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [sneakers, setSneakers] = useState(sneakersMock);
  const [currentSneaker, setCurrentSneaker] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

  const filteredSneakers = sneakers.filter((sneaker) =>
    sneaker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortBy = (key) => {
    const sortedSneakers = [...sneakers].sort((a, b) => a[key] - b[key]);
    setSneakers(sortedSneakers);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    sortBy(value);
  };

  // Function to delete a sneaker given its ID
  const deleteSneaker = (sneakerId) => {
    fetch(`${link}/${sneakerId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Sneaker deleted successfully");
          getSneakers();
        } else {
          console.error("Failed to delete sneaker");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const getSneakers = () => {
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data);
        console.log("Sneakers:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const editSneaker = (sneaker) => {
    setCurrentSneaker(sneaker);
    setIsVisible(true);
  };

  const createNewSneaker = () => {
    setCurrentSneaker({});
    setIsVisible(true);
  };

  useEffect(() => {
    getSneakers();
  }, []);

  return (
    <div className="base">
      {isVisible && (
        <InputForm
          sneaker={currentSneaker}
          visibility={isVisible}
          onClose={() => setIsVisible(false)}
          onUpdate={() => {}}
          onDelete={() => {
            setIsVisible(false);
            deleteSneaker(currentSneaker._id);
          }}
        />
      )}

      <header>
        <h1>Your collection</h1>

        <div style={{ display: "flex", gap: 16 }}>
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            text="Add new sneakers"
            icon={<PlusIcon />}
            onClick={() => createNewSneaker()}
          />
        </div>
      </header>

      <div className="sort-controls">
        <div className="sort-controls__searched-term">
          {filteredSneakers.length > 0 && searchTerm && (
            <>
              {isWideScreen && (
                <div className="sort-controls__searched-term__subtitle">
                  Search results for
                </div>
              )}
              <h3 className="sort-controls__searched-term__title">{`${capitalizeFirstLetter(
                searchTerm
              )} (${filteredSneakers.length})`}</h3>
            </>
          )}
        </div>

        <div className="sort-controls__controls">
          {searchTerm && !isWideScreen ? (
            <>
              <select value={selectedOption} onChange={handleSelectChange}>
                <option value="year">Oldest Year</option>
                <option value="size">Smallest Size</option>
                <option value="price">Lowest Price</option>
              </select>
            </>
          ) : (
            <>
              <span
                style={{ marginRight: 16 }}
                className="sort-controls__controls__label"
              >
                Sort by:
              </span>

              <Button
                text="Oldest Year"
                icon={<CalendarIcon />}
                size="small"
                type="delete"
                onClick={() => sortBy("year")}
              />
              <Button
                text="Smallest Size"
                icon={<SizeIcon />}
                size="small"
                type="transparent"
                onClick={() => sortBy("size")}
              />

              <Button
                text="Lowest Price"
                icon={<PriceIcon />}
                size="small"
                type="transparent"
                onClick={() => sortBy("price")}
              />
            </>
          )}
        </div>
      </div>

      <div className="items">
        {filteredSneakers.map((i, index) => (
          <ItemCard
            key={index}
            sneaker={i}
            onClick={() => editSneaker(i)}
            onDelete={() => deleteSneaker(i._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
