import groupBy from "lodash/groupBy";
import moment from "moment";

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