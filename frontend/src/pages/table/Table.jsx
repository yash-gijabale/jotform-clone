import { React, Fragment, useEffect, useState } from "react";
import Header from "../../component/Header";
import "./table.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Table = () => {
  const { id } = useParams();

  const [submissions, setSubmissions] = useState([]);
  const [column, setCoulumn] = useState([]);

  const getAllFormResponce = async () => {
    const { data } = await axios.get(`/api/v1/form/submissions/${id}`);
    console.log(data);
    setSubmissions(data.data.submissions);
    setCoulumn(data.data.columns);
  };

  useEffect(() => {
    getAllFormResponce();
  }, []);
  console.log(submissions);
  console.log(column);
  return (
    <Fragment>
      <Header />
      <div className="table_container">
        <table>
          <thead>
            {column.map((data) => {
              return (
                <th>
                  <td>{data.name}</td>
                </th>
              );
            })}
          </thead>
          <tbody>
            {submissions.map((sub) => {
              return (
                <tr>
                  {column.map((d) => {
                    return <td>{sub.responce[d.id]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
