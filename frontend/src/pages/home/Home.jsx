import React, { Fragment, useEffect, useState } from "react";
import Header from "../../component/Header";
import "./home.css";
import Sitebar from "../../component/Sitebar";
import FormCard from "../../component/FormCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllForms } from "../../action/formAction";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [allForms, setAllForms] = useState([]);
  const [filterForms, setFilterForms] = useState([]);
  const { forms, loading } = useSelector((state) => state.forms);

  const [deleteProductIds, setDeleteProductIds] = useState([]);

  const [deleteFormId, setDeleteFormId] = useState("");

  useEffect(() => {
    setAllForms(forms);
  }, [forms]);

  const deleteForm = async () => {
    if (deleteFormId != "") {
      const { data } = await axios.delete(`/api/v1/form/${deleteFormId}`);
      console.log(data);
      setOpen(false);
      dispatch(getAllForms());
    }
  };

  // console.log(allForms);

  const [search, setSearch] = useState("");

  const searchForm = (e) => {
    setSearch(e.target.value);
    let filteredForm = allForms.filter((form) => {
      return (
        form.name.toLowerCase().includes(e.target.value.toLowerCase()) && form
      );
    });

    setFilterForms(filteredForm);
  };

  const deleteManyForms = async () => {
    if (deleteProductIds.length) {
      const deletedFoms = await axios.post(
        "/api/v1/form/deleteMany/delete",
        { formIds: deleteProductIds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    setDeleteProductIds([])
    dispatch(getAllForms());
  };

  // console.log(search);

  return (
    <Fragment>
      <Header />
      <div className="home_main">
        <Sitebar />
        <div className="home_view">
          <div className="filter_container">
            {deleteProductIds.length ? (
              <Button
                variant="outlined"
                color="danger"
                sx={{ marginRight: 5 }}
                onClick={deleteManyForms}
              >
                Delete All ({deleteProductIds.length})
              </Button>
            ) : (
              ""
            )}
            <Input
              size="lg"
              type="search"
              value={search}
              onChange={(e) => searchForm(e)}
              placeholder="Search form"
              sx={{ width: "20%", height: "50px", marginRight: "4rem" }}
            />
          </div>
          <div className="form_list_container">
            {!loading &&
              (search != "" ? filterForms : allForms).map((form) => {
                return (
                  <FormCard
                    key={form.id}
                    form={form}
                    setDeleteProductIds={setDeleteProductIds}
                    setDeleteFormId={setDeleteFormId}
                    setOpen={setOpen}
                  />
                );
              })}
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
            ></Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              Are you sure want to delete ?
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
                color="danger"
                onClick={() => deleteForm()}
                // className="btn_primary"
                // loading
                loading={loading ? true : false}
                type="submit"
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Sheet>
        </Modal>
      </React.Fragment>
    </Fragment>
  );
};

export default Home;
