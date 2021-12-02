import {open} from "fs/promises";

const inputFileHandle = await open("./data/02.txt");
const inputDataString = await inputFileHandle.readFile({encoding: "utf-8"});
await inputFileHandle.close();

const commands = inputDataString.split("\r\n");

const initialPosition = {
  horizontal: 0,
  depth: 0,
  aim: 0
};

const { horizontal: totalHorizontal, depth: totalDepth} = commands.reduce(({horizontal, depth, aim}, currentCommand) => {
  const [commandType, commandValue] = parseCommand(currentCommand);
  switch (commandType) {
    case "forward": return { horizontal: horizontal + commandValue, depth: depth + aim * commandValue, aim };
    case "up": return { horizontal, depth, aim: aim - commandValue};
    case "down": return { horizontal, depth, aim: aim + commandValue};
    default: return { horizontal, depth, aim };
  }

}, initialPosition);

console.log("Result: ", totalHorizontal * totalDepth);

function parseCommand(commandString) {
  const [commandType, commandValueString] = commandString.split(" ");
  return [commandType, parseInt(commandValueString)];
}





