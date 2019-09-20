export default class Line {
    private index = 0;
    private letters = '';

    get text(): string {
        return this.letters;
    }

    get position(): number {
        return this.index;
    }

    set position(position: number) {
        if (position < 0) {
            throw new Error('position should be greater or equal than 0');
        }

        if (position > this.numberOfLetters()) {
            throw new Error('position should not be greater than the number of letters');
        }

        this.index = position;
    }

    public addText(text: string): void {
        this.letters =
            this.textBeforeIndex() +
            text +
            this.textAfterIndex();

        this.index += text.length;
    }

    public numberOfLetters(): number {
        return this.letters.length;
    }

    public removeLetter(): void {
        this.letters = this.textBeforeIndex().slice(0, -1) + this.textAfterIndex();

        this.index--;
    }

    public render(): HTMLDivElement {
        const line = document.createElement('div');
        line.classList.add('view-line');
        line.innerHTML = this.letters.replace(/\s/g, '&nbsp;');
        return line;
    }

    private textAfterIndex(): string {
        return this.letters.slice(this.index, this.letters.length);
    }

    private textBeforeIndex(): string {
        return this.letters.slice(0, this.index);
    }
}
