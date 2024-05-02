import Input from "@mui/joy/Input";
import Checkbox from "@mui/joy/Checkbox";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Box from "@mui/joy/Box";


import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

function TextInput({ property }) {
  const name = String(property.lable);
  return (
    <div
      style={{
        textAlign: "start",
        width: "80%",
        marginTop: "1rem",
        margin: "auto",
        paddingTop: "2rem",
      }}
    >
      <lable>{property.lable}</lable>
      <Input
        size="lg"
        placeholder={property.placeholder}
        name={name.replace(/ +/g, "").toLowerCase()}
        sx={{ marginTop: "10px", width: "100%", margin: "auto" }}
      />
    </div>
  );
}

function CheckboxElement({ property }) {
  const name = String(property.lable);

  return (
    <div
      style={{
        textAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "80%",
        marginTop: "1rem",
        margin: "auto",
      }}
    >
      <lable>{property.title}</lable>
      <Checkbox
        label={property.lable}
        value={true}
        name={name.replace(/ +/g, "").toLowerCase()}
        variant="outlined"
      />
    </div>
  );
}

function SelectElement({ property }) {
  const name = String(property.lable);

  let options = property.options || [];

  return (
    <div
      style={{
        textAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "80%",
        marginTop: "1rem",
        margin: "auto",
      }}
    >
      <lable>{property.lable}</lable>
      <Select
        defaultValue="select"
        name={name.replace(/ +/g, "").toLowerCase()}
      >
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

function PhoneNumber({ property }) {
  const name = String(property.lable);
  return (
    <div
      style={{
        textAlign: "start",
        width: "80%",
        marginTop: "1rem",
        margin: "auto",
        paddingTop: "2rem",
      }}
    >
      <lable>{property.lable}</lable>
      <Input
        size="lg"
        type="number"
        placeholder={property.placeholder}
        name={name.replace(/ +/g, "").toLowerCase()}
        sx={{ marginTop: "10px", width: "100%", margin: "auto" }}
      />
    </div>
  );
}

export const DateFiled = ({ property }) => {
  const name = String(property.lable);
  return (
    <div
      style={{
        textAlign: "start",
        width: "80%",
        marginTop: "1rem",
        margin: "auto",
        paddingTop: "2rem",
      }}
    >
      <lable>{property.lable}</lable>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={[property.placeholder]}
            name={name.replace(/ +/g, "").toLowerCase()}
            sx={{width:"100%"}}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export const MultipleChoise = ({ property, setOptions }) => {
  const name = String(property.lable);
  // const [options, setOptionMain] = useState([])

  const hanldeChange = (e) =>{
    if(e.target.checked){
      // setOptionMain(pre =>{
      //   return [...pre, e.target.value]
      // })
      setOptions((pre)=>{
        let old = JSON.parse(JSON.stringify(pre.value))
        return {
          name:name,
          value: [...old, e.target.value]
        }
      })
    }

  }
  return (
    <div style={{
      textAlign: "start",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "80%",
      marginTop: "1rem",
      margin: "auto",
    }}>
      <lable>
        {(name) ||
          "Multiple Choise"}
      </lable>
      <Box sx={{ display: "flex", gap: 3, marginTop: "10px", flexWrap:'wrap', flexDirection:property.layout }}>
        {property.defultProp.map((ele) => {
          return <Checkbox label={ele.lable} value={ele.value} onChange={(e) => hanldeChange(e)}/>;
        })}
      </Box>
    </div>
  );
};

export default {
  TextInput,
  CheckboxElement,
  SelectElement,
  PhoneNumber,
  DateFiled,
  MultipleChoise
};
