import React, { Component } from "react";

class QuestionContainer extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            questions: [],
            total_responses: 0,
            correct_responses: 0
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
    };

    
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

    componentDidMount() {
        const RenderHTMLQuestion = (props) => (<p dangerouslySetInnerHTML={{__html:props.HTML}}></p>)
        const RenderHTMLIncorrectAnswer = (props) => (<button onClick={this.handleClick} data-correct="false" dangerouslySetInnerHTML={{__html:props.HTML}}></button>)
        const RenderHTMLCorrectAnswer = (props) => (<button onClick={this.handleClick} data-correct="true" dangerouslySetInnerHTML={{__html:props.HTML}}></button>)
        fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
            .then(results => {
                return results.json();
            }).then(data => {
                
                let questions = data.results.map((question, index) => {
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