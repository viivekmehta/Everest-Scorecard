const getOutcomeForBouncer = (shotType, shotTiming) => {
    if(shotType === "Straight" || shotType === "Sweep" || shotType === "Flick" || shotType === "CoverDrive" || shotType === "LegLance" || shotType === "Long On" || shotType === "Scoop" || shotType === "SquareCut") {
        return 0;
    } else if(shotType === "Pull") {
        if(shotTiming === "Early") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Good") {
            return 4;
        } else if(shotTiming === "Perfect") {
            let random = Math.floor((Math.random() * 2) + 1);
            if(random === 1) {
                return 4;
            } else {
                return 6;
            }
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    } else if(shotType === "UpperCut") {
        if(shotTiming === "Early") {
            return "Wicket";
        } else if(shotTiming === "Good") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Perfect") {
            let random = Math.floor((Math.random() * 2) + 1);
            if(random === 1) {
                return 4;
            } else {
                return 6;
            }
        } else if(shotTiming === "Late") {
            return 0;
        }
    }
}

export {
    getOutcomeForBouncer
};