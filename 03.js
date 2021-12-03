import {open} from "fs/promises";

const inputFileHandle = await open("./data/03.txt");
const inputDataString = await inputFileHandle.readFile({encoding: "utf-8"});
await inputFileHandle.close();

const diagnosticReport = inputDataString.split("\r\n");
const wordLength = diagnosticReport[0].length;

const initialGammaBitCount = Array.from({length: wordLength}, () => 0);

const totalGammaBitCount = diagnosticReport.reduce((gammaBitCount, currentWord) => {
  const currentWordBits = currentWord.split("");
  currentWordBits.forEach((bit, i) => {
    if (bit === "1") {
      gammaBitCount[i]++;
    }});

  return gammaBitCount;

}, initialGammaBitCount);

const halfOfDiagnosticReportLength = diagnosticReport.length / 2;
const gammaRate = totalGammaBitCount.map(gammaBitCount => gammaBitCount > halfOfDiagnosticReportLength);
const epsilonRate = gammaRate.map(gammaRateBit => !gammaRateBit);

const gammaRateBinaryString = binaryArrayToString(gammaRate);
const epsilonRateBinaryString = binaryArrayToString(epsilonRate);

console.log("Gamma rate: ", gammaRateBinaryString);
console.log("Epsilon rate: ", epsilonRateBinaryString);

const gammaRateDecimal = parseInt(gammaRateBinaryString, 2);
const epsilonRateDecimal = parseInt(epsilonRateBinaryString, 2);

console.log("Gamma rate decimal: ", gammaRateDecimal);
console.log("Epsilon rate decimal: ", epsilonRateDecimal);

console.log("Return: ", gammaRateDecimal * epsilonRateDecimal);

function binaryArrayToString(binaryArray) {
  return binaryArray.reduce((binaryString, bit) => {
    return binaryString + (bit ? "1" : "0");
  }, "");
}








