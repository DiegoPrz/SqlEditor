export default class Cursor {
    private dom: HTMLElement;

    constructor(dom: HTMLElement) {
        this.dom = dom;
    }

    public setPosition(x: number, y: number): void {
        this.dom.style.top = `${19 * y + 5}px`;
        this.dom.style.left = `${x * 8 + 7 - x / 4}px`;
    }

    public updateVisibility(): void {
        this.dom.style.visibility = this.dom.style.visibility === 'inherit' ? 'hidden' : 'inherit';
    }
}
