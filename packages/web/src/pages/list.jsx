import React, { useEffect, useState } from "react";

const ShopsList = () => {
  const [list, setList] = useState([]);

  const getList = () => {
    fetch("/fusion-icecream")
      .then((res) => res.json())
      .then((newlist) => setList(newlist));
  };

  useEffect(() => {
    if (list.length === 0) {
      getList();
    }
  }, [list]);

  const listStyle = {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '60%',
    'padding': '5% 20%',
  }

  return (
    <div style={listStyle}>
      {list.length > 0 &&
        list.map((shop) => {
          return (
            <div key={shop.id}>
              <h1>{shop.name}</h1>
              <div>
                <h4>{`${shop.reviews.user.name}'s review: `}</h4>
                <small>{shop.reviews.text}</small>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShopsList;
