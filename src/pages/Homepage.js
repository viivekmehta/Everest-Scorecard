import { useHistory } from "react-router";
import appConstants from '../constants/app-constants.json';
const { IonPage, IonContent, IonCard, IonCardContent, IonRow, IonCol, IonSelect, IonSelectOption, IonLabel, IonButton, IonHeader, IonToolbar, IonChip, useIonToast } = require("@ionic/react");
const { useState, useEffect } = require("react");

const Homepage = () => {

    const [showToast, dismiss] = useIonToast();
    const [totalOvers, setTotalOvers] = useState();
    const [tossWonByTeam, setTossWonByTeam] = useState();
    const [batOrBowl,setBatOrBowl] = useState("");
    const history = useHistory();

    useEffect(()=> {
        if(Math.floor((Math.random() * 2) + 1) === 1) {
            setTossWonByTeam("Ind XI");
        } else {
            setTossWonByTeam("Aus XI");
        }
    },[]);

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
        if(!batOrBowl || !totalOvers) {
            showToast(toastObject('Select all the inputs','top', 'danger', true, 2000));
            return false;
        } else {
            return true;
        }
    }

    const startMatch = () => {
        if(areMandatoryInputsEntered()) {
            if(tossWonByTeam === "Ind XI") {
                if(batOrBowl === "Bat") {
                    localStorage.setItem("teamOne","Ind XI");
                    localStorage.setItem("teamTwo","Aus XI");
                } else {
                    localStorage.setItem("teamOne","Aus XI");
                    localStorage.setItem("teamTwo","Ind XI");
                }
            } else {
                if(batOrBowl === "Bat") {
                    localStorage.setItem("teamOne","Aus XI");
                    localStorage.setItem("teamTwo","Ind XI");
                } else {
                    localStorage.setItem("teamOne","Ind XI");
                    localStorage.setItem("teamTwo","Aus XI");
                }
            }
            localStorage.setItem("tossWonByTeam",tossWonByTeam);
            localStorage.setItem("batOrBowl",batOrBowl);
            localStorage.setItem("totalOvers",totalOvers);
            history.push('/scorecard');
        }
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <center>
                        <h2>CricSummit 2021 - Ind XI vs Aus XI</h2>
                    </center>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <br/>
                <IonRow>
                    <IonCol>
                        <center>
                            <IonChip outline color="warning">
                                <IonLabel>{tossWonByTeam} won the random toss. Select Bat/Bowl below.</IonLabel>
                            </IonChip>
                        </center>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size-sm="1" size-xs="1" size-md="2" size-lg="4"></IonCol>
                    <IonCol>
                        <IonCard>
                            <IonCardContent>
                                <IonRow>
                                    <IonCol>
                                        <IonLabel>Bat/Bowl</IonLabel>
                                    </IonCol>
                                    <IonCol>
                                        <IonSelect value={batOrBowl} interface="popover" placeholder="Bat/Bowl" onIonChange={e=>setBatOrBowl(e.detail.value)} > 
                                            <IonSelectOption value="Bat">Bat</IonSelectOption>
                                            <IonSelectOption value="Bowl">Bowl</IonSelectOption>
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonLabel>Overs</IonLabel>
                                    </IonCol>
                                    <IonCol>
                                        <IonSelect value={totalOvers} interface="popover" placeholder="Slect Overs" onIonChange={e=>setTotalOvers(e.detail.value)} >
                                            {
                                                appConstants['Overs'].map((over, index) => {
                                                    return(
                                                        <IonSelectOption value={over.value}>{over.label}</IonSelectOption>
                                                    )
                                                })
                                            }
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className="ion-text-center">
                                        <IonButton color="tertiary" onClick={startMatch}>Lets GO!!</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol size-sm="1" size-xs="1" size-md="2" size-lg="4"></IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
}

export default Homepage;