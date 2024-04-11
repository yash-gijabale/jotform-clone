import React, { useState } from "react";

import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Switch from "@mui/joy/Switch";
import Checkbox from "@mui/joy/Checkbox";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

import { useDispatch, useSelector } from "react-redux";
import {
  inputElementPlaceholder,
  inputElementProperty,
  setCheckboxElementProperty,
} from "../action/formAction";

function TextInput({ currentElement }) {
  const data = useSelector((state) => state.TextInput);
  console.log(currentElement);
  return (
    <div style={{ textAlign: "start" }}>
      <lable>
        {(data[currentElement.id] && data[currentElement.id].lable) || "Name"}
      </lable>
      <Input
        size="lg"
        placeholder={
          (data[currentElement.id] && data[currentElement.id].placeholder) || ""
        }
        sx={{ marginTop: "10px" }}
      />
    </div>
  );
}

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

  const data = useSelector((state) => state.TextInput);
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

function SelectElement() {
  return (
    <Select defaultValue="dog">
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
      <Option value="fish">Fish</Option>
      <Option value="bird">Bird</Option>
    </Select>
  );
}

function SelectElementProperty({ currentElement }) {
  const changeCheckboxLable = (e) => {};
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
          onChange={(e) => changeCheckboxLable(e)}
          value={""}
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

function CheckboxElement({ currentElement }) {
  const property = useSelector((state) => state.TextInput);

  return (
    <div
      style={{
        textAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <lable>
        {(property[currentElement.id] && property[currentElement.id].title) ||
          "Name"}
      </lable>
      <Checkbox
        label={
          (property[currentElement.id] && property[currentElement.id].lable) ||
          "Lable"
        }
        variant="outlined"
      />
      {property[currentElement.id] &&
        property[currentElement.id].isRequired && (
          <span style={{ color: "red", marginLeft: "10px" }}>*</span>
        )}
    </div>
  );
}

function CheckboxElementProperty({ currentElement }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.TextInput);
  console.log(property);
  const changeCheckboxLable = (e) => {
    let type = {
      type: "lable",
      lable: e.target.value,
    };

    dispatch(setCheckboxElementProperty(type, currentElement));
  };

  const changeCheckboxTitle = (e) =>{
    let type = {
      type: "title",
      title: e.target.value,
    };

    dispatch(setCheckboxElementProperty(type, currentElement));
  }

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
  TextInput,
  SelectElement,
  CheckboxElement,
  TextInputProperty,
  SelectElementProperty,
  CheckboxElementProperty,
};
