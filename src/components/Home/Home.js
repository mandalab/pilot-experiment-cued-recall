import React from 'react';

import './Home.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { NetlifyForm } from 'react-netlify-forms'

export default function Home() {

    const [currentState, setCurrentState] = React.useState(0);
    const [wordFix, setWordFix] = React.useState(0);
    const [answer, setAnswer] = React.useState("");
    const [practiceNum1, setPracticeNum1] = React.useState(0);
    const [practiceNum2, setPracticeNum2] = React.useState(0);
    const [text, setText] = React.useState("");
    const [index, setIndex] = React.useState(0);

    const [responses, setResponses] = React.useState([]);
    const [mathResponses, setMathResponses] = React.useState([]);
    const [mathQuestions, setMathQuestions] = React.useState([]);
    
    const practiceWord1 = "चींटी"
    const practiceWord2 = "बैंक"

    const realPractice1 = new Array('चींटी', 'बंदर', 'जहाज', 'हाथ', 'कुल्हाड़ी', 'बिल्ला', 'थैला', 'गेंद', 'बैंड', 'जूता', 'कटोरा', 'डिब्बा');
    const realPractice2 = new Array('बैंक', 'खलिहान', 'बल्ला', 'स्नान', 'सागरतट', 'चोंच', 'सेम', 'भालू', 'बिस्तर', 'बादल', 'विदूषक', 'सिक्का');
    
    const probes = new Array('चींटी','खलिहान','बल्ला','हाथ','कुल्हाड़ी','चोंच','थैला','भालू','बैंड', 'जूता', 'विदूषक', 'डिब्बा');
    const targets = new Array('बैंक','बंदर','जहाज','स्नान','सागरतट','बिल्ला','सेम','गेंद','बिस्तर', 'बादल', 'कटोरा', 'सिक्का');
    
    const items = Array.from({ length: 6 }, (_, index) => index + 1);
    
    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleKeyPress = event => {
        const { key, keyCode } = event;
        const value = key.length === 1 ? key : String.fromCharCode(keyCode);

        if(keyCode>=48 && keyCode<=57){
            setAnswer((prevInputValue) => prevInputValue + value)
        }
        
    };

    React.useEffect(() => {
        setPracticeNum1(randomNumberInRange(1, 9))
        setPracticeNum2(randomNumberInRange(1, 9))

        // Add the event listener to the window object
        window.addEventListener("keypress", handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    // 0 - Home
    // 1 - Task Instructions
    // 2 - Practice Instructions
    // 3 - Practice Study Phase
    // 4 - Practice Distractor
    // 5 - Practice Recall Phase
    // 6 - Practice Correct Phase
    // 7 - Real Task Study Phase
    // 8 - Real Distractor
    // 9 - Real Recall Phase 1
    // 10 - Real Task Introduction 2
    // 11 - Real Study Phase 2
    // 12 - Real Distractor
    // 13 - Real Recall Phase 2

    const delay = ms => new Promise(res => setTimeout(res, ms));

    React.useEffect(() => {
        setMathQuestions(oldArray => [...oldArray, practiceNum1+"+"+practiceNum2]);
        setMathResponses(oldArray => [...oldArray, answer]);
        setAnswer("")
    }, [practiceNum2])

    React.useEffect(() => {
        async function updateCurrent() {
            if(currentState === 3){
                await delay(4000);
                setWordFix(1);
    
                await delay(500);
                setCurrentState(currentState+1)
                setWordFix(0);
            }
            if(currentState === 4){
                await delay(5500);
                setCurrentState(currentState+1)
            }
            if(currentState === 11){
                setIndex(6)
            }
            if(currentState === 7 || currentState === 11){
                for(var i = 0; i<5; i++){
                    await delay(4000);
                    setWordFix(1);
        
                    await delay(500);
                    setWordFix(0);
                    setIndex((previous) => previous + 1)
                }
                await delay(4000);
                setWordFix(1);
    
                await delay(500);
                setWordFix(0);
                setCurrentState(currentState+1)
                setIndex(0)
            }
            if(currentState === 8 || currentState === 12){
                
                await setPracticeNum1(randomNumberInRange(1, 9))
                await setPracticeNum2(randomNumberInRange(1, 9))
                await delay(5000)

                await setPracticeNum1(randomNumberInRange(1, 9))
                await setPracticeNum2(randomNumberInRange(1, 9))
                await delay(5000)

                
                await setPracticeNum1(randomNumberInRange(1, 9))
                await setPracticeNum2(randomNumberInRange(1, 9))
                await delay(5000)

                
                await setPracticeNum1(randomNumberInRange(1, 9))
                await setPracticeNum2(randomNumberInRange(1, 9))
                await delay(5000)

                
                await setPracticeNum1(randomNumberInRange(1, 9))
                await setPracticeNum2(randomNumberInRange(1, 9))
                await delay(5000)

                setCurrentState(currentState+1)

            }
            if(currentState === 13){
                setMathResponses(oldArray => [...oldArray, answer]);
            }
            if(currentState === 15){
                console.log(responses);
                console.log(mathQuestions);
                console.log(mathResponses)
            }
        }
        updateCurrent();
        
    }, [currentState]);

    const forwardState = () => {
        setCurrentState(currentState+1);
    }

    const backwardState = () => {
        setCurrentState(currentState-1);
    }

    const nextWordRecall = () => {

        if(currentState == 5){
            setResponses(oldArray => [...oldArray, text]);
            setText("")
            setCurrentState(currentState+1);
        }
        else{
            if (index >= 5){
                setCurrentState(currentState+1);
                setText("")
            }
    
            setIndex(index+1)
            setResponses(oldArray => [...oldArray, text]);
            setText("");
        }
        
    }

    return (
        <>
            <div className='instructions'>
            <div>
                <div className="progress-bar" style={{ width: `${currentState*6.667}%` }}></div>
            </div>
                <p>
                    {currentState === 0 ? 
                    <>
                        This is a multi-part experiment on word memory. <br/>
                        First, you will have a <b>practice example</b> with <b>1 word pair</b>. <br/> 
                        This will take approximately <b> 5 minutes </b>. <br/>
                        This experiment works for users of Google Chrome, Safari, and Firefox (we do not support Internet Explorer). <br/> <br/>
                        Please only participate if <b>Hindi</b> is your native language.
                        <br/><br/>
                        <Button variant="success" onClick={() => forwardState()}>Proceed</Button>{' '}
                    </> : ""}

                    {currentState === 1 ? 
                    <>
                        <b>Task Instructions: </b> Stepwise instructions will be shown here. Please press the start button below to start the experiment. <br/><br/>
                        <div className='text-center'>
                            <Button variant="secondary" onClick={() => backwardState()}>Go Back</Button>{' '}
                            <Button variant="warning" onClick={() => forwardState()}>Start</Button>{' '}
                        </div>
                    </> : ""}

                    {currentState === 2 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> Stepwise instructions will be shown here. <br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='text-center'>
                        We will start off with a practice of all parts of the task with an example.
                        <br/><br/>    
                        First, you will have to memorize the upcoming pair of words. You will have 4 seconds.
                        <br/><br/>
                    
                        <Button variant="secondary" onClick={() => backwardState()}>Go Back</Button>{' '}
                        <Button variant="success" onClick={() => forwardState()}>Continue</Button>{' '}
                    </div>
                    </> : ""}

                    {currentState === 3 ? 
                    <>
                    <div className='subtitle text-center'>
                    {wordFix === 0 ?  <><b>Task Instructions: </b> Study these word pairs <br/><br/> </> : "" }
                    </div>
                    <br/> <br/>
                    <div className='word-container text-center'>
                        {wordFix === 0 ? 
                        <>
                            <div className='word my-3'>{practiceWord1}</div>
                            <div className='word my-3'>{practiceWord2}</div> 
                        </> : "+" }
                    </div>
                    </> : ""}

                    {currentState === 4 || currentState === 8 || currentState === 12 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> You will see some simple math problems. Please type the correct answer within 5 seconds of it coming on. <br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='word-container text-center'>
                        {practiceNum1} + {practiceNum2} = {answer}
                    </div>
                    </> : ""}

                    {currentState === 5 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> Try your best to recall the paired word (leave the box empty if you do not remember. Do not worry about the spelling of the Hindi word, try to get it as close as possible.).
                         Type the word in the input box and select the closest word.<br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='word-container text-center'>
                        <div className='word-container text-center'>
                        <>
                            <div className='word my-3'>{practiceWord2}</div>
                        </>
                        
                    </div>
                    </div>
                    <div className="text-center">
                        <ReactTransliterate
                            value={text}
                            onChangeText={(text) => {
                                setText(text);
                            }}
                            lang="hi"
                        />
                        <br/>
                        <Button variant="success" onClick={() => nextWordRecall()}>Proceed</Button>{' '}
                    </div>
                    </> : ""}

                    {currentState === 6 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> You just completed the practice phase! We will move on to the real task now. ou will now learn 6 word pairs at a time instead of 1. When you're ready, click on Proceed.<br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='text-center'>
                        <div className='text-center'>
                        <>
                            Correct Answer: <b>{practiceWord1}</b> <br/>
                            Your Answer: <b>{responses[0]}</b>
                        </> <br/> <br/>
                        <Button variant="success" onClick={() => forwardState()}>Proceed</Button>{' '}
                    </div>
                    </div>
                    </> : ""}
                    
                    {currentState === 7  || currentState === 11? 
                    <>
                    <div className='subtitle text-center'>
                    {wordFix === 0 ?  <><b>Task Instructions: </b> You will now study a NEW set of word pairs. Study these word pairs <br/><br/> </> : "" }
                    </div>
                    <br/> <br/>
                    <div className='word-container text-center'>
                        {wordFix === 0 ? 
                        <>
                            <div className='word my-3'>{realPractice1[index]}</div>
                            <div className='word my-3'>{realPractice2[index]}</div> 
                        </> : "+" }
                    </div>
                    </> : ""}

                    {currentState === 9 || currentState === 13 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> You will see one word at a time from the words you studied - type the other word that was paired with it and then click on Continue. If you do not remember, leave the box empty.<br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='word-container text-center'>
                        <div className='word-container text-center'>
                        {currentState === 13 ? <div className='word my-3'>{probes[index+6]}</div> : <div className='word my-3'>{probes[index]}</div>}
                    </div>
                    </div>
                    <div className="text-center">
                        <ReactTransliterate
                            value={text}
                            onChangeText={(text) => {
                                setText(text);
                            }}
                            lang="hi"
                        />
                        <br/>
                        <Button variant="success" onClick={() => nextWordRecall()}>Continue</Button>{' '}
                    </div>
                    </> : ""}

                    {currentState === 10 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> Now, we will show you what the correct word pairs were. After this, you will need to go through one last set of words. When you're ready, click on Proceed.<br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='text-center'>
                        {items.map((item, i) => (
                            <>
                            Correct Answer: <b>{targets[i]}</b> &nbsp;
                            Your Answer: <b>{responses[i+1]}</b> <hr/>
                            </>
                        ))}
                         <br/> <br/>
                        <Button variant="success" onClick={() => forwardState()}>Proceed</Button>{' '}
                    
                    </div>
                    </> : ""}

                    {currentState === 14 ? 
                    <>
                    <div className='subtitle text-center'>
                        <b>Task Instructions: </b> Now, we will show you what the correct word pairs were. When you're done, click on Proceed.<br/><br/>
                    </div>
                    <br/> <br/>
                    <div className='text-center'>
                        {items.map((item, i) => (
                            <>
                            Correct Answer: <b>{targets[i+6]}</b> &nbsp;
                            Your Answer: <b>{responses[i+7]}</b> <hr/>
                            </>
                        ))}
                         <br/> <br/>
                        <Button variant="success" onClick={() => forwardState()}>Proceed</Button>{' '}
                    
                    </div>
                    </> : ""}

                    {currentState === 15 ? 
                    <form name="info" netlify>
                        Thank you for completing the experiment. Please note that your submission will only be counted once you submit this form. Please provide the following demographic information for reporting purposes.
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Gender" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Age" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>What is/are the language(s) you are proficient in? (If multiple, seperate with commas)</Form.Label>
                            <Form.Control type="text" placeholder="Enter Languages" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Highest Level of Education (or Currently Pursuing) </Form.Label>
                            <Form.Control type="text" placeholder="Highest Level of Education" />
                            <Form.Text className="text-muted">
                            We'll never share your information with anyone else.
                            </Form.Text>
                        </Form.Group>

                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </form>
                    : ""}
                    
                </p>
            </div>
        </>
    );
}