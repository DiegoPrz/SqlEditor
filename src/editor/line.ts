export default class Line {
    private _index = 0;
    private _text = '';

    get text(): string {
        return this._text;
    }

    get position(): number {
        return this._index;
    }

    set position(position: number) {
        if (position < 0) {
            throw new Error('position should be greater or equal than 0');
        }

        if (position > this.numberOfLetters()) {
            throw new Error('position should not be greater than the number of letters');
        }

        this._index = position;
    }

    public addText(text: string): void {
        this._text =
            this.textBeforeIndex() +
            text +
            this.textAfterIndex();

        this._index += text.length;
    }

    public numberOfLetters(): number {
        return this._text.length;
    }

    public removeLetter(): void {
        this._text = this.textBeforeIndex().slice(0, -1) + this.textAfterIndex();

        this._index--;
    }

    public render(): HTMLDivElement {
        const line = document.createElement('div');
        line.classList.add('view-line');
        line.innerHTML = this._text.replace(/\s/g, '&nbsp;');
        return line;
    }

    public split(): string {
        const text = this.textAfterIndex();
        this._text = this.textBeforeIndex();

        return text;
    }

    private textAfterIndex(): string {
        return this._text.slice(this._index, this._text.length);
    }

    private textBeforeIndex(): string {
        return this._text.slice(0, this._index);
    }
}
