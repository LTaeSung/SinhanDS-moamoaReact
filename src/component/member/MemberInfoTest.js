import { Link } from "react-router-dom";
import BootPath from "../../BootPath";
import React, { useEffect, useState, useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";
import PointList from "../point/PointList";
import axios from "axios";

function MemberInfoTest() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 파일을 업로드하거나 필요한 작업을 수행합니다.
    console.log("Selected file:", selectedFile);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        ` ${bootpath}/member/info?member_no=${member_no}`
      );
      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원정보</h3>

          <div>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
            {selectedFile && (
              <div>
                <h2>Preview:</h2>
                <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
              </div>
            )}
          </div>

          {data && <p>사진: {data.photo}</p>}

          {data && <p>아이디: {data.email}</p>}
          {data && <p>이름: {data.name}</p>}
          {data && <p>보유포인트: {data.point}</p>}
          {data && <p>네이버 소셜 로그인: {data.email}</p>}
          <div>
            <Link to={"/point/PointList"}>내역</Link>
            <Link to={"/point/MiusPoint"}>인출</Link>
            <Link to={"/point/PlusPoint"}>충전</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberInfoTest;
