import {open} from "fs/promises";

const inputFileHandle = await open("./data/01.txt");
const inputDataString = await inputFileHandle.readFile({encoding: "utf-8"});
await inputFileHandle.close();

const measurements = inputDataString.split("\r\n").map((str) => parseInt(str));

const totalNumberOfIncreases = measurements.reduce((numberOfIncreases, currentMeasurement, i) => {
  const previousMeasurement = measurements[i-1];
  return previousMeasurement && previousMeasurement < currentMeasurement ? numberOfIncreases + 1 : numberOfIncreases;
}, 0);

console.log("Result: ", totalNumberOfIncreases);





