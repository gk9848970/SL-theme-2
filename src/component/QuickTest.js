import React, { useState, useEffect } from 'react'
import Link from './Link';
import * as api from '../Api';
import ReactGA from 'react-ga';
function QuickTest({id}) {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [test, setTest] = useState(" ");

	const handleAnswerOptionClick = (isCorrect) => {
		ReactGA.event({
            category:"Quick test button",
            action:"Student select answer",
            label:"Quick test Student select answer"
        })
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	
	useEffect(() => {
        api.fetchBasicQuestion(id)
            .then((data) => {
                if (data.status === "Success") {
                    setTest(data.response);
					console.log('test',data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
		},[]);
	
	return (
			<div style={{marginTop:'10%'}}>
				<h1 className="text-center">Test Your Knowledge</h1>
				<div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
					<div className='app' style={{backgroundColor: '#C8C8C8',
								width: '450px',
								minHeight: '200px',
								height: 'min-content',
								borderRadius: '15px',
								padding: '20px',
								boxShadow: '10px 10px 42px 0px rgba(0, 0, 0, 0.75)',
								display: 'flex',
								justifyContent: 'space-evenly'}}>
						<div className='body'>
							{showScore ? (
							<div className='score-section' style={{display: 'flex',
								fontSize: '24px',
								alignItems: 'center',
								marginTop:'30px'}} >
								You scored {score} out of {questions.length}
								{/* {
									if({score} == {questions.length})
									{	
										return (<Link href="/">
												<button className="btn costumButton ">Okh</button>
											</Link>)
									}
									else{
										return(<Link href="/contact">
												<button className="btn costumButton ">Okh</button>
										</Link>)
									}
								} */}
							</div>
						) : (
							<div >
								<div className='question-section' style={{width: '100%', position: 'relative'}}>
									<div className='question-count' style={{marginBottom:'20px'}}>
										<span>Question {currentQuestion + 1}</span>/{questions.length}
									</div>
									<div className='question-text' style={{marginBottom:'12px'}}>{questions[currentQuestion].questionText}</div>
								</div>
								<div className='answer-section' style={{width:'100%', display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
									{questions[currentQuestion].answerOptions.map((answerOption) => (
										<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} style={{width:'100%', fontSize:'16px', color:'#ffffff', backgroundColor:'#DCDCDC', borderRadius:'15px',marginBottom:"20px", display:'flex', padding:'10px', justifyContent:'flex-start', alignItem:'center', cursor: 'pointer'}} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
									))}
								</div>
							</div>
						)}
						</div>
					</div>
				</div>
				</div>

		)
}

export default QuickTest
