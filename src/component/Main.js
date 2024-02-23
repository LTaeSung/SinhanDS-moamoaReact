import MemberHeader from "./member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../BootPath";
import { useContext } from "react";
import axios from "axios";
import CommonImagePath from "../commonImagePath";
import { Link, NavLink } from "react-router-dom";
import "./main.css";

function Main() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);

  const { commonImagePath } = useContext(CommonImagePath);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/admin/getMainTotal`);
      setData(response.data);
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
          <h3 className="sub_title"></h3>
          <div className="space_container"></div>
          <div className="main_image_container">
            <img id="main_dragon" src={`${commonImagePath}dragon.png`} alt="" />
          </div>
          <div className="space_container"></div>

          <div className="icon_container">
            <div className="regist_challenge">
              <img id="rc_icon" src={`${commonImagePath}note.png`} alt="" />
              <div className="icon_textlane_challenge">챌린지 등록</div>
            </div>

            <div className="participation_funding">
              <img id="pf_icon" src={`${commonImagePath}Vector.png`} alt="" />
              <p className="icon_textlane_participation">참여 중 펀딩</p>
            </div>

            <div className="cancel_funding">
              <img id="cf_icon" src={`${commonImagePath}list.png`} alt="" />
              <p className="icon_textlane_cancel">종료된 펀딩</p>
            </div>
          </div>
          <div className="space_container"></div>
          <div className="space_container"></div>

          <div className="challenge_ALL">
            <div className="iconic_moment">
              <img id="go_up_icon" src={`${commonImagePath}go_up.png`} alt="" />
            </div>

            <div className="iconic_moment_textline">
              <div className="chall_text">현재까지 진행된 챌린지</div>
              <div className="chall_count">{data.totalchallenge}</div>
              <span className="dog"> 개</span>
            </div>
          </div>

          <div className="space_container2"></div>

          <div className="challenge_ALL">
            <div className="iconic_moment">
              <img
                id="go_up_icon2"
                src={`${commonImagePath}trophy.png`}
                alt=""
              />
            </div>

            <div className="iconic_moment_textline">
              <div className="chall_text">챌린지에 성공한 사람</div>
              <div className="chall_count">{data.totalsuccess}</div>
              <span className="dog"> 명</span>
            </div>
          </div>

          <div className="space_container2"></div>
          <div className="challenge_ALL">
            <div className="iconic_moment">
              <img
                id="go_up_icon"
                src={`${commonImagePath}no_money.png`}
                alt=""
              />
            </div>

            <div className="iconic_moment_textline">
              <div className="chall_text">총 상금액</div>
              <div className="chall_count">{data.totalmoney}</div>
              <span className="dog"> 원</span>
            </div>
          </div>
          <div className="space_container"></div>
          <div className="goBoard_container">
            <Link id="goBoard" to={""}>
              <p id="board_text">공지사항</p>
            </Link>
            <Link id="goBoard" to={""}>
              <p id="board_text">자유게시판</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
