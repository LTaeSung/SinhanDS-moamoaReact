import { Link } from "react-router-dom";
import BootPath from "../../BootPath";
import React, { useEffect, useState, useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";
import PointList from "../point/PointList";
import RegistedImagePath from "../../registedImagePath";
import axios from "axios";

function MemberInfo() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        bootpath + `/member/changePhoto?member_no=${member_no}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("사진이 변경되었습니다.");
      } else {
        console.error("사진 변경이 실패했습니다. 나중에 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
              사진변경
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
            {selectedFile && (
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  width="100"
                  alt="Selected"
                />
              </div>
            )}
          </div>

          {data && (
            <p>
              <img
                src={`${registedImagePath}${data.photo}`}
                width="100"
                alt="Selected"
              />
            </p>
          )}

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

export default MemberInfo;
