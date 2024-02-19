import BootPath from "./../../../BootPath";
import { useContext } from "react";
const MessageNo6 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <button className="btn">정산받기 : 금액 : 얼마</button>
    </>
  );
};

export default MessageNo6;
