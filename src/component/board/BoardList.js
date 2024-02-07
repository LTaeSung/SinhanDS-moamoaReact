import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BoardTr from "./BoardTr";
import { Link } from "react-router-dom";
import BoardHeader from "./BoardHeader";

function BoardList() {
  const [data, setData] = useState(null);
  const [totalElements, setTotalElements] = useState(0); // 총개수
  const [totalPages, setTotalPages] = useState(0); // 총페이지
  const [currentPage, setCurrentPage] = useState(0); // 현재페이지
  const [pageList, setPageList] = useState([]);
  const [prevPage, setPrevPage] = useState({});
  const [nextPage, setNextPage] = useState({});
  const [param, setParam] = useState({
    page: 1,
  });
  let searchType = useRef(null); // 검색타입
  let searchWord = useRef(null); // 검색어
  const getApi = () => {
    axios
      .get("http://localhost:8090/api/reply/list", { params: param })
      .then((res) => {
        setData(res.data.result.content);
        setTotalElements(res.data.result.totalElements);
        setTotalPages(res.data.result.totalPages);
        setCurrentPage(res.data.result.number + 1);
        setPageList(res.data.pageList);
        setPrevPage(res.data.prevPage);
        setNextPage(res.data.nextPage);
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
      <BoardHeader/>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">게시판</h3>

          <div className="bbs">
            <p>
              <span>
                <strong>총 {totalElements}개</strong> | {currentPage}/
                {totalPages}
                페이지
              </span>
            </p>
            <table className="list">
              <caption>게시판 목록</caption>
              <colgroup>
                <col width="80px" />
                <col width="*" />
                <col width="80px" />
                <col width="100px" />
                <col width="100px" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>조회수</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((row, i) => <BoardTr row={row} key={i} />)
                ) : (
                  <tr>
                    <td className="first" colSpan="5">
                      등록된 글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="btnSet" style={{ textAlign: "right" }}>
              <Link className="btn" to="/board/regist">
                글작성
              </Link>
            </div>
            <div className="pagenate clear">
              <ul className="paging">
                {prevPage !== null ? (
                  <li>
                    <Link
                      onClick={() =>
                        setParam({
                          ...param,
                          page: prevPage.pageNumber + 1,
                        })
                      }
                    >
                      &lt;
                    </Link>
                  </li>
                ) : null}

                {pageList
                  ? pageList.map((e, i) => (
                      <li key={i}>
                        <Link
                          className={
                            e.pageNumber === currentPage - 1 ? "current" : ""
                          }
                          onClick={() =>
                            setParam({
                              ...param,
                              page: e.pageNumber + 1,
                            })
                          }
                        >
                          {e.pageNumber + 1}
                        </Link>
                      </li>
                    ))
                  : ""}
                {nextPage !== null ? (
                  <li>
                    <Link
                      onClick={() =>
                        setParam({
                          ...param,
                          page: nextPage.pageNumber + 1,
                        })
                      }
                    >
                      &gt;
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="bbsSearch">
              <form
                method="get"
                name="searchForm"
                id="searchForm"
                onSubmit={search}
              >
                <span className="srchSelect">
                  <select
                    id="stype"
                    name="stype"
                    className="dSelect"
                    title="검색분류 선택"
                    ref={searchType}
                    onChange={search}
                  >
                    <option value="all">전체</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                  </select>
                </span>
                <span className="searchWord">
                  <input
                    type="text"
                    id="sval"
                    name="sval"
                    title="검색어 입력"
                    ref={searchWord}
                  />
                  <input
                    type="button"
                    id=""
                    value="검색"
                    title="검색"
                    onClick={search}
                  />
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardList;
