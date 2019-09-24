import Cursor from './cursor';

describe('cursor', () => {
    let cursor: Cursor;

    beforeEach(() => {
        cursor = new Cursor();
    });

    it('cursor should be defined', () => {
        expect(cursor).toBeDefined();
    });

    it('cursor position should be (0, 0() by default', () => {
        expect(cursor.x).toBe(0);
        expect(cursor.y).toBe(0);
    });

    it('setPosition. Cursor position should change when setting the position', () => {
        cursor.setPosition(8, 5);

        expect(cursor.x).toBe(8);
        expect(cursor.y).toBe(5);
    });

    it('cursor visibility should be true be default', () => {
        expect(cursor.visible).toEqual(true);
    });

    it('updateVisibility should update visibility', () => {
        cursor.updateVisibility();

        expect(cursor.visible).toEqual(false);
    });

    it('updateVisibility can visibility multiple times', () => {
        cursor.updateVisibility();
        cursor.updateVisibility();

        expect(cursor.visible).toEqual(true);
    });

    it('setVisible should change visibility to true', () => {
        cursor.updateVisibility();
        cursor.setVisible();

        expect(cursor.visible).toEqual(true);
    });

    it('setVisible should change visibility to true multiple times', () => {
        cursor.setVisible();
        cursor.setVisible();

        expect(cursor.visible).toEqual(true);
    });
});
