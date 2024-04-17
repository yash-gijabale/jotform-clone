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

function TextInput({ currentElement }) {
  const data = useSelector((state) => state.property);
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

function SelectElement({ currentElement }) {
  const property = useSelector((state) => state.property);
  console.log(property);

  let options = (property[currentElement.id] && property[currentElement.id].options) || [];

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
        {(property[currentElement.id] && property[currentElement.id].lable) ||
          "Select"}
      </lable>
      <Select defaultValue="dog">
        {options &&
          options.map((option) => {
            return <Option key={option} value={option}>{option}</Option>;
          })}
      </Select>
    </div>
  );
}

function CheckboxElement({ currentElement }) {
  const property = useSelector((state) => state.property);

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
          "checkbox"}
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

export default {
  TextInput,
  SelectElement,
  CheckboxElement,
};
