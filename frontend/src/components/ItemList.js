import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

import CryingEmoji from "../imgs/crying-emoji.png";

const ItemList = (props) => {
  let items = props.items;

  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  if (props.titleSearchTerm && props.titleSearchTerm.length >= 3) {
    items = items.filter((item) =>
      item.title
        .toLowerCase()
        .includes(props.titleSearchTerm.toLowerCase().trim())
    );
  }
  
  if (items.length === 0) {
    return (
      <div
        id="empty"
        className="w-50 mt-5 d-flex flex-column justify-content-center align-items-center empty-container"
      >
        <img src={CryingEmoji} alt='Crying Emoji' className="emoji" />
        <p className="mt-4">
          No items found for{" "}
          <span className="highlight-bold">{props.searchTerm}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="container py-2">
      <div className="row">
        {items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ItemList;
