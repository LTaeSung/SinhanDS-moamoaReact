import BootPath from "./../../../BootPath";
import { useContext } from "react";
const MessageNo5 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);

  return (
    <>
      {" "}
      <p id="text_message_voting"> 다른 참여자들의 결과를 집계중입니다</p>
    </>
  );
};

export default MessageNo5;
