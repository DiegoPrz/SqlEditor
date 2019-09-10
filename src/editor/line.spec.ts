import Line from './line';

describe('line', () => {
    let line: Line;

    beforeEach(() => {
        line = new Line();
    });

    it('text. should be empty when created', () => {
        expect(line.text).toBe('');
    });

    it('addText. should add text at the end', () => {
        line.addText('test');
        expect(line.text).toBe('test');
    });

    it('addText. second added text should be added after first added text', () => {
        line.addText('Some text');
        line.addText('. After the other');

        expect(line.text).toBe('Some text. After the other');
    });

    it('Position. Added text should be inserted in the right position', () => {
        line.addText('some text');
        line.position = 5;
        line.addText('sample ');

        expect(line.text).toBe('some sample text');
    });

    it('Set Position. Position should be setted correctly', () => {
        line.addText('some text');
        line.position = 3;

        expect(line.position).toBe(3);
    });

    it('Set Position. Position can be setted multiple times', () => {
        line.addText('some text');
        line.position = 2;
        line.position = 9;

        expect(line.position).toBe(9);
    });

    it('Set Position. Position should not be lower than 0', () => {
        expect(() => {
            line.position = -1;
        }).toThrow();
    });

    it('Set Position. Position should not be greater than the number of letters', () => {
        expect(() => {
            line.position = 3;
        }).toThrow();
    });

    it('removeLetter. Should remove last letter', () => {
        line.addText('some text');
        line.removeLetter();

        expect(line.text).toBe('some tex');
    });

    it('removeLetter. Should remove letter in position', () => {
        line.addText('some text');
        line.position = 5;
        line.removeLetter();
        line.removeLetter();

        expect(line.text).toBe('somtext');
    });

    it('removeLetter. Should remove anything when index = 0', () => {
        line.addText('some text');
        line.position = 0;
        line.removeLetter();

        expect(line.text).toBe('some text');
    });

    it('render. Should have view-line class', () => {
        line.addText('some text');
        const render = line.render();

        expect(render.classList.length).toBe(1);
        expect(render.classList.contains('view-line')).toBeTruthy();
        expect(render.innerHTML).toBe('some text');
    });
});
