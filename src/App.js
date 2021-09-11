import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ScoreCard from './pages/Scorecard';
import '@ionic/react/css/core.css';
import '@ionic/react/css/text-alignment.css';
import './assets/css/ionic-overwrites/ionic-theme.css';
import './assets/css/ionic-overwrites/ionic-header.css';
import './assets/css/scorecard-styles-v0001.css';
import { IonApp } from '@ionic/react';
const App = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" exact={true}>
                        <Redirect to="/homepage" />
                    </Route>
                    <Route path="/homepage" exact={true}>
                        <HomePage />
                    </Route>
                    <Route path="/scorecard" exact={true}>
                        <ScoreCard />
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};
export default App;