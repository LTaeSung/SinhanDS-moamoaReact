import BootPath from "./../../../BootPath";
import { useContext } from "react";
const MessageNo7 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      {" "}
      <p id="text_message">다른 참여자들이 정산중입니다</p>{" "}
    </>
  );
};

export default MessageNo7;
