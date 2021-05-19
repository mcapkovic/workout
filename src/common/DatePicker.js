import React from "react";
import moment from "moment";
import { Button } from "./index";

/**
 * not finished
 */
function DatePicker(props) {
  const value = new Date();
  const [date, setDate] = React.useState(new Date());

  function dayUpHandler() {
    const newDate = new Date(moment(date).add(1, "days"));
    const today = new Date();

    if (newDate > today) return;

    setDate(newDate);
  }

  function dayDownHandler() {
    const newDate = new Date(moment(date).subtract(1, "days"));
    // const today = new Date();
    setDate(newDate);
  }

  return (
    <div className="date-picker">
      <div className="date-picker__segment">
        <Button className="date-picker__segment__button" onClick={dayUpHandler}>
          +
        </Button>
        <div className="date-picker__segment__value">{date.getDate()}</div>
        <Button
          className="date-picker__segment__button"
          onClick={dayDownHandler}
        >
          -
        </Button>
      </div>
      <div>/</div>
      <div className="date-picker__segment">
        <Button className="date-picker__segment__button" onClick={dayUpHandler}>
          +
        </Button>

        <div className="date-picker__segment__value">
          {date.getMonth() + 1}
        </div>
        <Button className="date-picker__segment__button" onClick={dayUpHandler}>
          +
        </Button>
      </div>
      <div>/</div>
      <div className="date-picker__segment">
        <Button className="date-picker__segment__button" onClick={dayUpHandler}>
          +
        </Button>

        <div className="date-picker__segment__value">{date.getFullYear()}</div>
        <Button className="date-picker__segment__button" onClick={dayUpHandler}>
          +
        </Button>
      </div>
    </div>
  );
}

export default DatePicker;
