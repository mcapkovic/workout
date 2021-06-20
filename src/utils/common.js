import groupBy from "lodash/groupBy";
import moment from "moment";
import { PRAISE_MESSAGES } from "./constants";

export function getClassNames(...classes) {
  return classes
    .map((argument) => {
      return typeof argument === "object"
        ? Object.keys(argument)
            .map((key) => (argument[key] ? key : null))
            .filter((argument) => !!argument)
            .join(" ")
        : argument;
    })
    .filter((argument) => !!argument)
    .join(" ");
}

export function groupByDay(data) {
  if (!data) return [];
  if (data.length === 0) return [];
  return groupBy(data, (item) =>
    moment(item.createdAt.seconds * 1000)
      .startOf("day")
      .format("MMM Do")
  );
}

function randomNumber(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomPraise() {
  const index = randomNumber(0, PRAISE_MESSAGES.length - 1);
  return `${PRAISE_MESSAGES[index]}!`;
}

export function roundNumber(number, decimals = 12) {
  var newnumber = new Number(number + "").toFixed(parseInt(decimals));
  return parseFloat(newnumber);
}

export function getColorCode() {
  const makeColorCode = "0123456789ABCDEF";
  let code = "#";
  for (let count = 0; count < 6; count++) {
    code = code + makeColorCode[Math.floor(Math.random() * 16)];
  }
  document.documentElement.style.setProperty("--primary-color", code);
  return code;
}

export function GenerateColor() {
  function generate() {
    const makeColorCode = "0123456789ABCDEF";
    let code = "#";
    for (let count = 0; count < 6; count++) {
      code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }
    document.documentElement.style.setProperty("--primary-color", code);
  }

  return <button onClick={generate}>generate</button>;
}
