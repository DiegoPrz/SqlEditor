import Line from './line';

export default class Lines {
    private _index = 0;
    private _lines: Line[] = [];

    public constructor(line: Line) {
        this._lines.push(line);
    }

    public add(line: Line) {
        const text = this.selectedLine().split();

        line.addText(text);
        line.position = 0;
        this._lines.push(line);
        this._index++;
    }

    public addText(text: string) {
        this.selectedLine().addText(text);
    }

    public count(): number {
        return this._lines.length;
    }

    public remove(): void {
        this._lines.splice(this._index, 1);
        this.selectPreviousLine();
    }

    public removeChar(): void {
        if (this.selectedLine().position === 0) {
            if (this._index === 0) {
                return;
            }
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
        this._lines.forEach((line: Line) => {
            dom.append(line.render());
        });
    }

    public renderLineNumbers(dom: HTMLElement): void {
        for (let i = 0; i < this._lines.length; i++) {
            dom.append(this.lineNumber(i + 1, i === this._index));
        }
    }

    public selectedLine(): Line {
        return this._lines[this._index];
    }

    public selectedLineIndex(): number {
        return this._index;
    }

    public selectNextChar(): void {
        if (this.selectedLine().position === this.selectedLine().numberOfLetters()) {
            this.selectNextLine();
        } else {
            this.selectedLine().position++;
        }
    }

    public selectNextLine(): void {
        if (this._index === this._lines.length - 1) {
            this.selectedLine().position = this.selectedLine().numberOfLetters();
            return;
        }

        this._index++;
        this.selectedLine().position = 0;
    }

    public selectPreviousChar(): void {
        if (this.selectedLine().position === 0) {
            this.selectPreviousLine();
        } else {
            this.selectedLine().position--;
        }
    }

    public selectPreviousLine(): void {
        if (this._index === 0) {
            this.selectedLine().position = 0;
            return;
        }

        this._index--;
        this.selectedLine().position = this.selectedLine().numberOfLetters();
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
