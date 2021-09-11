import { IonButton, IonLabel, IonSelect, IonSelectOption, IonSpinner, useIonToast } from "@ionic/react";
import appConstants from "../constants/app-constants.json";
import GameOver from '../modals/GameOver';
import { getShotResult, playCommentary, getRandomBowlingCardsForSuperOver, getRandomTotalForSuperOver } from '../mixins/app-mixins.js';
import { useEffect, useState } from "react";

const MainActivity = props => {

    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState();
    const [showToast, dismiss] = useIonToast();
    const [countDown, setCountDown] = useState(3);
    const [ballType, setBallType] = useState("");
    const [shotType, setShotType] = useState("");
    const [startMatch, setStartMatch] = useState(false);
    const [autoPlaySuperOver, setAutoPlaySuperOver] = useState(false);
    const [shotTiming, setShotTiming] = useState("");
    const [maxWickets, setMaxWickets] = useState(10);
    const [isOneOverGame, setIsOneOverGame] = useState(false);
    const [showBothScoresInResult, setShowBothScoresInResult] = useState(false);

    useEffect(() => {
        if(props.totalOvers === "1") {
            setIsOneOverGame(true);
            setStartMatch(true);
            playSuperOver();
        } else {
            let timer = setTimeout(() => {
                if(countDown > 1) {
                    setCountDown(countDown - 1)
                } else if(countDown === 1) {
                    setCountDown("Let's GO!!");
                } else if(countDown === "Let's GO!!") {
                    setStartMatch(true);
                }
            }, 600);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[countDown]);

    useEffect(()=>{
        checkIfInningsEnded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.overs, props.balls, props.wickets]);

    const toastObject = (message, position, color, autoDismiss, duration) => {
        let toastObject = {};
        toastObject['message'] = message;
        toastObject['position'] = position;
        toastObject['color'] = color;
        if(autoDismiss) {
            toastObject['duration'] = duration;
        } else {
            toastObject['buttons'] = [{ text: 'hide', handler: () => dismiss() }];
        }
        return toastObject;
    }

    const areMandatoryInputsEntered = () => {
        if(!ballType || !shotType || !shotTiming) {
            showToast(toastObject('Select all the inputs','top', 'danger', true, 2000));
            return false;
        } else {
            return true;
        }
    }

    const playSuperOver = () => {
        props.setIsSuperOverAutoplaying(true);
        setAutoPlaySuperOver(true);
        let timer = setTimeout(() => {
            if(props.totalOvers !== "1") {
                setShowBothScoresInResult(true);
            }
            setAutoPlaySuperOver(false);
            setMaxWickets(2);
            props.setIsSuperOver(true);
            props.setTotalOvers(1);
            props.setBalls(0);
            props.setOvers(0);
            props.setScore(0);
            props.setWickets(0);
            props.setInnings("2nd Innings");
            props.setBattingTeam(props.secondInnings['teamName']);
            let randomTotalForSuperOver = getRandomTotalForSuperOver(5, 20);
            let bowlingCardsForSuperOver = getRandomBowlingCardsForSuperOver();
            props.setBowlingCardsForSuperOver(bowlingCardsForSuperOver);
            setBallType(((bowlingCardsForSuperOver.split(","))[props.balls]).trim());
            props.setFirstInnings(prevState => ({
                ...prevState,
                "total": randomTotalForSuperOver,
                "superOver":{
                    "total": randomTotalForSuperOver,
                    "wickets": 1
                }
            }));
        }, 6000);
        return () => clearTimeout(timer);
    }

    const clearScoreCardForFirstInnings = () => {
        if(!props.isSuperOver || props.isOneOverGame) {
            props.setFirstInnings(prevState => ({
                ...prevState,
                "total": props.score,
                "wickets": props.wickets,
                "balls":props.balls,
                "overs":props.overs,
                "regular":{
                    "total": props.score,
                    "wickets": props.wickets
                }
            }));
        } else {
            props.setFirstInnings(prevState => ({
                ...prevState,
                "total": props.score,
                "wickets": props.wickets,
                "balls":props.balls,
                "overs":props.overs,
                "superOver":{
                    "total": props.score,
                    "wickets": props.wickets
                }
            }));
        }
        props.setBalls(0);
        props.setOvers(0);
        props.setScore(0);
        props.setWickets(0);
        props.setInnings("2nd Innings");
        props.setBattingTeam(props.secondInnings['teamName']);
    }

    const clearScoreCardForSecondInnings = () => {
        if(!props.isSuperOver || props.isOneOverGame) {
            props.setSecondInnings(prevState => ({
                ...prevState,
                "total": props.score,
                "wickets": props.wickets,
                "balls":props.balls,
                "overs":props.overs,
                "regular":{
                    "total": props.score,
                    "wickets": props.wickets
                }
            }));
        } else {
            props.setSecondInnings(prevState => ({
                ...prevState,
                "total": props.score,
                "wickets": props.wickets,
                "balls":props.balls,
                "overs":props.overs,
                "superOver":{
                    "total": props.score,
                    "wickets": props.wickets
                }
            }));
        }
        props.setBalls(0);
        props.setOvers(0);
        props.setScore(0);
        props.setWickets(0);
    }

    const checkIfInningsEnded = () => {
        if(props.overs === parseInt(props.totalOvers)  && props.balls === 0) {
            if(props.innings === "1st Innings") {
                clearScoreCardForFirstInnings();
            } else if(props.innings === "2nd Innings") {
                clearScoreCardForSecondInnings();
            }
        } else if(props.wickets === maxWickets) {
            if(props.innings === "1st Innings") {
                clearScoreCardForFirstInnings();
            } else if(props.innings === "2nd Innings") {
                clearScoreCardForSecondInnings();
            }
        }
        if(props.innings === "2nd Innings") {
            if(props.score > props.firstInnings['total']) {
                props.setIsGameOver(true);
                if(props.isSuperOver) {
                    setResult(props.secondInnings['teamName']+" won the super over by "+(2-props.wickets)+" wickets!");
                } else {
                    setResult(props.secondInnings['teamName']+" won by "+(10-props.wickets)+" wickets!");
                }
                clearScoreCardForSecondInnings();
                setShowModal(true);
            } else if(props.wickets === maxWickets) {
                if(props.score === props.firstInnings['total']) {
                    clearScoreCardForSecondInnings();
                    playSuperOver();
                } else {
                    props.setIsGameOver(true);
                    if(props.isSuperOver) {
                        setResult(props.firstInnings['teamName']+" won the super over by "+(props.firstInnings['superOver']['total'] - props.score)+" runs!");
                    } else {
                        setResult(props.firstInnings['teamName']+" won by "+(props.firstInnings['total'] - props.score)+" runs!");
                    }
                    setShowModal(true);
                }
            } else if(props.overs === parseInt(props.totalOvers)  && props.balls === 0) {
                if(props.score === props.firstInnings['total']) {
                    clearScoreCardForSecondInnings();
                    playSuperOver();
                } else if (props.score < props.firstInnings['total']) {
                    props.setIsGameOver(true);
                    if(props.isSuperOver) {
                        setResult(props.firstInnings['teamName']+" won the super over by "+(props.firstInnings['superOver']['total'] - props.score)+" runs!");
                    } else {
                        setResult(props.firstInnings['teamName']+" won by "+(props.firstInnings['total'] - props.score)+" runs!");
                    }
                    setShowModal(true);
                }   
            }
        }
    }

    const playShot = async () => {
        if(areMandatoryInputsEntered()) {
            const shotResult = await getShotResult(ballType, shotType, shotTiming);
            playCommentary(shotResult);
            if(props.isSuperOver) {
                if(props.balls < 5) {
                    setBallType((((props.bowlingCardsForSuperOver).split(","))[props.balls+1]).trim());
                }
                if(shotResult === "Wicket") {
                    props.setWicketsAvailableForSuperOver(props.wicketsAvailableForSuperOver - 1);
                }
            }
            if(shotResult === "Wicket") {
                props.setWickets(props.wickets + 1);
            } else {
                props.setScore(props.score + shotResult);
            }
            if(props.balls === 5) {
                props.setBalls(0);
                props.setOvers(props.overs + 1);
            } else {
                props.setBalls(props.balls + 1);
            }
        }
    }

    return(
        (!startMatch)
        ? (
           <div>
                {countDown}
           </div>
        )
        : 
           (
               autoPlaySuperOver ?
                <div>
                    <center>
                        <IonSpinner color="tertiary" /><br/><br/>
                        <IonLabel>Autoplaying first innings of super over</IonLabel>
                    </center>
                </div>
                :
                <div>
                    <GameOver showModal={showModal} setShowModal={setShowModal} result={result} setResult={setResult}
                     firstInnings={props.firstInnings} secondInnings={props.secondInnings} isSuperOver={props.isSuperOver} 
                     showBothScoresInResult={showBothScoresInResult} isOneOverGame={isOneOverGame} />
                    <IonSelect value={ballType} disabled={props.isSuperOver} selectedText={ballType} interface="popover" placeholder="Ball Type" onIonChange={e=>setBallType(e.detail.value)} >
                        {
                            appConstants['BowlingCards'].map((ball, index) => {
                                return(
                                    <IonSelectOption key={index} value={ball}>{ball}</IonSelectOption>
                                )
                            })
                        }
                    </IonSelect>
                    <IonSelect value={shotType} interface="popover" placeholder="Shot Type" onIonChange={e=>setShotType(e.detail.value)} >
                        {
                            appConstants['BattingCards'].map((shot, index) => {
                                return(
                                    <IonSelectOption key={index} value={shot}>{shot}</IonSelectOption>
                                )
                            })
                        }
                    </IonSelect>
                    <IonSelect value={shotTiming} interface="popover" placeholder="Shot Timing" onIonChange={e=>setShotTiming(e.detail.value)} >
                        {
                            appConstants['ShotTimings'].map((timing, index) => {
                                return(
                                    <IonSelectOption key={index} value={timing}>{timing}</IonSelectOption>
                                )
                            })
                        }
                    </IonSelect>
                    <br/>
                    <center>
                        <IonButton color="tertiary" onClick={playShot}>Play Shot!!</IonButton>
                    </center>
                </div>
           )
    );

}

export default MainActivity;