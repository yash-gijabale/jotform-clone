import React, { Fragment, useEffect, useState } from "react";
import BuildHeader from "../../component/BuildHeader";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import Element from "../../component/FormElements";

import "./build.css";
import ElementCard from "../../component/ElementCard";

import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import Button from "@mui/joy/Button";
import { useSelector } from "react-redux";
import { getFormProperties } from "../../action/formAction";
import axios from "axios";

const Build = () => {
  const [elementShow, setElementShow] = useState(false);

  // const arr = [];

  const AllElement = ["SelectElement", "TextInput", "CheckboxElement"];

  const toggleElement = () => {
    setElementShow((pre) => {
      return !pre;
    });
  };

  console.log(elementShow);

  let [formElement, setFormElement] = useState({
    currentId: 1,
    element: [],
  });

  console.log(formElement);

  const [propertyShow, setPropertyShow] = useState(false);

  const [CurrentProperty, setCurrentProperty] = useState("TextInputProperty");

  const [currentElement, setCurrentElement] = useState({});

  const openProperty = (ele) => {
    console.log(ele);

    setPropertyShow(true);

    setCurrentElement(ele);

    const CurrentPropertyEle = Element[`${ele.element}Property`];
    // console.log(CurrentPropertyEle);
    setCurrentProperty((pre) => {
      return CurrentPropertyEle;
    });
  };

  console.log(formElement);

  const closePropertyBox = () => {
    setPropertyShow(false);
  };

  const formProperty = useSelector((state) => state.TextInput);

  const { id } = useParams();


  const submitFormBuild = async () => {
    console.log(formProperty);
    // const updatedFrom =
    let formColumnData = [];

    for (const key in formProperty) {
      let id = String(formProperty[key].lable);
      let data = {
        id: id.replace(/ +/g, "").toLowerCase(),
        name: formProperty[key].lable,
      };

      formColumnData.push(data)
    }
    const updateForm = {
      properties: formProperty,
      columns: formColumnData,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    console.log(updateForm);
    const updatedFrom =  await axios.put(`/api/v1/form/${id}`, updateForm)
    console.log('formupdated--->',updatedFrom)
  };

  const dispatch = useDispatch();
  const [formName, setFormName] = useState("");
  const getForm = async () => {
    let preForm = await dispatch(getFormProperties(id));
    setFormElement(preForm.properties);
    setFormName((preForm.formData && preForm.formData.name) || "");
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <Fragment>
      <BuildHeader />
      <div className="build_container">
        <div className="field_box">
          <div
            className={
              elementShow
                ? "field_container filed_container_show"
                : "field_container filed_container_hide"
            }
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={toggleElement}
              />
            </div>
            <div className="element_list">
              {AllElement.map((ele) => {
                return (
                  <ElementCard title={ele} setFormElement={setFormElement} />
                );
              })}
            </div>
          </div>
          <div
            className={
              elementShow
                ? "field_toggle element_btn_hide"
                : "field_toggle element_btn_show"
            }
            onClick={toggleElement}
          >
            <span>Add Form Element</span>
            <AddIcon />
          </div>
        </div>
        <div className="build_area">
          <div className="form_box">
            <h2>{formName}</h2>
            {formElement.element.map((ele) => {
              const Component = Element[ele.element];
              // console.log(Component);
              return (
                <div className="element_box">
                  <div className="element">
                    <Component currentElement={ele} />
                  </div>
                  <div className="property">
                    <Chip
                      variant="soft"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => openProperty(ele)}
                    >
                      <SettingsIcon />
                    </Chip>
                    <Chip
                      size="lg"
                      variant="soft"
                      color="danger"
                      sx={{ cursor: "pointer" }}
                    >
                      <DeleteIcon />
                    </Chip>
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            sx={{ position: "relative", top: "5%" }}
            onClick={submitFormBuild}
          >
            Submit
          </Button>
        </div>
        <div
          className={
            propertyShow
              ? "property_box property_box_show"
              : "property_box property_box_hide"
          }
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              cursor: "pointer",
            }}
          >
            <CloseIcon onClick={closePropertyBox} />
          </div>
          <div>
            <CurrentProperty currentElement={currentElement} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Build;
