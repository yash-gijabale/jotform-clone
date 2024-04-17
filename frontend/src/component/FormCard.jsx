import React, { useEffect, useState } from "react";
import "./component.css";

import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";

import Checkbox from "@mui/joy/Checkbox";
import { Link } from "react-router-dom";

import formIcon from "../asset/fileIcon2.png";

const FormCard = ({ form, setDeleteProductIds, setDeleteFormId, setOpen }) => {
  const handleChange = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      // let old = [...deleteProductIds];
      // old.push(e.target.value);
      setDeleteProductIds((pre) => {
        return [...pre, e.target.value];
      });
    } else {
      setDeleteProductIds((pre) => {
        let Newpre = pre.filter((id) => {
          return id !== e.target.value;
        });

        return Newpre;
      });
    }
  };

  const deleteForm = (formId) => {
    setOpen((pre) => {
      return !pre;
    });

    setDeleteFormId((pre) => {
      return formId;
    });
  };
  return (
    <div className="form_Card">
      <div className="form_card_1">
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Checkbox value={form.id} onChange={(e) => handleChange(e)} />
          {/* <Checkbox /> */}
        </div>
        <div style={{ width: "10%" }}>
          <img src={formIcon} style={{ height: "40px" }} />
        </div>
        <div
          style={{
            width: "80%",
            height: "100%",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h5 style={{ fontSize: "20px" }}>{form.name}</h5>
          <span> <Link to={`/table/${form.id}`}>{form.total} submissions.</Link> Updated on {new Date(form.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
      <div className="form_card_2">
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { color: "neutral" } }}
            className="menu_dots"
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem>
              <Link to={`/build/${form.id}`}>Edit</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/view/${form.id}`} target="_blank">View</Link>
            </MenuItem>
            <MenuItem>Deactive</MenuItem>
            <MenuItem sx={{ color: "red" }} onClick={() => deleteForm(form.id)}>
              Delete
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FormCard;
