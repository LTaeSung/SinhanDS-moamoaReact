import MemberHeader from "./../member/MemberHeader";
import React, { useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import Iamport from "./iamport";
function PlusPoint() {
  const [plusPoint, setPlusPoint] = useState({
    amount: "",
  });

  const onChangeAmount = (e) => {
    setPlusPoint({ ...plusPoint, [e.target.name]: e.target.value });
  };

  console.log(plusPoint.amount);
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">포인트 충전</h3>

          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="충전할 금액을 입력해주세요"
            onChange={onChangeAmount}
          />
          <Iamport amount={plusPoint.amount} />
        </div>
      </div>
    </>
  );
}

export default PlusPoint;
