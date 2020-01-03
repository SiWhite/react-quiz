import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import './scss/base.scss';
import QuestionContainer from "./components/QuestionContainer";


class CapicheQuiz extends Component {

    constructor(props) {
        super(props)
    
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            total_responses: 0,
            correct_responses: 0,
            show_results: false,
            results_message: '',
            incorrectAnswers: []
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
        event.target.setAttribute('disabled','disabled');
        const isCorrect = event.target.dataset.correct;
        const incorrectlyAnsweredQuestion = event.target.dataset.question;
        
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
                        let counter2 = 0;
                        counter2 = prevState.correct_responses + 1;
                        return {correct_responses: counter2};
                    }
                );
            } else {
                this.setState(
                    prevState => {
                    const incorrectAnswers = prevState.incorrectAnswers.concat(incorrectlyAnsweredQuestion);
                    this.setState({ incorrectAnswers: incorrectAnswers })
                  });
            }
            const elem = event.target;
            this.removeSiblings(elem);
        } else {
            this.setState(
                ({total_responses: 10}
            ))
            console.log("total_responses: " + this.state.total_responses);
         }
        // console.log("incorrectAnswers: " + this.state.incorrectAnswers);
    }

    showResults = () => {
        this.setResultsMessage();
        this.setState(prevState => ({
            show_results: !prevState.show_results
        }));
        const submitBtn = document.getElementById("btn-submit");
        submitBtn.classList.remove('show');
    }

    setResultsMessage = (prevState) => {
        if (this.state.correct_responses <= 3) {
            this.setState(prevState => ({
                results_message: 'Not great, try harder next time.'
            }));
        } else if (this.state.correct_responses >= 4 && this.state.correct_responses < 8) {
            this.setState(prevState => ({
                results_message: 'Not too bad, see if you can beat your score next time.'
            }));
        } else if (this.state.correct_responses >= 8) {
            this.setState(prevState => ({
                results_message: 'Woah. Check out the big brain on you! Nice work.'
            }));
        }
    }

    resetQuiz = () => {
        this.setState(prevState => ({
            show_results: !prevState.show_results
        }));
        this.setState(
            ({total_responses: 0, correct_responses: 0}))
    }
    
    render() {
        if (this.state.show_results === false) {
            return (
                <div className="container">
                    <div className="clearfix">
                        <QuestionContainer handleClick = {this.handleClick}></QuestionContainer>
                        <button id="btn-submit" disabled={this.state.total_responses <= 9} onClick={this.showResults}>Submit results</button>
                    </div>
                </div>
            )   
        } else {
            const RenderHTMLIncorrectlyAnsweredQuestion = (props) => (<li dangerouslySetInnerHTML={{__html:props.HTML}}></li>);
            return (
                <div className="container">
                    <h1>Results</h1>
                    <p>You scored {this.state.correct_responses} out of 10</p>
                    <p>{this.state.results_message}</p>
                    <ol>
                    {this.state.incorrectAnswers.map(incorrectAnswer => (
                        <RenderHTMLIncorrectlyAnsweredQuestion key={incorrectAnswer} HTML={incorrectAnswer}/>
                    ))}
                    </ol>
                    <button className="resetBtn" onClick={this.resetQuiz}>Play again</button>
                </div>
            )   
        } 
    };
};

ReactDOM.render(<CapicheQuiz />, document.getElementById("root"));