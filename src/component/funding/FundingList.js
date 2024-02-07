import FundingHeader from "./FundingHeader";
import React from "react";

function FundingList(){
    return(
        <>
            <FundingHeader/>
            <div className="sub">
                <div className="size">
                    <h3 className="sub_title">모든 펀딩 리스트</h3>
                </div>
            </div>
        </>
    );
}

export default FundingList;