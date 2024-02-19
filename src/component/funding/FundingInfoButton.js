import MessageNo0 from "./fundingInfoButtonList/MessageNo0";
import MessageNo1 from "./fundingInfoButtonList/MessageNo1";
import MessageNo2 from "./fundingInfoButtonList/MessageNo2";
import MessageNo3 from "./fundingInfoButtonList/MessageNo3";
import MessageNo4 from "./fundingInfoButtonList/MessageNo4";
import MessageNo5 from "./fundingInfoButtonList/MessageNo5";
import MessageNo6 from "./fundingInfoButtonList/MessageNo6";
import MessageNo7 from "./fundingInfoButtonList/MessageNo7";

const FundingInfoButton = ({ obj, fundNo, messageNo, fundingMemberNo }) => {
  console.log(obj.messageNo);
  return (
    <>
      <div>{obj.messageNo === 0 ? <MessageNo0 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "1" ? <MessageNo1 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "2" ? <MessageNo2 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "3" ? <MessageNo3 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "4" ? <MessageNo4 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "5" ? <MessageNo5 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "6" ? <MessageNo6 obj={{ ...obj }} /> : null}</div>
      <div>{obj.messageNo == "7" ? <MessageNo7 obj={{ ...obj }} /> : null}</div>
    </>
  );
};

export default FundingInfoButton;
