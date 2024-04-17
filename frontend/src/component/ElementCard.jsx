import React from "react";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import "./component.css";
import { fontSize } from "@mui/system";

const ElementCard = ({ formElement, setFormElement }) => {
  const handleChange = () => {
    setFormElement((pre) => {
      let element = {
        id: pre.currentId,
        element: formElement.id,
      };
      return {
        currentId: pre.currentId + 1,
        element: [...pre.element, element],
      };
    });
  };

  return (
    <div className="element_card" onClick={handleChange}>
      <div style={{
        width:'15%',
        height:'100%',
        backgroundColor:'#33384a',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <formElement.icon style={{fontSize:'30px'}}/>
      </div>
      <span>{formElement.title}</span>
    </div>
  );
};

export default ElementCard;
