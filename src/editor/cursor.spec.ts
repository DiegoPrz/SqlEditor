import Cursor from './cursor';

describe('cursor', () => {
    let cursor: Cursor;
    let dom: HTMLElement;

    beforeEach(() => {
        dom = document.createElement('div');
        cursor = new Cursor(dom);
    });

    it('cursor should be defined', () => {
        expect(cursor).toBeDefined();
    });

    it('setPosition. Element position should change when setting the position', () => {
        const x = dom.style.left;
        const y = dom.style.top;

        cursor.setPosition(8, 5);

        expect(dom.style.left).not.toEqual(x);
        expect(dom.style.top).not.toEqual(y);
    });

    it('updateVisibility should change visibility on dom element', () => {
        const currentState = dom.style.visibility;
        cursor.updateVisibility();

        expect(dom.style.visibility).not.toEqual(currentState);
    });

    it('setVisible should change dom style to inherit', () => {
        cursor.setVisible();

        expect(dom.style.visibility).toEqual('inherit');
    });
});
