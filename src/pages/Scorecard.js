import { IonCard, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonToolbar } from "@ionic/react";
import MainActivity from "../components/MainActivity";
import { closeCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const ScoreCard = () => {

    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [balls, setBalls] = useState(0);
    const [isSuperOverAutoplaying, setIsSuperOverAutoplaying] = useState(false);
    const [bowlingCardsForSuperOver, setBowlingCardsForSuperOver] = useState();
    const [wicketsAvailableForSuperOver, setWicketsAvailableForSuperOver] = useState(2);
    const [isSuperOver, setIsSuperOver] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [totalOvers, setTotalOvers] =  useState();
    const [tossWonByTeam, setTossWonByTeam] = useState();
    const [batOrBowl, setBatOrBowl] = useState();
    const [innings, setInnings] = useState("1st Innings");
    const [battingTeam, setBattingTeam] = useState(localStorage.getItem("teamOne"));
    const [firstInnings, setFirstInnings] = useState({
                                                "teamName":localStorage.getItem("teamOne"),
                                                "total":0,
                                                "wickets":0,
                                                "balls":0,
                                                "overs":0,
                                                "superOver":{
                                                    "total":0,
                                                    "wickets":1
                                                },
                                                "regular":{
                                                    "total":0,
                                                    "wickets":0
                                                }
                                            });
    const [secondInnings, setSecondInnings] = useState({
                                                    "teamName":localStorage.getItem("teamTwo"),
                                                    "total":0,
                                                    "wickets":0,
                                                    "balls":0,
                                                    "overs":0,
                                                    "superOver":{
                                                        "total":0,
                                                        "wickets":0
                                                    },
                                                    "regular":{
                                                        "total":0,
                                                        "wickets":0
                                                    }
                                                });
    const history = useHistory();

    useEffect(() => {
        setTotalOvers(localStorage.getItem("totalOvers"));
        setTossWonByTeam(localStorage.getItem("tossWonByTeam"));
        setBatOrBowl(localStorage.getItem("batOrBowl"));
    },[]);

    const endMatch = () => {
        history.push("/");
        window.location.reload();
    }

    return(
        
        <IonPage hidden={isGameOver}>
            <IonHeader>
                <IonToolbar>
                    <IonRow>
                        <IonCol>
                            <IonChip outline color="warning">
                                <IonLabel>{battingTeam}  :  {score+"/"+wickets} ({overs}.{balls})</IonLabel>
                            </IonChip>
                        </IonCol>
                        <IonCol hidden={!isSuperOverAutoplaying}>
                            <center>
                                <IonChip color="warning">
                                    <h2 style={{color:"gold"}}>SUPER OVER</h2>
                                </IonChip>
                            </center>
                        </IonCol>
                        <IonCol hidden={!(overs === 0 && balls === 0 && innings==="1st Innings")}>
                            <center>
                                <IonChip color="success">
                                    <IonLabel>{tossWonByTeam} won the random toss and chose to {batOrBowl}</IonLabel>
                                </IonChip>
                            </center>
                        </IonCol>
                        <IonCol style={{textAlign:"right"}}>
                            <IonChip outline color="warning">
                                <IonLabel>{innings}</IonLabel>
                            </IonChip>
                            <IonChip outline color="warning">
                                <IonLabel>Total Overs : {totalOvers}</IonLabel>
                            </IonChip>
                            <IonChip color="warning">
                                <IonIcon icon={closeCircleOutline} size="large" onClick={endMatch} class="pointer"></IonIcon>
                            </IonChip>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRow style={{"marginTop":"2%"}} hidden={(innings === "1st Innings") || isSuperOverAutoplaying}>
                    <IonCol>
                        <center>
                            <IonChip outline color="success">
                                <IonLabel>Target : {firstInnings['total'] + 1} ({firstInnings['teamName']} scored {firstInnings['total']}/{firstInnings['wickets']} in {firstInnings['overs']}.{firstInnings['balls']} overs)</IonLabel>
                            </IonChip>
                        </center>
                    </IonCol>
                </IonRow>
                <IonRow style={{"marginTop":"2%"}} hidden={!isSuperOver}>
                    <IonCol>
                        <center>
                            <IonChip style={{"display": "inline-table", "textAlign":"left"}}  color="success">
                                <br/>
                                <IonLabel>Bowling Cards : {bowlingCardsForSuperOver}</IonLabel><br/><br/>
                                <IonLabel>{firstInnings['teamName']} Score : {firstInnings['total']} runs (Target runs : {firstInnings['total'] + 1}) </IonLabel><br/><br/>
                                <IonLabel>Wickets available : {wicketsAvailableForSuperOver}</IonLabel>
                                <br/><br/>
                            </IonChip>
                        </center>
                    </IonCol>
                </IonRow>
                <IonRow style={{"marginTop":"9%"}}>
                    <IonCol size-sm="1" size-xs="1" size-md="2" size-lg="4"></IonCol>
                    <IonCol>
                        <IonCard className="mainActivity">
                            <MainActivity overs={overs} setOvers={setOvers} totalOvers={totalOvers} 
                            setTotalOvers={setTotalOvers} balls={balls} setBalls={setBalls}
                            wickets={wickets} setWickets={setWickets} score={score} setScore={setScore} innings={innings}
                            setInnings={setInnings} firstInnings={firstInnings} setFirstInnings={setFirstInnings} 
                            secondInnings={secondInnings} setSecondInnings={setSecondInnings} setBattingTeam={setBattingTeam}
                            isSuperOver={isSuperOver} setIsSuperOver={setIsSuperOver} bowlingCardsForSuperOver={bowlingCardsForSuperOver}
                            setBowlingCardsForSuperOver={setBowlingCardsForSuperOver} wicketsAvailableForSuperOver={wicketsAvailableForSuperOver}
                            setWicketsAvailableForSuperOver= {setWicketsAvailableForSuperOver} isSuperOverAutoplaying={isSuperOverAutoplaying} 
                            setIsSuperOverAutoplaying={setIsSuperOverAutoplaying} isGameOver={isGameOver} setIsGameOver={setIsGameOver} />
                        </IonCard>
                    </IonCol>
                    <IonCol size-sm="1" size-xs="1" size-md="2" size-lg="4"></IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
}

export default ScoreCard;