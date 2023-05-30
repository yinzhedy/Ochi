import {useState} from 'react';

export default function useWalk(maxSteps) {
    // STATES
    const [position, setPosition] = useState({x:0, y:0})
    // zero maps to down, getter is dir, setter is setDir
    const [dir, setDir] = useState(0)
    // one step forward
    const [step, setStep] = useState(0)

    // turns directions into integer value
    const directions = {
        down:0,
        left:1,
        right:2,
        up:3,
    };
    const stepSize = 16;


    const modifier = {
        down: { x:0, y:stepSize},
        left: {x: -stepSize, y:0},
        right: {x: stepSize, y: 0},
        up: {x:0, y: -stepSize}
    }
    function walk(dir) {
        setDir(prev => {
            // prevent just turning
            if(directions[dir] === prev) move(dir)
            // return current direction back into setter
            return directions[dir]
        })
        // comp counts from 0, hence -1. ensure it doesnt go above max of three steps
        setStep(prev => prev < maxSteps -1 ? prev +1 : 0)
    }

    function move(dir) {
        setPosition(prev => ({
            x: prev.x + modifier[dir].x,
            y: prev.y + modifier[dir].y
        }))
    }
    return {
        walk,
        dir,
        step,
        position,
    }

}