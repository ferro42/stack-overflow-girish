import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Homemainbar.css";
import Questionlist from "./Questionlist";
import { useSelector } from "react-redux";
const Homemainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const questionslist = useSelector((state) => state.questionreducer);
  

  const checkauth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("./Askquestion");
    }
  };
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkauth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionslist.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionslist.data.length} questions</p>
            <Questionlist questionslist={questionslist.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Homemainbar;
