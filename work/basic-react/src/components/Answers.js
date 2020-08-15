import React from 'react';
import Answer from './Answer';

function Answers(props){

    return(
        <>
            <Answer letter="a" answer={props.question.answer_a} selected={props.currentAnswer === 'a'} handleClick={props.handleClick} />
            <Answer letter="b" answer={props.question.answer_b} selected={props.currentAnswer === 'b'} handleClick={props.handleClick}/>
            <Answer letter="c" answer={props.question.answer_c} selected={props.currentAnswer === 'c'} handleClick={props.handleClick}/>
            <Answer letter="d" answer={props.question.answer_d} selected={props.currentAnswer === 'd'} handleClick={props.handleClick}/>
        </>
    );
}


export default Answers;