import { Script, createContext } from 'vm';
import { Readable, Writable } from 'stream';

// Custom readable stream for buffered input
class MyBufferedReadable extends Readable {
  private _continueReading: boolean = false;
  private inputBuffer: string[];

  constructor(inputBuffer: string[], options?: ConstructorParameters<typeof Readable>[0]) {
    super(options);
    this.inputBuffer = inputBuffer;
  }

  _read(size: number): void {
    this._continueReading = true;
    this.checkBufferAndPush();
  }

  private checkBufferAndPush(): void {
    if (this._continueReading && this.inputBuffer.length > 0) {
      const input = this.inputBuffer.shift() + '\n';
      this._continueReading = this.push(input);
    }
  }

  public continueReading(): void {
    this.checkBufferAndPush();
  }
}

// Custom writable stream to capture output
class MyBufferedWritable extends Writable {
  private outputBuffer: string[];

  constructor(outputBuffer: string[], options?: ConstructorParameters<typeof Writable>[0]) {
    super(options);
    this.outputBuffer = outputBuffer;
  }

  _write(chunk: any, encoding: string, callback: (error?: Error | null) => void): void {
    let output = chunk.toString();
    // Trim the new line character if necessary
    if (output.endsWith('\n')) {
      output = output.slice(0, -1);
    }
    this.outputBuffer.push(output);
    console.log(output);
    callback();
  }
}

export class JsRunner {
  private stdin: MyBufferedReadable;
  private stdout: MyBufferedWritable;
  // private customConsole: Console;
  private context: any;
  private inputBuffer: string[];
  private outputBuffer: string[];

  constructor(gameScript: string, inputBuffer: string[], outputBuffer: string[]) {
    this.inputBuffer = inputBuffer;
    this.outputBuffer = outputBuffer;
    this.stdin = new MyBufferedReadable(this.inputBuffer);
    this.stdout = new MyBufferedWritable(this.outputBuffer);

    const customConsole = {
      log: (message?: any, ...optionalParams: any[]) => {
        const allParams = [message, ...optionalParams].map(param => String(param));
        this.stdout.write(allParams.join(' ') + '\n');
      }
    };

    // Set up the VM context with the custom console
    const sandbox: { [key: string]: any } = {
      console: customConsole,
      process: {
        stdin: this.stdin,
        stdout: this.stdout,
      },
    };

    this.context = createContext(sandbox);

    // Create and run the script in the VM context
    const script = new Script(gameScript);
    script.runInContext(this.context);
  }

  // Function to simulate input externally
  simulateInput(input: string) {
    this.inputBuffer.push(input);
    this.stdin.continueReading();
  }

  // Example of how to use simulateInput
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getOutputBuffer() {
    return this.outputBuffer;
  }
}
