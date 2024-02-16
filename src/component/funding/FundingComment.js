import { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function FundingComment() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [param, setParam] = useState({});
  const [writer, setWriter] = useState("");
  const [no, setNo] = useState("");
  let funding_no = params.get("no");

  const getReplyApi = async () => {
    axios
      .get(`${bootPath.bootpath}/funding/comment/list?fundingno=${funding_no}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("funding_no값이 없습니다. ", error);
      });
  };

  useEffect(() => {
    getReplyApi();
  }, []);

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const no = sessionStorage.getItem("no");
    setWriter(name || "");
    setNo(Number(no) || "");
  }, []);

  //로그인정보
  const getApi = () => {
    console.log(param);
    axios.post(bootPath + "/member/devlogin", param).then((res) => {
      console.log(res);
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("name", res.data.name);
        setWriter(res.data.name);
        setNo(res.data.no);
      }
    });
  };

  return (
    <>
      <div>나 : {writer}</div>
      <div className="sub">
        <p>댓글목록</p>
        {data &&
          data.map((item) => (
            <div key={item.no}>
              {item.name}
              {item.contents}
            </div>
          ))}
      </div>
      <br />
    </>
  );
}

export default FundingComment;
