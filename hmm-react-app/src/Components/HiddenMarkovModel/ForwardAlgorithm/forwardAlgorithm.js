import React, { useEffect, useState } from 'react';
import classes from './forwardAlgorithm.module.scss';
import {Link} from "react-router-dom";

import forwardAlgorithmBackgroundImage from '../../../Resources/Images/Backgrounds/bg2.png';

import * as utility from '../../Common/utility';

// --- COMPONENTS ---
import Subsection from '../../Common/Subsection/subsection';
import Vector from '../../Common/Vector/vector';
import Matrix from '../../Common/Matrix/matrix';
import BackButton from '../../Common/BackButton/backButton';
import HomeButton from '../../Common/HomeButton/homeButton';
import ExampleButtons from '../../Common/ExampleButtons/exampleButtons';
import VisualMatrix from '../../Common/VisualMatrix/visualMatrix';
import ImportantInfo from '../../Common/ImportantInfo/importantInfo';
import ExplanationOfTheFA from './ExplanationOfTheFA/explanationOfTheFA';
import MathematicalDerivation from './MathematicalDerivation/mathematicalDerivation';
import FAPseudoCode from './FAPseudoCode/FAPseudoCode';
import PlayAroundWithExamples from './PlayAroundWithExamples/playAroundWithExamples';

const ForwardAlgorithm = (props) => {
    const [weatherExampleSelected, setWeatherExampleSelected] = useState(false);
    const [exampleSubscript, setExampleSubscript] = useState("R");
    const [examplePi, setExamplePi] = useState(utility.runnerPiVector);
    const [exampleA, setExampleA] = useState(utility.runnerAMatrix);
    const [exampleB, setExampleB] = useState(utility.runnerBMatrix);
    const [exampleAlphaVector, setExampleAlphaVector] = useState(utility.runnerAlphaVector)
    const [exampleStatesImages, setExampleStatesImages] = useState(utility.runnerStatesImages);
    const [exampleObservationsImages, setExampleObservationsImages] = useState(utility.runnerObservationsImages);
    const [exampleObservationSequence, setExampleObservationSequence] = useState(utility.runnerObservationSequence);
    const [exampleAlphaSums, setExampleAlphaSums] = useState(utility.runnerAlphaSums);
    const [observationsSequenceInText, setObservationsSequenceInText] = useState(null);
    const [observationsSequenceInImages, setObservationsSequenceInImages] = useState(null);
    const [statesImagesInText, setStatesImagesInText] = useState(null);
    
    const numberOfDecimalsToShow = 4;


    const changeObservationSequenceInText = (_weatherExampleSelected) => {
        let _exampleObservationSequence = _weatherExampleSelected ? utility.runnerObservationSequence : utility.weatherObservationSequence;
        let _exampleObservationsImages = _weatherExampleSelected ? utility.runnerObservationsImages : utility.weatherObservationsImages ;
        let _exampleStatesImages = _weatherExampleSelected ? utility.runnerStatesImages : utility.weatherStatesImages;

        setObservationsSequenceInText(
            <mark> 
                {"{ "}
                    {_exampleObservationSequence.map((observationIndex, i) => {
                        if (i + 1 !== _exampleObservationSequence.length) {
                            return <span key={i}>{utility.O_black(observationIndex)}, </span>
                        } else {
                            return <span key={i}>{utility.O_black(observationIndex)} </span>
                        }
                        
                    })}
                {"}"}
            </mark>
        );

        setObservationsSequenceInImages (
            <mark> 
                {"{ "}
                    {_exampleObservationSequence.map((observationIndex, i) => {
                        if (i + 1 !== _exampleObservationSequence.length) {
                            return <div className="exampleImageInText" key={i}><img 
                                src={_exampleObservationsImages[observationIndex]} alt="Observation" />, </div>
                        } else {
                            return <div className="exampleImageInText" key={i}><img 
                                src={_exampleObservationsImages[observationIndex]} alt="Observation" /></div>
                        }
                    })}
                {"}"}
            </mark>
        );

        setStatesImagesInText (
            <mark> 
                {"{ "}
                    {_exampleStatesImages.map((image, i) => {
                        if (i + 1 !== _exampleStatesImages.length) {
                            return <div className="exampleImageInText" key={i}><img 
                                src={image} alt="Observation" />, </div>
                        } else {
                            return <div className="exampleImageInText" key={i}><img 
                                src={image} alt="Observation" /></div>
                        }
                    })}
                {"}"}
            </mark>
        );
    }

    const setVectorsForExamples = (_weatherExampleSelected) => {
        changeObservationSequenceInText(_weatherExampleSelected);

        if (!_weatherExampleSelected) {
            setExampleSubscript("W")
            setExamplePi(utility.weatherPiVector);
            setExampleA(utility.weatherAMatrix);
            setExampleB(utility.weatherBMatrix);
            setExampleStatesImages(utility.weatherStatesImages);
            setExampleObservationsImages(utility.weatherObservationsImages);
            setExampleObservationSequence(utility.weatherObservationSequence);
            setExampleAlphaVector(utility.weatherAlphaVector);
            setExampleAlphaSums(utility.weatherAlphaSums);
        } else {
            setExampleSubscript("R")
            setExamplePi(utility.runnerPiVector);
            setExampleA(utility.runnerAMatrix);
            setExampleB(utility.runnerBMatrix);
            setExampleStatesImages(utility.runnerStatesImages);
            setExampleObservationsImages(utility.runnerObservationsImages);
            setExampleObservationSequence(utility.runnerObservationSequence);
            setExampleAlphaVector(utility.runnerAlphaVector);
            setExampleAlphaSums(utility.runnerAlphaSums);
        }
    }

    const handleChangeActiveExample = () => {
        setVectorsForExamples(weatherExampleSelected);
        setWeatherExampleSelected(!weatherExampleSelected);
    }

    useEffect(() => {
        setVectorsForExamples(true);
        changeObservationSequenceInText(true);
    }, []);
    
    return (
        <div className={classes.ForwardAlgorithm}>
            <img src = {forwardAlgorithmBackgroundImage} className={classes.backgroundImage} alt="" />
            
            <HomeButton extraClass={classes.homeButton}/>
            <BackButton />

            <h1 style={window.innerWidth < 850 ? {"marginTop":"40px"} : null}>Forward Algorithm / α-pass</h1>

            <ExampleButtons 
                weatherExampleSelected={weatherExampleSelected} 
                handleChangeActiveExample={handleChangeActiveExample} 
            />

            <Subsection header = "About the Forward Algorithm" hideDefault={true}>
                <p>
                    The algoritm is used to solve problems in the category <b>evaluation/filtering</b>. That is, if we want to compute the
                    likelihood 𝑃( {utility.O("0:T-1")} | {utility.lambda("x")} ) = 𝑃( {utility.O("x")} | {utility.lambda("x")} ) = 𝑃( {utility.curlyLeft} {utility.O("0")}, {utility.O("1")}, ..., {utility.O("T-1")}
                    {utility.blankSpace}{utility.curlyRight} | {utility.lambda("x")} ). In other words, if we want to compute the likelihood of observing a specific sequence of observations given our {utility.lambda("x")}  = {utility.curlyLeft} {utility.A("x")}, {utility.B("x")}, {utility.pi("x")} {utility.curlyRight}.
                </p>
            </Subsection>

            <Subsection header = "Given information" hideDefault={true}>
                <p>
                    In order to perform the forward algorithm, we first need to know what model we should
                    use to make the evaluation. The currently selected example is the {weatherExampleSelected ? "weather" : "runner"} 
                    {utility.blankSpace}example and
                    is what we will use to illustrate the algorithm (you can change example in the top-right
                    corner). The {utility.lambda(exampleSubscript)} (where <mark className="pink">{exampleSubscript}</mark> stands for {weatherExampleSelected ? <><mark className="pink">W</mark>eather</> : <><mark className="pink">R</mark>unner</>}) 
                    for the weather example is presented below (if you haven't already
                    checked out how we got that specific {utility.lambda(exampleSubscript)}, I strongly encourage you to do so{utility.blankSpace}
                    <Link 
                        to="/hmm/theBasics/Examples"
                        className="linkStyle"
                    >here</Link>):
                </p>
                
                <Vector vectorName={utility.pi("i")} vector={examplePi} themeColor="green" />
                
                <Matrix matrixName={utility.a("i, j")} matrix={exampleA} themeColor="red" />
                
                <Matrix matrixName={utility.b("j, k")} matrix={exampleB} themeColor="blue" />

                <p>
                    To make things clear, here is two more figures to clarify how the transition matrix {utility.A(exampleSubscript)} and the observation matrix 
                    {utility.blankSpace}{utility.B(exampleSubscript)} should be interpreted:
                </p>

                <VisualMatrix 
                    matrixName={utility.A(exampleSubscript)}
                    matrix={exampleA}
                    horizontalImages={exampleStatesImages}
                    themeColor="red"
                    verticalImages={exampleStatesImages}
                    weatherExampleSelected = {weatherExampleSelected}
                />

                <VisualMatrix 
                    matrixName={utility.B(exampleSubscript)}
                    matrix={exampleB}
                    horizontalImages={exampleObservationsImages}
                    themeColor="blue"
                    verticalImages={exampleStatesImages}
                    weatherExampleSelected = {weatherExampleSelected}
                />

                <ImportantInfo>
                    Note that {utility.a("i, j")} = {utility.A("")} and that {utility.b("j, k")} = {utility.B("")}, it's only different notations. 
                </ImportantInfo>
                
                <div>
                    Besides knowing the {utility.lambda(exampleSubscript)}, we need to know what observations is made. In this example,
                    the made observations are {utility.O(exampleSubscript)} = {observationsSequenceInText} = {observationsSequenceInImages}. 
                    Also, remember that the states at every time step is hidden. That is, we can't observe the states {statesImagesInText}. 
                    However, we can calculate the probabilities of being in them. 
                </div>
            </Subsection>

            <Subsection header = "Information to find" hideDefault={true}>
                The goal of this algorithm is to find out what the likelihood is of observing a certain observation sequence, also called
                the emission sequence. That is, we want to calculate 𝑃( {utility.O(`0:${exampleObservationSequence.length - 1}`)} | {utility.lambda(exampleSubscript)} ) = 
                <br/> 𝑃( <span className={classes.oInText}>O</span> | {utility.lambda(exampleSubscript)} ) = 𝑃( {observationsSequenceInText} | {utility.lambda(exampleSubscript)} ) = 
                𝑃( {observationsSequenceInImages} | {utility.lambda(exampleSubscript)} ).
            </Subsection>
            
            <Subsection header = "Mathematical derivation"  hideDefault={true}>
                <MathematicalDerivation 
                    exampleSubscript = {exampleSubscript}
                    weatherExampleSelected = {weatherExampleSelected}
                    exampleA = {exampleA}
                    exampleObservationsImages = {exampleObservationsImages}
                    exampleObservationSequence = {exampleObservationSequence}
                    classes = {classes}
                />
            </Subsection>

            <Subsection header = "The Forward Algorithm / α-pass" hideDefault={true}>
                <ExplanationOfTheFA 
                    weatherExampleSelected = {weatherExampleSelected}
                    exampleA = {exampleA}
                    exampleB = {exampleB}
                    examplePi = {examplePi}
                    exampleStatesImages = {exampleStatesImages}
                    exampleObservationsImages = {exampleObservationsImages}
                    exampleAlphaVector = {exampleAlphaVector}
                    exampleAlphaSums = {exampleAlphaSums}
                    exampleObservationSequence = {exampleObservationSequence}
                    numberOfDecimalsToShow = {numberOfDecimalsToShow}
                    classes = {classes}
                    exampleSubscript = {exampleSubscript}
                    observationsSequenceInText = {observationsSequenceInText}
                    observationsSequenceInImages = {observationsSequenceInImages}
                />
            </Subsection>
        
            <Subsection 
                header = "Pseudo code for the forward algorithm / α-pass" 
                hideDefault={true}
                extraClass = {classes.pseudoCode}
            >
                <FAPseudoCode />
            </Subsection>

            <Subsection 
                header = "Play around with examples" 
                hideDefault={false}
                extraClass = {null}
                maxHeight = {1650}
            >
                <PlayAroundWithExamples />
            </Subsection>
        </div>
    );
}

export default ForwardAlgorithm;