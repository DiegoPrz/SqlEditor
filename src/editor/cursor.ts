export default class Cursor {
    private dom: HTMLElement;

    constructor(dom: HTMLElement) {
        this.dom = dom;
        this.setVisible();
    }

    public setPosition(x: number, y: number): void {
        this.dom.style.top  = `${y * 19}px`;
        this.dom.style.left = `${x * 7.7}px`;
    }

    public setVisible(): void {
        this.dom.style.visibility = 'inherit';
    }

    public updateVisibility(): void {
        this.dom.style.visibility = this.dom.style.visibility === 'inherit' ? 'hidden' : 'inherit';
    }
}
