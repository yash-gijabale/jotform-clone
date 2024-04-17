import React, { useState } from "react";

import Input from "@mui/joy/Input";
import Switch from "@mui/joy/Switch";
import Textarea from "@mui/joy/Textarea";

import {
  inputElementPlaceholder,
  inputElementProperty,
  setCheckboxElementProperty,
  setSelectElementProperty,
} from "../action/formAction";

import { useDispatch, useSelector } from "react-redux";

function TextInputProperty({ currentElement }) {
  const dispatch = useDispatch();
  const [lable, setLable] = useState("");
  const changeInputLable = (e) => {
    setLable(e.target.value);
    dispatch(inputElementProperty(e.target.value, currentElement));
  };

  const changePlaceholder = (e) => {
    setLable(e.target.value);
    dispatch(inputElementPlaceholder(e.target.value, currentElement));
  };

  const data = useSelector((state) => state.property);
  console.log(data);

  return (
    <div>
      <h3 style={{ color: "white" }}>{currentElement.element}</h3>

      <div
        style={{
          width: "90%",
          color: "white",
          margin: "auto",
          textAlign: "start",
        }}
      >
        <label>Field Lable</label>
        <Input
          size="sm"
          placeholder="Enter Lable"
          onChange={(e) => changeInputLable(e)}
          value={
            data[currentElement.id] && data[currentElement.id].lable
              ? data[currentElement.id].lable
              : ""
          }
          sx={{
            backgroundColor: "transparent",
            marginTop: "10px",
            color: "white",
          }}
        />
      </div>

      <div
        style={{
          width: "90%",
          color: "white",
          margin: "15px auto",
          textAlign: "start",
        }}
      >
        <label>Field Placeholder</label>
        <Input
          size="sm"
          placeholder="Enter placeholder"
          onChange={(e) => changePlaceholder(e)}
          value={
            data[currentElement.id] && data[currentElement.id].placeholder
              ? data[currentElement.id].placeholder
              : ""
          }
          sx={{
            backgroundColor: "transparent",
            marginTop: "10px",
            color: "white",
          }}
        />
      </div>
    </div>
  );
}

function SelectElementProperty({ currentElement }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property);
  const changeSelectLable = (e) => {
    let type = {
      type: "lable",
      lable: e.target.value,
    };

    dispatch(setSelectElementProperty(type, currentElement));
  };

  const addSelectOption = (e) => {
    let a = e.target.value.split("\n");
    console.log(a);
    let type = {
      type: "options",
      options: a,
    };

    dispatch(setSelectElementProperty(type, currentElement));
  };

  let preOptions = property[currentElement.id] && property[currentElement.id].options || []
  let optionsText = ""

  preOptions.forEach(option => {
    optionsText += `${option}\n`
  })

  console.log(optionsText)

  
  return (
    <div>
      <h3 style={{ color: "white" }}>{currentElement.element}</h3>
      <div className="property_filed">
        <label>Field Lable</label>
        <Input
          size="sm"
          placeholder="Enter Lable"
          onChange={(e) => changeSelectLable(e)}
          value={
            (property[currentElement.id] &&
              property[currentElement.id].lable) ||
            ""
          }
          sx={{
            backgroundColor: "transparent",
            marginTop: "10px",
            color: "white",
          }}
        />
      </div>
      <div className="property_filed">
        <label>Field Lable</label>
        <Textarea
          placeholder="Bootstrap"
          minRows={2}
          sx={{
            backgroundColor: "transparent",
            marginTop: "10px",
            color: "white",
          }}
          value={optionsText}
          onChange={(e) => addSelectOption(e)}
        />
      </div>
    </div>
  );
}



function CheckboxElementProperty({ currentElement }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property);
  console.log(property);
  const changeCheckboxLable = (e) => {
    let type = {
      type: "lable",
      lable: e.target.value,
    };

    dispatch(setCheckboxElementProperty(type, currentElement));
  };

  const changeCheckboxTitle = (e) => {
    let type = {
      type: "title",
      title: e.target.value,
    };

    dispatch(setCheckboxElementProperty(type, currentElement));
  };

  const [checked, setChecked] = useState(
    (property[currentElement.id] && property[currentElement.id].isRequired) ||
      false
  );

  const changeRequired = (e) => {
    setChecked(e.target.checked);
    console.log(checked);
    let type = {
      type: "isRequired",
      isRequired: e.target.checked,
    };

    dispatch(setCheckboxElementProperty(type, currentElement));
  };
  return (
    <div>
      <h3 style={{ color: "white" }}>{currentElement.element}</h3>
      <div className="property_filed">
        <label>Field Lable</label>
        <Input
          size="sm"
          placeholder="Enter Lable"
          onChange={(e) => changeCheckboxLable(e)}
          value={
            (property[currentElement.id] &&
              property[currentElement.id].lable) ||
            ""
          }
          sx={{
            backgroundColor: "transparent",
            marginTop: "10px",
            color: "white",
          }}
        />
      </div>

      <div className="property_filed">
        <label>Field Title</label>
        <Input
          size="sm"
          placeholder="Enter Title"
          onChange={(e) => changeCheckboxTitle(e)}
          value={
            (property[currentElement.id] &&
              property[currentElement.id].title) ||
            ""
          }
          sx={{
            backgroundColor: "transparent",
            marginTop: "10px",
            color: "white",
          }}
        />
      </div>

      <div className="property_filed">
        <label>Field Required</label>
        <div style={{ textAlign: "start", marginTop: "10px" }}>
          <Switch
            checked={checked}
            onChange={(event) => changeRequired(event)}
          />
        </div>
      </div>
    </div>
  );
}
export default {
  TextInputProperty,
  SelectElementProperty,
  CheckboxElementProperty,
};
