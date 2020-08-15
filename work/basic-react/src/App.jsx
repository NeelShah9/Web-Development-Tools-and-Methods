import React, {useState} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import Score from './components/Score';
import './style.css';
function App() {
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer]= useState('');
    const [answers, setAnswers] =useState([]);
    const [showResults, setShowResults]= useState(false);
    const [error, setError] = useState('');
    const [finalScore, setFinalScore] = useState(0);
   
    const questions = [
        {
            id: 1,
            question: 'What is the favorite food of Garfield?',
            answer_a:
                'Pasta',
            answer_b: 'Lasagna',
            answer_c:
                "Ravioli",
            answer_d: 'Spaghetti',
            correct_answer: 'b',
            
        },
        {
            id: 2,
            question: 'What does the Joker call Batman?',
            answer_a: 'Batsy',
            answer_b: 'Broody',
            answer_c: 'Masky',
            answer_d: 'Goth-Man',
            correct_answer: 'a',
            
        },
        {
            id: 3,
            question: 'What animal was the famous Walt Disney afraid of?',
            answer_a: 'Dogs',
            answer_b: 'Horses',
            answer_c: 'Mice',
            answer_d: 'Cats',
            correct_answer: 'c',
            
        },
    ];

    const question= questions[currentQuestion];
    
    

    const handleClick = e => {
        setCurrentAnswer(e.target.value);
        setError('');
    };

   const  renderError = () => {
        if(!error){
            return;
        }
        return <div className="error">{error}</div>
    };

    const checkScore = (question, answer) => {
        setFinalScore({ finalScore: (question.correct_answer === answer.answer)? finalScore.score + 1 : finalScore.score,})
    };

    const score= checkScore[finalScore];

    const renderResultMark = (question, answer) => {
        if(question.correct_answer === answer.answer) {
            
            return <span className="correct">  Correct</span>   
            
        }
        
        return <span className="failed">  Wrong</span>

    };

   
            


    const renderResultsData = () =>{
        return answers.map( answer => {
            const question = questions.find( question => question.id === answer.questionId);

            return(
                <>
                <div key={question.id}>{question.question} - {renderResultMark(question, answer)} </div>
                 <br/>
                </>
            );

        }

        );
    };

   

    const restart = () => {
        setAnswers([]);
        setCurrentAnswer('');
        setCurrentQuestion(0);
        setShowResults(false);
        
    }; 

    const next = () =>
    {
        const answer = {questionId:question.id, answer: currentAnswer};

        if(!currentAnswer){
            setError('please select an option');
            return;
        }
        answers.push(answer);
        setAnswers(answers);
        setCurrentAnswer('');

        if(currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion + 1);
            return;
        }

        setShowResults(true);

    };

   

    if(showResults){
        return(
            <div className="container results">
                <h2>Results</h2>
                <ul>{renderResultsData()}</ul> 
                < Score score={finalScore}></Score>
                <button className="btn btn-primary" onClick={restart}>Restart Game?</button>
            </div>
        )
    } else {

    return (
        <div className="container">
            <Progress total={questions.length} current = {currentQuestion + 1} />
            <Question question={question.question} />
               {renderError()}
            <Answers question={question} currentAnswer={currentAnswer} handleClick={handleClick} />
            <button className="btn btn-primary" onClick={next}>Next Question</button>
        </div>
    );
    }
    }

    
    export default App;