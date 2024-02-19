import MessageNo0 from "./fundingInfoButtonList/MessageNo0";
import MessageNo1 from "./fundingInfoButtonList/MessageNo1";
import MessageNo2 from "./fundingInfoButtonList/MessageNo2";
import MessageNo3 from "./fundingInfoButtonList/MessageNo3";
import MessageNo4 from "./fundingInfoButtonList/MessageNo4";
import MessageNo5 from "./fundingInfoButtonList/MessageNo5";
import MessageNo6 from "./fundingInfoButtonList/MessageNo6";
import MessageNo7 from "./fundingInfoButtonList/MessageNo7";

const FundingInfoButton = ({ messageNo, fundingMemberNo }) => {
  console.log(typeof fundingMemberNo);
  console.log(messageNo);

  return (
    <>
      <div>
        {messageNo === "0" ? (
          <MessageNo0 fundingMemberNo={fundingMemberNo} />
        ) : null}
      </div>
      <div>{messageNo === "1" ? <MessageNo1 /> : null}</div>
      <div>{messageNo === "2" ? <MessageNo2 /> : null}</div>
      <div>{messageNo === "3" ? <MessageNo3 /> : null}</div>
      <div>{messageNo === "4" ? <MessageNo4 /> : null}</div>
      <div>{messageNo === "5" ? <MessageNo5 /> : null}</div>
      <div>{messageNo === "6" ? <MessageNo6 /> : null}</div>
      <div>{messageNo === "7" ? <MessageNo7 /> : null}</div>
    </>
  );
};

export default FundingInfoButton;
