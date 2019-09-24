import Line from './line';

export default class Lines {
    private _index = 0;
    private _lines: Line[] = [];

    // TODO: Rename methods and reorder code
    // TODO: Allow remove char to remove char after line index

    get count(): number {
        return this._lines.length;
    }

    get index(): number {
        return this._index;
    }

    public constructor(line: Line) {
        this._lines.push(line);
    }

    public add(line: Line) {
        const text = this.selectedLine().split();

        line.addText(text);
        line.index = 0;
        this._lines.push(line);
        this._index++;
    }

    public addText(text: string) {
        this.selectedLine().addText(text);
    }

    public remove(): void {
        this._lines.splice(this._index, 1);
        this.selectPreviousLine();
    }

    public removeText(): void {
        if (this.selectedLine().index === 0) {
            if (this._index === 0) {
                return;
            }
            const text = this.selectedLine().text;
            this.remove();
            const position = this.selectedLine().index;
            this.addText(text);
            this.selectedLine().index = position;
        } else {
            this.selectedLine().removeText();
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

    public selectNextChar(): void {
        if (this.selectedLine().index === this.selectedLine().length) {
            this.selectNextLine();
        } else {
            this.selectedLine().index++;
        }
    }

    public selectNextLine(): void {
        if (this._index === this._lines.length - 1) {
            this.selectedLine().index = this.selectedLine().length;
            return;
        }

        this._index++;
        this.selectedLine().index = 0;
    }

    public selectPreviousChar(): void {
        if (this.selectedLine().index === 0) {
            this.selectPreviousLine();
        } else {
            this.selectedLine().index--;
        }
    }

    public selectPreviousLine(): void {
        if (this._index === 0) {
            this.selectedLine().index = 0;
            return;
        }

        this._index--;
        this.selectedLine().index = this.selectedLine().length;
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
