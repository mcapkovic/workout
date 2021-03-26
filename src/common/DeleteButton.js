import React from "react";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

function DeleteButton(props) {
  const { buttonText = "Delete", onClick, className, ...buttonProps } = props;
  const [askQuestion, setAskQuestion] = React.useState(false);

  function deleteHandler() {
    setAskQuestion(false);
    if (onClick) onClick();
  }

  return (
    <div className={`${className} delete-button`}>
      <AnimatePresence exitBeforeEnter>
        {!askQuestion && (
          <motion.div
            key="first"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <Button onClick={() => setAskQuestion(true)} {...buttonProps}>
              {buttonText}
            </Button>
          </motion.div>
        )}
        {askQuestion && (
          <motion.div
            key="second"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DeleteButton;
