import BootPath from "./../../../BootPath";
import { Link } from "react-router-dom";
import { useContext } from "react";
const MessageNo4 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <Link className="btn">성공</Link>
      <Link className="btn">실패</Link>
    </>
  );
};

export default MessageNo4;
