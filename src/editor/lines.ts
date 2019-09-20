import Line from './line';

export default class Lines {
    private currentLine = -1;
    private lines: Line[] = [];

    // TODO: All lines after the current one are deleted when one line is deleted

    public constructor(line: Line) {
        this.add(line);
    }

    public add(line: Line) {
        this.lines.push(line);
        this.currentLine++;
    }

    public addText(text: string) {
        this.selectedLine().addText(text);
    }

    public count(): number {
        return this.lines.length;
    }

    public remove(): void {
        this.lines.splice(this.currentLine);
        this.selectPreviousLine();
    }

    public removeChar(): void {
        if (this.selectedLine().position === 0) {
            const text = this.selectedLine().text;
            this.remove();
            const position = this.selectedLine().position;
            this.addText(text);
            this.selectedLine().position = position;
        } else {
            this.selectedLine().removeLetter();
        }
    }

    public render(dom: HTMLElement): void {
        this.lines.forEach((line: Line) => {
            dom.append(line.render());
        });
    }

    public renderLineNumbers(dom: HTMLElement): void {
        for (let i = 0; i < this.lines.length; i++) {
            dom.append(this.lineNumber(i + 1, i === this.currentLine));
        }
    }

    public selectedLine(): Line {
        return this.lines[this.currentLine];
    }

    public selectedLineIndex(): number {
        return this.currentLine;
    }

    public selectNextChar(): void {
        if (this.selectedLine().position === this.selectedLine().numberOfLetters()) {
            this.selectNextLine();
        } else {
            this.selectedLine().position++;
        }
    }

    public selectNextLine(): void {
        if (this.currentLine === this.lines.length - 1) {
            return;
        }

        this.currentLine++;
    }

    public selectPreviousChar(): void {
        if (this.selectedLine().position === 0) {
            this.selectPreviousLine();
        } else {
            this.selectedLine().position--;
        }
    }

    public selectPreviousLine(): void {
        if (this.currentLine === 0) {
            return;
        }

        this.currentLine--;
    }

    private lineNumber(line: number, currentLine: boolean): HTMLElement {
        const lineNumber = document.createElement('div');
        lineNumber.classList.add('view-line');
        lineNumber.innerHTML = line.toString();
        if (currentLine) {
            lineNumber.style.color = '#111';
        }
        return lineNumber;
    }
}
