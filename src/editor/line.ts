export default class Line {
    private _index = 0;
    private _text = '';

    get index(): number {
        return this._index;
    }

    set index(index: number) {
        if (index < 0) {
            throw new Error('position should be greater or equal than 0');
        }

        if (index > this.length) {
            throw new Error('position should not be greater than the number of letters');
        }

        this._index = index;
    }

    get length(): number {
        return this._text.length;
    }

    get text(): string {
        return this._text;
    }

    public addText(text: string, updateIndex: boolean = true): void {
        this._text =
            this.textBeforeIndex() +
            text +
            this.textAfterIndex();

        if (updateIndex) {
            this.index += text.length;
        }
    }

    public removeText(end: number = -1): void {
        if (end < 0) {
            this.removeTextBeforeIndex(end);
        }

        if (end > 0) {
            this.removeTextAfterIndex(end);
        }
    }

    public split(): string {
        const text = this.textAfterIndex();
        this._text = this.textBeforeIndex();

        return text;
    }

    private removeTextAfterIndex(numberOfChar: number): void {
        if (this.index + numberOfChar > this.length) {
            throw new Error('Cannot remove more letters than available');
        }

        this._text = this.textBeforeIndex() + this.textAfterIndex().slice(numberOfChar);
    }

    private removeTextBeforeIndex(numberOfChar: number): void {
        if (this.index + numberOfChar < 0) {
            throw new Error('Cannot remove more letters than available');
        }

        this._text = this.textBeforeIndex().slice(0, numberOfChar) + this.textAfterIndex();
        this.index += numberOfChar;
    }

    private textAfterIndex(): string {
        return this._text.slice(this._index, this._text.length);
    }

    private textBeforeIndex(): string {
        return this._text.slice(0, this._index);
    }
}
