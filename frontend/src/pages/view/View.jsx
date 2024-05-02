import React, { useEffect, useState } from "react";
import "./view.css";

import { useDispatch } from "react-redux";
import { getFormProperties } from "../../action/formAction";
import { useParams } from "react-router-dom";

import Element from "../../component/FormViewElement";
import Button from "@mui/joy/Button";

import axios from "axios";

const View = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [formElement, setFormElement] = useState([]);
  const [formData, setFormData] = useState({});

  const [options, setOptions] = useState({
    name: "",
    value: [],
  });
  // const [optionsName, setOptionsName] = useState('')

  const getForm = async () => {
    const form = await dispatch(getFormProperties(id));
    console.log(form);
    let data = [];
    for (const key in form.formData.properties) {
      data.push(form.formData.properties[key]);
    }
    setFormElement(data);
    setFormData(form.formData);
  };
  useEffect(() => {
    getForm();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    let submitData = Object.fromEntries(new FormData(e.target));
    submitData["submissionDate"] = new Date().toISOString().substring(0, 10);
    console.log(submitData);
    if (options.value.length) {
      submitData[options.name.replace(/ +/g, "").toLocaleLowerCase()] = options.value;
    }
    // return;

    const { data } = await axios.post(`/api/v1/form/submit/${id}`, submitData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data);
  };

  console.log(options);
  return (
    <div className="form_view_container">
      <div className="form_view">
        <div className="form_name">
          <h2>{formData.name}</h2>
        </div>
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {formElement.map((element) => {
              const Component = Element[element.type];
              return <Component property={element} setOptions={setOptions} />;
            })}
          </div>
          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default View;
