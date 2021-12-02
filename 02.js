import {open} from "fs/promises";

const inputFileHandle = await open("./data/02.txt");
const inputDataString = await inputFileHandle.readFile({encoding: "utf-8"});
await inputFileHandle.close();

const commands = inputDataString.split("\r\n");

const initialPosition = {
  horizontal: 0,
  depth: 0
};

const { horizontal: totalHorizontal, depth: totalDepth} = commands.reduce(({horizontal, depth}, currentCommand) => {
  const [commandType, commandValue] = parseCommand(currentCommand);
  switch (commandType) {
    case "forward": return { horizontal: horizontal + commandValue, depth };
    case "up": return { horizontal, depth: depth - commandValue};
    case "down": return { horizontal, depth: depth + commandValue };
    default: return { horizontal, depth };
  }

}, initialPosition);

console.log("Result: ", totalHorizontal * totalDepth);

function parseCommand(commandString) {
  const [commandType, commandValueString] = commandString.split(" ");
  return [commandType, parseInt(commandValueString)];
}





