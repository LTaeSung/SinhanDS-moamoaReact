import { Link } from "react-router-dom";
import BootPath from "../../BootPath";
import React, { useEffect, useState, useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";
import PointList from "../point/PointList";
import RegistedImagePath from "../../registedImagePath";
import axios from "axios";
import "../../MemberInfo.css";

function MemberInfo() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadedImageUrl(URL.createObjectURL(event.target.files[0])); // 업로드된 이미지 URL 설정
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
          <h3 className="sub_title" />
          <table>
            <tr>
              <td rowSpan="5">
                {data && (
                  <div class="info_frame">
                    <img
                      className="info_image"
                      onClick={handleImageClick}
                      src={
                        uploadedImageUrl || `${registedImagePath}${data.photo}`
                      }
                      width="100"
                      alt="Selected"
                    />
                  </div>
                )}
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <br />
                <button className="changeImage" onClick={handleSubmit}>
                  프로필 사진 변경
                </button>
              </td>
              <td className="infoId">
                <p className="Id_color"> {data && data.email.split("@")[0]}</p>
              </td>
            </tr>
            <tr>
              <td className="infoName">{data && data.name}</td>
            </tr>
            <tr>
              <td className="infoId">
                보유 포인트: <p className="Id_color2">{data && data.point}</p>
              </td>
            </tr>
          </table>
          <div class="button_container">
            <button className="list_button">
              <Link to={"/point/PointList"}>내역</Link>
            </button>
            <button className="withdrawal_button">
              <Link to={"/point/MiusPoint"}>인출</Link>
            </button>
            <button className="button_charge">
              <Link to={"/point/PlusPoint"}>충전</Link>
            </button>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default MemberInfo;
