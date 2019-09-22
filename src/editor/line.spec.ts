import Line from './line';

describe('line', () => {
    let line: Line;

    beforeEach(() => {
        line = new Line();
    });

    it('line should be defined', () => {
        expect(line).toBeDefined();
    });

    it('text. should be empty when created', () => {
        expect(line.text).toBe('');
    });

    it('index. should be 0 when created', () => {
        expect(line.index).toBe(0);
    });

    it('addText. Text should be added at the end by default', () => {
        line.addText('Some text');
        line.addText('. After the other');

        expect(line.text).toBe('Some text. After the other');
        expect(line.index).toBe(26);
    });

    it('index. should be setted correctly', () => {
        line.addText('some text');
        line.index = 3;

        expect(line.index).toBe(3);
    });

    it('addText. Text should be added at the index position', () => {
        line.addText('some text');
        line.index = 5;
        line.addText('sample ');

        expect(line.text).toBe('some sample text');
        expect(line.index).toBe(12);
    });

    it('index. Position can be setted multiple times', () => {
        line.addText('some text');
        line.index = 2;
        line.index = 9;

        expect(line.index).toBe(9);
    });

    it('index. Should not be lower than 0', () => {
        expect(() => {
            line.index = -1;
        }).toThrow();
    });

    it('index. Should not be greater than the length', () => {
        expect(() => {
            line.index = 3;
        }).toThrow();
    });

    it('split. Should keep text just until the position and return the rest of the line', () => {
        line.addText('Some sample text');
        line.index = 12;

        const textAfterPosition = line.split();

        expect(textAfterPosition).toBe('text');
        expect(line.text).toBe('Some sample ');
    });

    it('removeLetter. Should remove last letter', () => {
        line.addText('some text');
        line.removeText();

        expect(line.text).toBe('some tex');
    });

    it('removeLetter. Should remove letter in position', () => {
        line.addText('some text');
        line.index = 5;
        line.removeText();
        line.removeText();

        expect(line.text).toBe('somtext');
    });

    it('removeLetter. Should remove anything when index = 0', () => {
        line.addText('some text');
        line.index = 0;
        line.removeText();

        expect(line.text).toBe('some text');
    });

    it('render. Should have view-line class', () => {
        line.addText('some    text  ');
        const render = line.render();

        expect(render.classList.length).toBe(1);
        expect(render.classList.contains('view-line')).toBeTruthy();
        expect(render.innerHTML).toBe('some&nbsp;&nbsp;&nbsp;&nbsp;text&nbsp;&nbsp;');
    });
});
