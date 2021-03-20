import React from "react";
import Button from "./Button";

function DeleteButton(props) {
  const { buttonText = "Delete", onClick, className, ...buttonProps } = props;
  const [askQuestion, setAskQuestion] = React.useState(false);

  function deleteHandler() {
    setAskQuestion(false);
    if (onClick) onClick();
  }
  return (
    <div className={`${className} delete-button`}>
      {!askQuestion && (
        <Button onClick={() => setAskQuestion(true)} {...buttonProps}>
          {buttonText}
        </Button>
      )}
      {askQuestion && (
        <>
          <Button
            className="delete-button__negative"
            onClick={() => setAskQuestion(false)}
          >
            No, don't{" "}
            <span className="delete-button__negative__button-text">
              {buttonText}
            </span>
          </Button>
          <Button onClick={deleteHandler}>
            Yes,{" "}
            <span className="delete-button__negative__button-text">
              {buttonText}
            </span>
          </Button>
        </>
      )}
    </div>
  );
}

export default DeleteButton;
