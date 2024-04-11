import React from "react";

import "./component.css";

const ElementCard = ({ title, setFormElement }) => {
  const handleChange = () => {
    setFormElement((pre) => {
      let element = {
        id: pre.currentId,
        element: title,
      };
      return {
        currentId: pre.currentId+1,
        element:[...pre.element, element]
      };
    });
  };

  return (
    <div className="element_card" onClick={handleChange}>
      <span>{title}</span>
    </div>
  );
};

export default ElementCard;
