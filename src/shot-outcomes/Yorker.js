const getOutcomeForYorker = (shotType, shotTiming) => {
    if(shotType === "Pull" || shotType === "UpperCut" || shotType === "LegLance" || shotType === "SquareCut") {
        return "Wicket";
    } else if(shotType === "Straight") {
        if(shotTiming === "Early") {
            return "Wicket";
        } else if(shotTiming === "Good") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Perfect") {
            return 4;
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    } else if(shotType === "Sweep") {
        if(shotTiming === "Early") {
            return "Wicket";
        } else if(shotTiming === "Good") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Perfect") {
            return 4;
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    } else if(shotType === "Flick") {
        if(shotTiming === "Early") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Good") {
            return 4;
        } else if(shotTiming === "Perfect") {
            return 6;
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    } else if(shotType === "CoverDrive") {
        if(shotTiming === "Early") {
            return "Wicket";
        } else if(shotTiming === "Good") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Perfect") {
            return 4;
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    } else if(shotType === "Long On") {
        if(shotTiming === "Early") {
            return "Wicket";
        } else if(shotTiming === "Good") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Perfect") {
            return 4;
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    } else if(shotType === "Scoop") {
        if(shotTiming === "Early") {
            return Math.floor((Math.random() * 2) + 1);  //will return either 1 or 2
        } else if(shotTiming === "Good") {
            return 4;
        } else if(shotTiming === "Perfect") {
            return 6;
        } else if(shotTiming === "Late") {
            return "Wicket";
        }
    }
}

export {
    getOutcomeForYorker
};