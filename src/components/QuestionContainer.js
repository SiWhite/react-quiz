import React, { Component } from "react";

class QuestionContainer extends Component {

   shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }

    constructor() {
        super();
        this.state = {
            questions: [],
            incorrect_answers: []
        };
    }

    componentWillMount() {
        const RenderHTMLQuestion = (props) => (<p dangerouslySetInnerHTML={{__html:props.HTML}}></p>)
        const RenderHTMLAnswer = (props) => (<li dangerouslySetInnerHTML={{__html:props.HTML}}></li>)
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
                                <RenderHTMLAnswer key={question.correct_answer} HTML={question.correct_answer} />
                             
                               {question.incorrect_answers.map((answer, index) => (
                                    <RenderHTMLAnswer key={index} HTML={answer} />
                                ))}
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