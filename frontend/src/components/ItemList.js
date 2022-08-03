import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

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
