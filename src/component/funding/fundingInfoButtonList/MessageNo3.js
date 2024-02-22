import BootPath from "./../../../BootPath";
import { useContext } from "react";
const MessageNo3 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      {" "}
      <p id="text_message"> 중도포기하였습니다.</p>
    </>
  );
};

export default MessageNo3;
