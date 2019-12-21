import React, { Component } from "react";
import ReactDOM from "react-dom";
import QuestionContainer from "./components/QuestionContainer";

class CapicheQuiz extends Component {

    state = {
       responses: 0,
       score: 0
    };

    render() {
        return (
            <div className="container">
                <QuestionContainer></QuestionContainer>
            </div>
        )    
    };
};

ReactDOM.render(<CapicheQuiz />, document.getElementById("root"));