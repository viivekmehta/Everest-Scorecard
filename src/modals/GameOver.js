import { IonButton, IonContent, IonModal } from "@ionic/react";
import { useHistory } from "react-router";

const GameOver = props => {
    
    const history = useHistory();

    const goToHome = () => {
        props.setShowModal(false);
        history.push('/')
        window.location.reload();
    }

    return(
        <IonContent>
            <IonModal isOpen={props.showModal} onDidDismiss={goToHome}>
                <div style={{"textAlign":"center", "marginTop":"20%"}}>
                    <h2 hidden={props.showBothScoresInResult || props.isOneOverGame}>{props.firstInnings['teamName']} : {props.firstInnings['regular']['total']}/{props.firstInnings['regular']['wickets']}</h2><br/>
                    <h2 hidden={!props.isOneOverGame}>{props.firstInnings['teamName']} : {props.firstInnings['superOver']['total']}/{props.firstInnings['superOver']['wickets']}  (Super Over)</h2><br/>
                    <h2 hidden={!props.showBothScoresInResult}>{props.firstInnings['teamName']} : {props.firstInnings['regular']['total']}/{props.firstInnings['regular']['wickets']} ( Super Over : {props.firstInnings['superOver']['total']}/{props.firstInnings['superOver']['wickets']} )</h2><br/>
                    <h2 hidden={props.showBothScoresInResult || props.isOneOverGame}>{props.secondInnings['teamName']} : {props.secondInnings['regular']['total']}/{props.secondInnings['regular']['wickets']}</h2><br/>
                    <h2 hidden={!props.isOneOverGame}>{props.secondInnings['teamName']} : {props.secondInnings['superOver']['total']}/{props.secondInnings['superOver']['wickets']}  (Super Over)</h2><br/>
                    <h2 hidden={!props.showBothScoresInResult}>{props.secondInnings['teamName']} : {props.secondInnings['regular']['total']}/{props.secondInnings['regular']['wickets']} ( Super Over : {props.secondInnings['superOver']['total']}/{props.secondInnings['superOver']['wickets']} )</h2><br/>
                    <h2>{props.result}</h2>
                </div>
                <IonButton onClick={goToHome}>GO TO HOME</IonButton>
            </IonModal>
        </IonContent>
    )

}

export default GameOver;