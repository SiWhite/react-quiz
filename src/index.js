import React, { Component } from "react";
import ReactDOM from "react-dom";
import QuestionContainer from "./components/QuestionContainer";

class CapicheQuiz extends Component {
    

    componentDidMount() {
        this.shuffleLists();
    }

    shuffleLists = () => {
        var elems = document.getElementsByTagName("ul");

        for (let item of elems) {
            console.log(item.id);
        }

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