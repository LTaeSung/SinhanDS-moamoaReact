import MemberHeader from "./MemberHeader";
import React from "react";
import PaymentHeader from "./PaymentHeader";

function Cardlist(){
    return(
        <>
            <PaymentHeader/>
            <div className="sub">
                <div className="size">
                    <h3 className="sub_title">카드 등록</h3>
                </div>
            </div>
        </>
    );
}
export default Cardlist;