import React, { Component } from "react";
import ReactDOM from "react-dom";
import QuestionContainer from "./components/QuestionContainer";

class CapicheQuiz extends Component {
    
    componentDidMount() {
        
    }


    render() {
        return (
            <div className="container">
                <QuestionContainer></QuestionContainer>
            </div>
        )    
    };
};

ReactDOM.render(<CapicheQuiz />, document.getElementById("root"));