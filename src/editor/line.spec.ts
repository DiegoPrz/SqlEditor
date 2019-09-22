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

    it('removeText. Should remove char before index by default', () => {
        line.addText('some text');
        line.index = 5;
        line.removeText();

        expect(line.text).toBe('sometext');
    });

    it('removeText. can remove multiple chars at once', () => {
        line.addText('some text');
        line.removeText(-2);

        expect(line.text).toBe('some te');
        expect(line.index).toBe(7);
    });

    it('removeText. cannot remove more chars than avaliable before index', () => {
        line.addText('some text');
        line.index = 1;

        expect(() => {
            line.removeText(-2);
        }).toThrow();
    });

    it('removeText. Should remove chars after index', () => {
        line.addText('some text');
        line.index = 4;
        line.removeText(4);

        expect(line.text).toBe('somet');
        expect(line.index).toBe(4);
    });

    it('removeText. Should remove chars even if index is at 0', () => {
        line.addText('some text');
        line.index = 0;
        line.removeText(5);

        expect(line.text).toBe('text');
        expect(line.index).toBe(0);
    });

    it('removeText. cannot remove more chars than avaliable after index', () => {
        line.addText('some text');
        line.index = 8;

        expect(() => {
            line.removeText(2);
        }).toThrow();
    });

    it('render. Should have view-line class', () => {
        line.addText('some    text  ');
        const render = line.render();

        expect(render.classList.length).toBe(1);
        expect(render.classList.contains('view-line')).toBeTruthy();
        expect(render.innerHTML).toBe('some&nbsp;&nbsp;&nbsp;&nbsp;text&nbsp;&nbsp;');
    });
});
