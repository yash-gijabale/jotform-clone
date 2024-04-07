import React, { useEffect, useState } from "react";
import "./component.css";
import Button from "@mui/joy/Button";

import List from "@mui/joy/List";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import { useSelector, useDispatch } from "react-redux";
import { addForm, getAllForms } from "../action/formAction";

const Sitebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { form, loading } = useSelector((state) => state.newForm);

  const createForm = async (e) => {
    
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await dispatch(addForm(data));
  };

  useEffect(() => {
    console.log(loading);
    console.log(form);
    if(form){
      dispatch(getAllForms())
    }
  }, [form,loading]);

  return (
    <div className="sitebar_main">
      <div className="sidebar_head">
        <Button className="btn_primary side_head_btn">CREATE FORM</Button>
      </div>
      <div className="sidebar_menu">
        <div className="menu_group">
          <h5 className="menu_heading">Create Form</h5>
          <div className="menu_box">
            <List component="nav" className="menu_list">
              <ListItemButton className="active_menu menu">
                <ListItemDecorator>
                  <FactCheckIcon />
                </ListItemDecorator>
                All Forms
              </ListItemButton>
              <ListItemButton className="menu" onClick={() => setOpen(true)}>
                <ListItemDecorator>
                  <AddBoxIcon />
                </ListItemDecorator>
                Create Form
              </ListItemButton>
            </List>
          </div>
        </div>
      </div>

      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              width: "50%",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Create Form
            </Typography>
            <form onSubmit={(e) => createForm(e)}>
              <Typography id="modal-desc" textColor="text.tertiary">
                <label style={{ fontWeight: "500" }}>Form Name</label>
                <Input placeholder="Enter name" name="name" />
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row-reverse" },
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  // onClick={() => setOpen(false)}
                  className="btn_primary"
                  // loading
                  loading={loading ? true : false}
                  type="submit"
                >
                  Continue
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Sheet>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default Sitebar;
