import FundingHeader from "./FundingHeader";
import React from "react";

function JoinFunding(){
    return(
        <>
            <FundingHeader/>
            <div className="sub">
                <div className="size">
                    <h3 className="sub_title">참여한 펀딩 리스트</h3>
                </div>
            </div>
        </>
    );
}

export default JoinFunding;