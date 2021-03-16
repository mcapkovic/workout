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
