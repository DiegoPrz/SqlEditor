import Line from './line';
import Lines from './lines';

export default class RenderHtml {
    private _editor = document.getElementById('editor');
    private _lineNumbers = document.getElementById('line-numbers');
    private _lines: Lines;

    constructor(lines: Lines) {
        this._lines = lines;

        this.render();
    }

    public render(): void {
        this.renderLineNumbers();
        this.renderLines();
    }

    private renderLine(line: Line): void {
        const HTMLLine = document.createElement('div');
        HTMLLine.classList.add('view-line');
        HTMLLine.innerHTML = line.text.replace(/\s/g, '&nbsp;');

        this._editor.append(HTMLLine);
    }

    private renderLineNumber(line: number, currentLine: boolean): void {
        const HTMLLineNumber = document.createElement('div');
        HTMLLineNumber.classList.add('view-line');
        HTMLLineNumber.innerHTML = line.toString();

        if (currentLine) {
            HTMLLineNumber.style.color = '#111';
        }

        this._lineNumbers.append(HTMLLineNumber);
    }

    private renderLineNumbers(): void {
        this._lineNumbers.innerHTML = '';

        for (let i = 0; i < this._lines.count; i++) {
            this.renderLineNumber(i + 1, i === this._lines.index);
        }
    }

    private renderLines(): void {
        this._editor.innerHTML = '';

        this._lines.lines.forEach((line: Line) => {
            this.renderLine(line);
        });
    }
}
