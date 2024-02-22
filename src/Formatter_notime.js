const Formatter_notime = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Seoul", // 시간대 설정
});
export default Formatter_notime;
