import * as fs from 'fs';
import { JsRunner } from './js-runner';

const gameScript: string = fs.readFileSync('./game.js', 'utf8');
let inputBuffer: string[] = [];
let outputBuffer: string[] = [];

const jsRunner = new JsRunner(gameScript, inputBuffer, outputBuffer);

// Example of interaction
jsRunner.simulateInput("rock");

jsRunner.delay(2000)
  .then(() => {
    jsRunner.simulateInput("paper");
    return jsRunner.delay(2000);
  })
  .then(() => {
    jsRunner.simulateInput("scissors");
    return jsRunner.delay(2000);
  })
  .then(() => {
    jsRunner.simulateInput("unknown");
    return jsRunner.delay(2000);
  })
  .then(() => {
    jsRunner.simulateInput("exit");
  })
