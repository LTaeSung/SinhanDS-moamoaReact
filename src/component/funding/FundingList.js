import FundingHeader from "./FundingHeader";
import React, {useState, useEffect, useRef} from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios, {Axios} from "axios";
import FundingTr from "./FundingTr";
import {Link} from "react-router-dom";


function FundingList() {
  const { bootpath } = useContext(BootPath);
    const [data, setData] = useState(null);
    const [totalElements, setTotalElements] = useState(0); // 총개수
    const [param, setParam] = useState({
        page: 1,
    });
    let searchType = useRef(null); // 검색타입
    let searchWord = useRef(null); // 검색어
  
    const getApi =()=>{
        axios
            .get(BootPath+"/fund/list", {params: param})
            .then((res) => {
                setData(res.data.result.content);
                setTotalElements(res.data.result.totalElements);
            });
    };
    useEffect(() => {
        getApi();
    }, [param]);

    const search = (e) => {
        e.preventDefault();
        setParam({
            ...param,
            searchType: searchType.current.value,
            searchWord: searchWord.current.value,
        });
        //getApi();
    };
    
    
    return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
            <div>
                <div style={{ textAlign: "right" }}>
                    <Link className="btn" to="/funding/make">
                        펀딩 등록하기
                    </Link>>
                </div>
                <p>
                    <span>
                        <strong>총 {totalElements} 개 펀딩</strong>
                    </span>
                </p>
                <table>
                    <caption>펀딩 목록</caption>
                    <thead>
                    <tr>
                        <th>사진</th>
                        <th>번호</th>
                        <th>제목</th>
                        <th>상태</th>
                        <th>모금액</th>
                        <th>시작일자</th>
                        <th>남은일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data ? (
                        data.map((row, i) => <FundingTr row={row} key={i} />)
                    ) : (
                        <tr>
                            <td className="first" colSpan="5">
                                등록된 글이 없습니다.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>


            </div>
        </div>
      </div>
    </>
  );
}

export default FundingList;
