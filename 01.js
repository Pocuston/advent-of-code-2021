import {open} from "fs/promises";

const inputFileHandle = await open("./data/01.txt");
const inputDataString = await inputFileHandle.readFile({encoding: "utf-8"});
await inputFileHandle.close();

const measurements = inputDataString.split("\r\n").map((str) => parseInt(str));

const initialAccumulator = {
  numberOfIncreases: 0,
  currentWindow: []
};

const windowLength = 3;

const { numberOfIncreases: totalNumberOfIncreases } = measurements.reduce(({ currentWindow, numberOfIncreases }, currentMeasurement) => {
  if (currentWindow.length < windowLength) {
    return {
      currentWindow: [...currentWindow, currentMeasurement],
      numberOfIncreases
    }
  }
  else {
    const previousWindow = [...currentWindow];
    const previousWindowSum = sumArrayValues(previousWindow);
    currentWindow = [...currentWindow.slice(1, windowLength), currentMeasurement];
    const currentWindowSum = sumArrayValues(currentWindow);

    if (currentWindowSum > previousWindowSum) {
      numberOfIncreases++;
    }

    return {
      currentWindow,
      numberOfIncreases
    }
  }
}, initialAccumulator);

console.log("Result: ", totalNumberOfIncreases);

function sumArrayValues(array) {
  return array.reduce((sum, currentValue) => sum + currentValue, 0);
}





