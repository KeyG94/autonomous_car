"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
//class declerations
class Car {
    constructor(props) {
        //setting "this." = to props.isRunning
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
        this.accelerating = props.accelerating;
    }
    respond(events) {
        //check ignition
        if (!this.isRunning) {
            console.log('The car is off.');
        }
        //check speed
        const speed = determineSpeed();
        if (!speed) {
            console.log('speeding up');
        }
        else {
            console.log('slowing down');
        }
        //manage control
        Object.keys(events).forEach(eventKey => {
            if (!events[eventKey]) {
                return;
            }
            const wheel = this.steeringControl;
            //we know obstacle is either left or right
            eventKey === 'ObstacleLeft' ? wheel.turn('right') : wheel.turn('left');
        });
    }
}
class SteeringControl {
    execute(command) {
        console.log(`Executing: ${command}.`);
    }
    turn(direction) {
        this.execute(`turn ${direction}`);
    }
}
class ThrottleControl {
    execute(command) {
        console.log(`Executing: ${command}.`);
    }
    speed(command) {
        this.execute(`${command}`);
    }
}
const steering = new SteeringControl();
const throttle = new ThrottleControl();
const autonomousCar = new Car({
    isRunning: true,
    steeringControl: steering,
    accelerating: throttle,
});
//call respond multiple times
const callRespond = () => {
    let indexArr = [];
    //generate an array of index numbers
    for (let i = 0; indexArr.length < Math.round(Math.random() * 10); i++) {
        indexArr.push(i);
    }
    indexArr.forEach(element => {
        //call respond for each element in array
        autonomousCar.respond((0, computer_vision_1.getObstacleEvents)());
        return element;
    });
};
const determineSpeed = () => {
    const speed = Math.round(Math.random() * 100);
    return speed < 60 ? true : false;
};
callRespond();
