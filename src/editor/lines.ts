import Line from './line';

export default class Lines {
    private _index = 0;
    private _lines: Line[] = [];

    get count(): number {
        return this._lines.length;
    }

    get index(): number {
        return this._index;
    }

    get lines(): Line[] {
        return this._lines;
    }

    public constructor(line: Line) {
        this._lines.push(line);
    }

    public add(line: Line) {
        const text = this.selectedLine().split();
        line.addText(text, false);

        this._lines.push(line);
        this.selectNextLine();
    }

    public addText(text: string, updateIndex: boolean = true) {
        this.selectedLine().addText(text, updateIndex);
    }

    public remove(): void {
        this._lines.splice(this._index, 1);
        this.selectPreviousLine();
    }

    public removeText(end: number = -1): void {
        const endIndex = this.selectedLine().index + end;

        if (endIndex < 0) {
            this.joinLines(this.index - 1, this.index);
        } else if (endIndex > this.selectedLine().length) {
            this.joinLines(this.index, this.index + 1);
        } else {
            this.selectedLine().removeText(end);
        }
    }

    public select(line: number, index: number) {
        if (line < 0 || line >= this.count) {
            throw new Error('selected line is out of range');
        }

        this._index = line;

        if (index < 0 || index > this.selectedLine().length) {
            throw new Error('selected position is out of range');
        }

        this.selectedLine().index = index;
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

    private joinLines(firstLine: number, lastLine: number) {
        if (firstLine < 0 || lastLine >= this.count) {
            return;
        }

        this.select(lastLine, 0);
        const text = this.selectedLine().text;
        this.remove();
        this.addText(text, false);
    }
}
