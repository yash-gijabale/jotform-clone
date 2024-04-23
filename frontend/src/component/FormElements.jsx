import React, { useEffect, useState } from "react";

import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Checkbox from "@mui/joy/Checkbox";
import Box from "@mui/joy/Box";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDispatch, useSelector } from "react-redux";
import { setDefultOptions } from "../action/formAction";

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

  let options =
    (property[currentElement.id] && property[currentElement.id].options) || [];

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
            return (
              <Option key={option} value={option}>
                {option}
              </Option>
            );
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

export const PhoneNumber = ({ currentElement }) => {
  const data = useSelector((state) => state.property);

  return (
    <div style={{ textAlign: "start" }}>
      <lable>
        {(data[currentElement.id] && data[currentElement.id].lable) ||
          "Phone Number"}
      </lable>
      <Input
        size="lg"
        type="number"
        placeholder={
          (data[currentElement.id] && data[currentElement.id].placeholder) || ""
        }
        sx={{ marginTop: "10px" }}
      />
    </div>
  );
};

export const DateFiled = ({ currentElement }) => {
  const data = useSelector((state) => state.property);

  return (
    <div style={{ textAlign: "start" }}>
      <lable>
        {(data[currentElement.id] && data[currentElement.id].lable) ||
          "Select Date"}
      </lable>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={
              data[currentElement.id] && data[currentElement.id].placeholder
            }
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export const MultipleChoise = ({ currentElement }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.property);
  
  useEffect(() => {
    dispatch(setDefultOptions(currentElement));
  }, []);
  return (
    <div style={{ textAlign: "start" }}>
      <lable>
        {(data[currentElement.id] && data[currentElement.id].lable) ||
          "Multiple Choise"}
      </lable>
      <Box sx={{ display: "flex", gap: 3, marginTop: "10px", flexWrap:'wrap' }}>
        {data[currentElement.id] && data[currentElement.id].defultProp.map((ele) => {
          return <Checkbox label={ele.lable} />;
        })}
      </Box>
    </div>
  );
};

export default {
  TextInput,
  SelectElement,
  CheckboxElement,
  PhoneNumber,
  DateFiled,
  MultipleChoise,
};
