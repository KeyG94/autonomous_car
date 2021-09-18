import { getObstacleEvents } from './computer-vision';

//interface declerations
interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control{
  //copy execute from interface control --
  turn: (direction: string) => void;
}

interface Speed extends Control{
    //copy execute from Control --
    speed: (command: string) => void;
}

interface Events {
  //take in events from computervision
  //event type that is string: equal boolean.
  [event: string]: boolean;
}

interface AutonomousCar {
  isRunning?: boolean,
  //method to respond events with the Event interface.
  respond: (events: Events) => void;
}

interface AutonomousCarProps {
  isRunning?: boolean,
  steeringControl: Steering,
  accelerating: Speed,
}


//class declerations
class Car implements AutonomousCar {
  //declearing an empty variable - accessed by "this."
  isRunning;
  steeringControl;
  accelerating;

  constructor(props: AutonomousCarProps){
    //setting "this." = to props.isRunning
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
    this.accelerating = props.accelerating;
  }


  respond(events: Events){
    //check ignition
    if(!this.isRunning){
      console.log('The car is off.');
    }

    //check speed
    const speed: boolean = determineSpeed();

    if (!speed) {
        console.log('speeding up');
    } else {
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
    })

  }
}

class SteeringControl implements Steering {
  execute(command: string){
    console.log(`Executing: ${command}.`);
  }

  turn(direction: string){
    this.execute(`turn ${direction}`);
  }
}

class ThrottleControl implements Speed {
    execute(command: string){
        console.log(`Executing: ${command}.`)
    }

    speed(command: string) {
        this.execute(`${command}`)
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
    let indexArr: number[] = [];
    //generate an array of index numbers
    for(let i = 0; indexArr.length < Math.round(Math.random() * 10); i++){
        indexArr.push(i);
    }
    indexArr.forEach(element => {
        //call respond for each element in array
        autonomousCar.respond(getObstacleEvents());
        return element;
    })
}

const determineSpeed = () => {
    const speed: number = Math.round(Math.random() * 100);

    return speed < 60 ? true : false;
}

callRespond()
