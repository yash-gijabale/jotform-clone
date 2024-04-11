import Input from "@mui/joy/Input";
import Checkbox from "@mui/joy/Checkbox";

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
    const name = String(property.title)

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

export default {
  TextInput,
  CheckboxElement,
};
