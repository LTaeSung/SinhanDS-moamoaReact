import { Link, json } from "react-router-dom";
import FundingInfo from "./FundingInfo";
import React, { Component, useEffect, useState } from "react";

function FundingState(props) {
  console.log(props);

  let { Json } = this.props;
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Link className="btn" to="/funding/make">
          어디로 가야함?
        </Link>
      </div>
      <div>{Json}</div>
    </>
  );
}

export default FundingState;
