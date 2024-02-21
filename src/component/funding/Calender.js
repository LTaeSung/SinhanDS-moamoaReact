import $ from "jquery";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
const Calender = ({ param, setParam }) => {
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 90);
  const save = (date) => {
    setStartDate(date);
    setParam({ ...param, dueDate: date });
  };
  const [startDate, setStartDate] = useState(minDate);
  useEffect(() => {
    setParam({ ...param, dueDate: startDate });
  }, []);

  return (
    <DatePicker
      minDate={minDate}
      dateFormat="yyyy-MM-dd"
      selected={startDate}
      onChange={save}
    />
  );
};
export default Calender;
