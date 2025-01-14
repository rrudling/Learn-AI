import React from 'react';

import BackButton from '../../Common/BackButton/backButton';
import classes from './theBasics.module.scss';

import theBasicsBackgroundImg from '../../../Resources/Images/Backgrounds/bg5_blur_dark.png';

import { Link } from 'react-router-dom';

import SectionCard from '../../Common/SectionCard/sectionCard';


const TheBasics = () => {
    return (
        <div style={{"textAlign":"center"}}>
            <h1>The Basics</h1>
            <BackButton />
            
            <div className={classes.sectionCardsContainer}>
                <Link to="/hmm/theBasics/theory">
                    <SectionCard 
                        backgroundImage={theBasicsBackgroundImg} 
                        title="Theory"
                    />
                </Link>

                <Link to="/hmm/theBasics/mathematicalConcepts">
                    <SectionCard 
                        backgroundImage={theBasicsBackgroundImg} 
                        title="Mathematical Concepts"
                    />
                </Link>

                <Link to="/hmm/theBasics/examples">
                    <SectionCard 
                        backgroundImage={theBasicsBackgroundImg} 
                        title="Examples"
                        inActive = {false}
                    />
                </Link>
            </div>
            
        </div>
    )
}

export default TheBasics;