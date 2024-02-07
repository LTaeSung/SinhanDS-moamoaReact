import FundingHeader from "./FundingHeader";
import React from "react";

function FundingInfo(){
    return(
        <>
            <FundingHeader/>
            <div className="sub">
                <div className="size">
                    <h3 className="sub_title">펀딩 상세내역</h3>
                </div>
            </div>
        </>
    );
}

export default FundingInfo;