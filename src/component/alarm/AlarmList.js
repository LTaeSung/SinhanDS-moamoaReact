import FundingHeader from "./FundingHeader";
import React from "react";
import AlarmHeader from "./AlarmHeader";

function AlarmList(){
    return(
        <>
            <AlarmHeader/>
            <div className="sub">
                <div className="size">
                    <h3 className="sub_title">모든 알람 리스트</h3>
                </div>
            </div>
        </>
    );
}

export default AlarmList;