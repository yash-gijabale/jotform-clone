import React, { Fragment } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SettingsIcon from '@mui/icons-material/Settings';

import { useParams } from "react-router-dom";

import "./component.css";
import { Link } from "react-router-dom";
const BuildHeader = () => {

  const {id} = useParams()
  return (
    <Fragment>
      <div className="header_main build_header">
        <div className="menu">
          {/* <img src={logo} alt="logo" style={{height:'100px'}} /> */}
        </div>
      </div>
      <div className="sub_header">
        <div className="back_btn">
          <Link to={'/myforms'} style={{cursor:'pointer'}}><button><KeyboardArrowLeftIcon /> Back</button></Link>
          <Link to={`/view/${id}`} style={{cursor:'pointer'}}><button>View form</button></Link>
        </div>
        <div className="menu">
          <Link to={`/build/setting/${id}`}><button style={{display:'flex', alignItems:'center', justifyContent:'center'}}><SettingsIcon />Setting</button></Link>
        </div>
         <div className="back_btn" style={{width:'10% !important'}}>
          {/* <Link to={'/myforms'} style={{cursor:'pointer'}}><button><KeyboardArrowLeftIcon sx={{padding:0}}/> Back</button></Link>
          <Link to={`/view/${id}`} style={{cursor:'pointer'}}><button>View</button></Link> */}
        </div>
      </div>
    </Fragment>
  );
};

export default BuildHeader;
