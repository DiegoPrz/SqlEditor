export default class Cursor {
    private _dom: HTMLElement;

    constructor(dom: HTMLElement) {
        this._dom = dom;
        this.setVisible();
    }

    public setPosition(x: number, y: number): void {
        this._dom.style.top  = `${y * 19}px`;
        this._dom.style.left = `${x * 7.7}px`;
    }

    public setVisible(): void {
        this._dom.style.visibility = 'inherit';
    }

    public updateVisibility(): void {
        this._dom.style.visibility = this._dom.style.visibility === 'inherit' ? 'hidden' : 'inherit';
    }
}
