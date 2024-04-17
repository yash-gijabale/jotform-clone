import Input from "@mui/joy/Input";
import Checkbox from "@mui/joy/Checkbox";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function TextInput({ property }) {
    const name = String(property.lable)
  return (
    <div
      style={{
        textAlign: "start",
        width: "80%",
        marginTop: "10%",
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
    const name = String(property.lable)

  return (
    <div
      style={{
        textAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "80%",
        marginTop: "5%",
        margin: "auto",
      }}
    >
      <lable>{property.title}</lable>
      <Checkbox label={property.lable} value={true} name={name.replace(/ +/g, "").toLowerCase()} variant="outlined" />
    </div>
  );
}

function SelectElement({ property }) {
  const name = String(property.lable)

  let options = (property.options) || [];

  return (
    <div
      style={{
        textAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "80%",
        marginTop: "5%",
        margin: "auto",
      }}
    >
      <lable>
        {(property.lable)}
      </lable>
      <Select defaultValue="select" name={name.replace(/ +/g, "").toLowerCase()}>
        {options &&
          options.map((option) => {
            return <Option key={option} value={option}>{option}</Option>;
          })}
      </Select>
    </div>
  );
}

export default {
  TextInput,
  CheckboxElement,
  SelectElement
};
