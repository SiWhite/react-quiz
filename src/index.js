import React, { Component } from "react";
import ReactDOM from "react-dom";
import QuestionContainer from "./components/QuestionContainer";

class CapicheQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            total_responses: 0,
            correct_responses: 0,
            show_results: false
        };
      }

      removeSiblings = (elem) => {
        let siblings = [];
        let sibling = elem.parentNode.parentNode.firstChild;
        
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem.parentNode) {
                siblings.push(sibling)
            }

            sibling = sibling.nextSibling
        }

        for (sibling of siblings) {
            sibling.remove();
        }
         
        return;
    }

    handleClick = (event, prevState) => {
        var isCorrect = event.target.dataset.correct;
        console.log('isCorrect = ',isCorrect);
        if (this.state.total_responses <= 9) {
            this.setState(
                prevState => {
                    var counter1 = 0;
                    counter1 = prevState.total_responses + 1;
                    return {total_responses: counter1}
                },
                () => {
                    console.log("total_responses: " + this.state.total_responses);
                    console.log("correct_responses: " + this.state.correct_responses);
                });
            if (isCorrect === 'true') {
                this.setState(
                    prevState => {
                        var counter2 = 0;
                        counter2 = prevState.correct_responses + 1;
                        return {correct_responses: counter2};
                    }
                );
            }
            const elem = event.target;
            this.removeSiblings(elem);
        } else {
            this.setState(
                ({total_responses: 10}
            ))
            console.log("total_responses: " + this.state.total_responses);
         }
    }

    showResults = () => {
        this.setState(prevState => ({
            show_results: !prevState.show_results
        }));
    }
    
    render() {
        if (this.state.show_results === false) {
            return (
                <div className="container">
                    <QuestionContainer handleClick = {this.handleClick}></QuestionContainer>
                    <button disabled={this.state.total_responses <= 9} onClick={this.showResults}>Submit results</button>
                </div>
            )   
        } else {
            return (
                <div className="container">
                    <h1>Results</h1>
                    <p>You scored {this.state.correct_responses} out of 10</p>
                    <button onClick={this.showResults}>Play again</button>
                </div>
            )   
        } 
    };
};

ReactDOM.render(<CapicheQuiz />, document.getElementById("root"));