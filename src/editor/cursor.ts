export default class Cursor {
    private _visible: boolean = true;
    private _x: number = 0;
    private _y: number = 0;

    get visible(): boolean {
        return this._visible;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public setPosition(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public setVisible(): void {
        this._visible = true;
    }

    public updateVisibility(): void {
        this._visible = !this._visible;
    }
}
