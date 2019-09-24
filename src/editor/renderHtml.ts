import Cursor from './cursor';
import Line from './line';
import Lines from './lines';

export default class RenderHtml {
    private _cursor: Cursor;
    private _htmlCursor = document.getElementById('cursor');
    private _htmlEditor = document.getElementById('editor');
    private _htmlNumbers = document.getElementById('line-numbers');
    private _lines: Lines;

    constructor(lines: Lines, cursor: Cursor) {
        this._lines = lines;
        this._cursor = cursor;

        this.render();
    }

    public render(): void {
        this.renderLineNumbers();
        this.renderLines();
        this.renderCursor();
    }

    public renderCursor(): void {
        this._htmlCursor.style.left = `${this._cursor.x * 7.7}px`;
        this._htmlCursor.style.top  = `${this._cursor.y * 19}px`;

        this._htmlCursor.style.visibility = this._cursor.visible ? 'inherit' : 'hidden';
    }

    private renderLine(line: Line): void {
        const HTMLLine = document.createElement('div');
        HTMLLine.classList.add('view-line');
        HTMLLine.innerHTML = line.text.replace(/\s/g, '&nbsp;');

        this._htmlEditor.append(HTMLLine);
    }

    private renderLineNumber(line: number, currentLine: boolean): void {
        const HTMLLineNumber = document.createElement('div');
        HTMLLineNumber.classList.add('view-line');
        HTMLLineNumber.innerHTML = line.toString();

        if (currentLine) {
            HTMLLineNumber.style.color = '#111';
        }

        this._htmlNumbers.append(HTMLLineNumber);
    }

    private renderLineNumbers(): void {
        this._htmlNumbers.innerHTML = '';

        for (let i = 0; i < this._lines.count; i++) {
            this.renderLineNumber(i + 1, i === this._lines.index);
        }
    }

    private renderLines(): void {
        this._htmlEditor.innerHTML = '';

        this._lines.lines.forEach((line: Line) => {
            this.renderLine(line);
        });
    }
}
