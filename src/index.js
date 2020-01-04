import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import './scss/base.scss';
import QuestionContainer from "./components/QuestionContainer";


class CapicheQuiz extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef() 
    
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            total_responses: 0,
            correct_responses: 0,
            show_results: false,
            results_message: '',
            incorrectAnswers: [],
            correctAnswers: [],
            correctResults: []
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
        const answeredQuestion = event.target.dataset.question;
        const correctAnswer = event.target.dataset.correctanswer;
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
                        const correctAnswers = prevState.correctAnswers.concat(answeredQuestion, correctAnswer);
                        this.setState({ correctAnswers: correctAnswers })
                        return {correct_responses: counter2};
                    }
                );
            } else {
                this.setState(
                    prevState => {
                    const incorrectAnswers = prevState.incorrectAnswers.concat(answeredQuestion, correctAnswer);
                    //const correctResultsAnswer = prevState.correctResults.concat(correctAnswer);
                    this.setState({ incorrectAnswers: incorrectAnswers})
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
            show_results: !prevState.show_results,
            total_responses: 0, correct_responses: 0,
            incorrectAnswers: [],
            correctAnswers: [],
            correctResults: []
            
        }));
    }

    componentDidMount = () => this.handleScroll()

    handleScroll = () => {
        if (this.state.show_results !== false) {
            const { index, selected } = this.props
            if (index === selected) {
            setTimeout(() => {
                this.myRef.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
            }
        }
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
            const RenderHTMLAnsweredQuestion = (props) => (<li dangerouslySetInnerHTML={{__html:props.HTML}}></li>);
            if (this.state.correct_responses >= 1) {
                return (
                    <div className="container results-container" ref={this.myRef}>
                        <div className="results-intro">
                            <h1>Results</h1>
                            <p>You scored {this.state.correct_responses} out of 10</p>
                            <p>{this.state.results_message}</p>
                        </div>
                        <h4>You <span className="green">correctly</span> answered the following questions:</h4>
                        <ul>
                        {this.state.correctAnswers.map(correctAnswer => (
                            <RenderHTMLAnsweredQuestion key={correctAnswer} HTML={correctAnswer}/>
                        ))}
                        </ul>
                        <h4>You <span className="red">incorrectly</span> answered the following questions, the correct answers were:</h4>
                        <ul>
                        {this.state.incorrectAnswers.map(incorrectAnswer => (
                            <RenderHTMLAnsweredQuestion key={incorrectAnswer} HTML={incorrectAnswer}/>
                        ))}
                        </ul>
                        <button className="resetBtn" onClick={this.resetQuiz}>Play again</button>
                    </div>
                )   
            } else {
                return (
                    <div className="container results-container" ref={this.myRef}>
                        <div className="results-intro">
                            <h1>Results</h1>
                            <p>You scored {this.state.correct_responses} out of 10</p>
                            <p>{this.state.results_message}</p>
                        </div>
                        <h4>You <span className="red">incorrectly</span> answered the following questions, the correct answers were:</h4>
                        <ul>
                        {this.state.incorrectAnswers.map(incorrectAnswer => (
                            <RenderHTMLAnsweredQuestion key={incorrectAnswer} HTML={incorrectAnswer}/>
                        ))}
                        </ul>
                        <button className="resetBtn" onClick={this.resetQuiz}>Play again</button>
                    </div>
                )   
            }
            
        } 
    };
};

ReactDOM.render(<CapicheQuiz/>, document.getElementById("root"));