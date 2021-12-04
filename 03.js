import {open} from "fs/promises";

const inputFileHandle = await open("./data/03.txt");
const inputDataString = await inputFileHandle.readFile({encoding: "utf-8"});
await inputFileHandle.close();

const inputDataLines = inputDataString.split("\r\n")
const wordLength = inputDataLines[0].length;
const diagnosticReport = inputDataLines.map(numberString => parseInt(numberString, 2));

const oxygenRating = findOxygenGeneratorRating(diagnosticReport);
const co2ScrubberRating = findCo2ScrubberRating(diagnosticReport);

console.log("Oxygen rating:", oxygenRating);
console.log("CO2 scrubber rating:", co2ScrubberRating);

console.log("Result: ", oxygenRating * co2ScrubberRating);

function findOxygenGeneratorRating(numbers) {
  return findRatingValue(numbers, getMostCommonBitAtIndex);
}

function getMostCommonBitAtIndex(numbers, bitIndex) {
  const initialScore = 0;

  const totalScore = numbers.reduce((score, currentNumber) => {
    return score + (getBitAtIndex(currentNumber, bitIndex) === 1 ? 1 : -1);
  }, initialScore);

  return totalScore >= 0 ? 1 : 0;
}

function findCo2ScrubberRating(numbers) {
  return findRatingValue(numbers, getLeastCommonBitAtIndex);
}

function findRatingValue(numbers, bitCriteriaFunction) {
  let bitIndex = wordLength - 1;
  while (numbers.length > 1) {
    const bitCriteria = bitCriteriaFunction(numbers, bitIndex);
    numbers = filterNumbersByBitAtIndex(numbers, bitIndex, bitCriteria);
    bitIndex--;
  }
  return numbers[0];
}

function getLeastCommonBitAtIndex(numbers, bitIndex) {
  return invertBit(getMostCommonBitAtIndex(numbers, bitIndex));
}

function filterNumbersByBitAtIndex(numbers, bitIndex, bitValue) {
  return numbers.filter(number => getBitAtIndex(number, bitIndex) === bitValue);
}

function getBitAtIndex(number, index) {
  const mask = 1 << index;
  return (number & mask) !== 0 ? 1 : 0;
}

function invertBit(bit) {
  return bit ^ 1;
}








