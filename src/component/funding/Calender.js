import $ from "jquery";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
const Calender = ({ param, setParam }) => {
  const save = (date) => {
    setStartDate(date);
    setParam({ ...param, dueDate: date });
  };
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    setParam({ ...param, dueDate: startDate });
  }, []);
  return (
    <DatePicker
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      selected={startDate}
      onChange={save}
    />
  );
};
export default Calender;
