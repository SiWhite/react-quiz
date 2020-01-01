import React, { Component } from "react";

class QuestionContainer extends Component {

    constructor() {
        super();
        this.state = {
            questions: [],
        };
    }

    getAnswerLists = () => {
        const answerLists = document.getElementById('quizContainer').getElementsByClassName('answers');
        
        for(let i = 0; i < answerLists.length; i++) {
            const answers = answerLists[i].getElementsByTagName("li");
            let answersArray = [];
            for(let j = 0; j < answers.length; j++) {
                answersArray.push(answers[j]);
            }
            this.shuffleArray(answersArray);
            answerLists[i].innerHTML = '';
            for (let a of answersArray) {
                answerLists[i].appendChild(a);
              }
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    showSpinner() {
        const spinner = document.getElementById("spinner");
        spinner.classList.add('show');
        setTimeout(() => {
            spinner.classList.remove('show');
        }, 5000);
    }

    hideSpinner() {
        const spinner = document.getElementById("spinner");
        const submitBtn = document.getElementById("btn-submit");
        spinner.classList.remove('show');
        submitBtn.classList.add('show');
    }

    componentDidMount() {
        this.showSpinner();
        const RenderHTMLQuestion = (props) => (<p dangerouslySetInnerHTML={{__html:props.HTML}}></p>)
        const RenderHTMLIncorrectAnswer = (props) => (<button onClick={this.props.handleClick} data-correct="false" dangerouslySetInnerHTML={{__html:props.HTML}}></button>)
        const RenderHTMLCorrectAnswer = (props) => (<button onClick={this.props.handleClick} data-correct="true" dangerouslySetInnerHTML={{__html:props.HTML}}></button>)
        fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
            .then(results => {
                return results.json();
            }).then(data => {
                this.hideSpinner()
                let questions = data.results.map((question, index) => {
                    question["isAnswered"] = false;
                    console.log(question);
                    return(
                        <div key={index} className="questionWrapper" id={index}>
                            <div className="question" key={question.question}>
                                 <RenderHTMLQuestion HTML={question.question} />
                            </div>

                            <ul className="answers">
                                
                                {question.incorrect_answers.map((answer, index) => {
                                    return ( <li key={answer}><RenderHTMLIncorrectAnswer key={answer} HTML={answer} /></li>  )
                                })}
                                
                                <li>
                                    <RenderHTMLCorrectAnswer key={question.correct_answer} HTML={question.correct_answer} /> 
                                </li>
                            </ul>
                        </div>
                    )
                }
                )
                this.setState({questions: questions});
                this.getAnswerLists();
            })
        }

        render() {
            return (
                <div className="container2" id="quizContainer">
                    {this.state.questions}
                </div>
            )
        }
}


export default QuestionContainer;