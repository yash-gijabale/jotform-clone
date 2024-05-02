import { React, Fragment, useEffect, useState, useRef } from "react";
import Header from "../../component/Header";
import "./table.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Checkbox from "@mui/joy/Checkbox";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import table from "../../asset/table.png";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

import TableChartIcon from "@mui/icons-material/TableChart";
import BtnLoader from "../../component/BtnLoader";

const Table = () => {
  const { id } = useParams();

  const [submissions, setSubmissions] = useState([]);
  const [column, setCoulumn] = useState([]);
  const [form, setForm] = useState({});

  const [responceId, setResponceId] = useState({});
  const [responceIdCount, setResponceIdCount] = useState(0);

  const [doenloadLink, setDownloadLink] = useState({
    loder: false,
    link:''
  });

  const getAllFormResponce = async () => {
    const { data } = await axios.get(`/api/v1/form/submissions/${id}`);
    console.log(data);
    setSubmissions(data.data.submissions);
    setCoulumn(data.data.columns);
    setForm(data.data);
  };

  useEffect(() => {
    getAllFormResponce();
  }, []);
  // console.log(submissions);
  // console.log(column);

  const handleResponce = (e) => {
    console.log(e.target.value);
    let id = Number(e.target.value);
    if (e.target.checked) {
      setResponceId((pre) => {
        let ids = { ...pre };
        ids[id] = true;
        setResponceIdCount(Object.keys(ids).length);
        return ids;
      });
    } else {
      let filterdIds = { ...responceId };
      delete filterdIds[id];
      setResponceIdCount(Object.keys(filterdIds).length);
      setResponceId(filterdIds);
    }
  };

  const selectAllResponce = (e) => {
    if (e.target.checked) {
      let ids = {};
      submissions.forEach((sub) => {
        ids[sub.id] = true;
      });
      setResponceIdCount(Object.keys(ids).length);
      setResponceId(ids);
    } else {
      setResponceId({});
      setResponceIdCount(0);
    }
  };

  console.log(responceId);
  console.log(responceIdCount);

  const download = async () => {
    setDownloadLink({...doenloadLink, loder: true});
    const { data } = await axios.get(`/api/v1/form/download/${id}`);
    console.log(data);
    setDownloadLink({loader: false, link:data.data.url})
    setOpen(true)
  };

  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Header bg={"#fff"} title={form.name} />
      <div className="sub_header">
        <div className="tab">
          {/* <img src={table} height={30} /> */}
          <TableChartIcon sx={{ color: "#098232" }} />
          <span>Submissions</span>
        </div>
      </div>

      <div className="table_container">
        <div className="filter_container">
          <div className="search_area">
            <Input
              size="lg"
              type="search"
              // value={}
              placeholder="Search"
              sx={{ width: "40%", height: "40px", marginLeft: "1rem" }}
            />
            <Button
              color="success"
              onClick={function () {}}
              variant="soft"
              sx={{ height: "40px", fontWeight: "700" }}
            >
              Filters
            </Button>

            {responceIdCount ? (
              <Button
                color="primary"
                onClick={function () {}}
                variant="soft"
                sx={{ height: "40px", fontWeight: "700" }}
              >
                {responceIdCount} entry selected
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="download_area">
            {responceIdCount ? (
              <Button
                color="danger"
                onClick={function () {}}
                variant="outlined"
                value="Delete"
              >
                <DeleteIcon /> Delete
              </Button>
            ) : (
              ""
            )}
            <Button
              color="success"
              onClick={download}
              variant="solid"
              value="Delete"
              sx={{minWidth:'120px'}}
            >
              {doenloadLink.loder ? (
                <BtnLoader />
              ) : (
                <Fragment>
                  <ArrowCircleDownIcon sx={{ marginRight: "5px" }} /> Download
                </Fragment>
              )}
            </Button>
          </div>
        </div>
        <div className="fixTableHead">
          {submissions.length ? (
            <table>
              <thead>
                <th className="fix" style={{ width: "10px" }}>
                  <td style={{ width: "2%", textAlign: "start" }}>
                    <Checkbox
                      sx={{ marginRight: "10px" }}
                      color="success"
                      onChange={(e) => selectAllResponce(e)}
                    />
                  </td>
                </th>
                {column &&
                  column.map((data) => {
                    return (
                      <Fragment>
                        <th>
                          <td>{data.name}</td>
                        </th>
                      </Fragment>
                    );
                  })}
              </thead>
              <tbody>
                {submissions &&
                  submissions.map((sub, ind) => {
                    return (
                      <tr key={sub.id}>
                        <td
                          className="fix"
                          style={{
                            width: "2%",

                            textAlign: "start",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "auto",
                          }}
                        >
                          <Checkbox
                            value={sub.id}
                            sx={{ marginRight: "10px" }}
                            color="success"
                            onChange={(e) => {
                              handleResponce(e);
                            }}
                            checked={responceId.hasOwnProperty(sub.id)}
                          />
                          <span>{ind + 1}</span>
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
                                {/* <Link to={`/build/${form.id}`}>Edit</Link> */}
                                view
                              </MenuItem>
                              <MenuItem>edit</MenuItem>
                              <MenuItem>Deactive</MenuItem>
                            </Menu>
                          </Dropdown>
                        </td>
                        {column.map((d) => {
                          return (
                            <td
                              style={
                                d.id == "submissionDate" ? { width: "10%" } : {}
                              }
                            >
                              {sub.responce[d.id]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="no_data_warning">
              <span>No Submissions yet</span>
            </div>
          )}
        </div>
        <div className="table_footer">
          <span>TOTAL: {submissions.length}</span>
        </div>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            width: 200,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
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
            Your download Link
          </Typography>
          <a href={doenloadLink.link} download={true}>
            <Button
              variant="outlined"
              color="neutral"
              className="btn_primary"
              sx={{ color: "white", marginRight: "20px" }}
            >
              Download
            </Button>
          </a>
        </Sheet>
      </Modal>
    </Fragment>
  );
};

export default Table;
