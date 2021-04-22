import React from "react";
import SignIn from "../auth/SignIn";

function LandingPage(props) {
  const { loading = false } = props;

  return (
    <div className="landing-page">
      <h1 className="landing-page__title">Hello :)</h1>

      {loading ? <div> loading...</div> : <SignIn />}
    </div>
  );
}

export default LandingPage;
