import {getOutcomeForBouncer} from "../shot-outcomes/Bouncer";
import {getOutcomeForDoosra} from "../shot-outcomes/Doosra";
import {getOutcomeForInswinger} from "../shot-outcomes/Inswinger";
import {getOutcomeForLegCutter} from "../shot-outcomes/LegCutter";
import {getOutcomeForOffBreak} from "../shot-outcomes/OffBreak";
import {getOutcomeForOffCutter} from "../shot-outcomes/OffCutter";
import {getOutcomeForOutswinger} from "../shot-outcomes/Outswinger";
import {getOutcomeForPace} from "../shot-outcomes/Pace";
import {getOutcomeForSlowerBall} from "../shot-outcomes/SlowerBall";
import {getOutcomeForYorker} from "../shot-outcomes/Yorker";
import appConstants from "../constants/app-constants.json";
import Wicket from "../commentary/Its a wicket.mp3";
import Single from "../commentary/Well Played for Single.mp3";
import Double from "../commentary/Excellent running.mp3";
import Four from "../commentary/Thats a four.mp3";
import Six from "../commentary/Massive Shot.mp3";
import Dot from "../commentary/No runs.mp3";
import {Howl} from "howler";

const audioClips = {
    "Wicket": Wicket,
    "Single": Single,
    "Double": Double,
    "Four": Four,
    "Six": Six,
    "Dot": Dot
}

const getAudioForTheShotResult = (shotResult) => {
    if(shotResult === "Wicket") {
        return "Wicket";
    } else if(shotResult === 1) {
        return "Single";
    } else if(shotResult === 2) {
        return "Double";
    } else if(shotResult === 4) {
        return "Four";
    } else if(shotResult === 6) {
        return "Six";
    } else if(shotResult === 0) {
        return "Dot";
    }
}

const getShotResult = (balltype, shotType, shotTiming) => {
    if(balltype === "Bouncer") {
        return getOutcomeForBouncer(shotType, shotTiming);
    } else if(balltype === "Inswinger") {
        return getOutcomeForInswinger(shotType, shotTiming);
    } else if(balltype === "Outswinger") {
        return getOutcomeForOutswinger(shotType, shotTiming);
    } else if(balltype === "Leg Cutter") {
        return getOutcomeForLegCutter(shotType, shotTiming);
    } else if(balltype === "Off Cutter") {
        return getOutcomeForOffCutter(shotType, shotTiming);
    } else if(balltype === "Slower Ball") {
        return getOutcomeForSlowerBall(shotType, shotTiming);
    } else if(balltype === "Yorker") {
        return getOutcomeForYorker(shotType, shotTiming);
    } else if(balltype === "Pace") {
        return getOutcomeForPace(shotType, shotTiming);
    } else if(balltype === "Off Break") {
        return getOutcomeForOffBreak(shotType, shotTiming);
    } else if(balltype === "Doosra") {
        return getOutcomeForDoosra(shotType, shotTiming);
    }
}

const playCommentary = (shotResult) => {
    const audioClip = getAudioForTheShotResult(shotResult);
    const sound = new Howl({
        src: [audioClips[audioClip]]
      });
      
    sound.play();
}

const getRandomTotalForSuperOver = (maxScore, minScore) => {
    return Math.floor(Math.random() * (maxScore - minScore + 1) + minScore);
}

const getRandomBowlingCardsForSuperOver = () => {
    let totalBowlingCards = appConstants["BowlingCards"];
    let randomBowlingCardsForSuperOver = "";
    let indexToPick;
    for(var i = 0; i < 6; i++) {
        indexToPick = Math.floor((Math.random() * 4) + 1);
        if(i===5) {
            randomBowlingCardsForSuperOver += totalBowlingCards[indexToPick];
        } else {
            randomBowlingCardsForSuperOver += totalBowlingCards[indexToPick] + ", ";
        }
        totalBowlingCards.splice(indexToPick,1);
    }
    return randomBowlingCardsForSuperOver;
}

export {
    getShotResult,
    playCommentary,
    getRandomTotalForSuperOver,
    getRandomBowlingCardsForSuperOver
}; 