import React, { Component } from "react";
import _ from 'lodash';

class QuestionContainer extends Component {

    constructor() {
        super();
        this.state = {
            questions: [],
            incorrect_answers: []
        };
    }

    componentDidMount() {
        const RenderHTMLQuestion = (props) => (<p dangerouslySetInnerHTML={{__html:props.HTML}}></p>)
        const RenderHTMLAnswer = (props) => (<li dangerouslySetInnerHTML={{__html:props.HTML}}></li>)
        fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
            .then(results => {
                return results.json();
            }).then(data => {
                
                // let questions = data.results.map((question, index) => {
                //     return(
                //         <div key={index} className="questionWrapper">
                //             <div className="question" key={question.question}>
                //                  <RenderHTMLQuestion HTML={question.question} />
                //             </div>

                //             <ul className="answers">
                //                 {question.incorrect_answers.map((answer, index) => {
                //                     let correctAnswer = false;
                //                     if(Math.floor(Math.random() * question.incorrect_answers.length-1) === index && !correctAnswer) {
                //                             correctAnswer = true;
                //                             return <> <RenderHTMLAnswer key={question.correct_answer} HTML={"correct " + question.correct_answer} /> <RenderHTMLAnswer key={index} HTML={"incorrect " + answer} /> </>
                //                     } else {
                //                         return <RenderHTMLAnswer key={index} HTML={"incorrect " + answer} />
                //                     }
                //                 })}
                //             </ul>
                //         </div>
                //     )
                // })

                let questions = data.results.map((question, index) => {
                    question.incorrect_answers.splice(Math.floor(Math.random() * Math.floor(question.incorrect_answers.length + 1)), 0, question.correct_answer)
                    return (
                      <div key={index} className="questionWrapper">
                        <div className="question" key={question.question}>
                            <RenderHTMLQuestion HTML={question.question} />
                        </div>
                        <ul className="answers">
                          {question.incorrect_answers.map((answer, index) => { 
                              return <RenderHTMLAnswer key={index} HTML={answer} />
                          })}
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