import React, { Component } from "react";

class QuestionContainer extends Component {

    constructor() {
        super();
        this.selected = this.selected.bind(this);
        this.state = {
            questions: [],
            responses: 0
        };
    }

    selected(e) {
        this.setState({responses: this.state.responses + 1 })
        var buttonValue = e.target.innerHTML;
        var correct = e.target.getAttribute('data-correct')
        if (correct) {
            alert('correct answer!');
        }
    }

    componentDidMount() {
        const RenderHTMLQuestion = (props) => (<p dangerouslySetInnerHTML={{__html:props.HTML}}></p>)
        const RenderHTMLIncorrectAnswer = (props) => (<button onClick={this.selected} dangerouslySetInnerHTML={{__html:props.HTML}}></button>)
        const RenderHTMLCorrectAnswer = (props) => (<button onClick={this.selected} data-correct="true" dangerouslySetInnerHTML={{__html:props.HTML}}></button>)
        fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
            .then(results => {
                return results.json();
            }).then(data => {
                
                let questions = data.results.map((question, index) => {
                    return(
                        <div key={index} className="questionWrapper">
                            <div className="question" key={question.question}>
                                 <RenderHTMLQuestion HTML={question.question} />
                            </div>

                            <ul className="answers">
                                {question.incorrect_answers.map((answer, index) => {
                                    return ( <RenderHTMLIncorrectAnswer  correct={false} key={index} HTML={answer} />  )
                                })}
                                <RenderHTMLCorrectAnswer correct={true} value={question.correct_answer} key={question.correct_answer} HTML={question.correct_answer} /> 
                            </ul>
                        </div>
                    )
                })
                this.setState({questions: questions});
            })
            
        }
        

    render() {
        return (
            <div className="container2">
                {this.state.questions}
            </div>
        )
    }
}


export default QuestionContainer;