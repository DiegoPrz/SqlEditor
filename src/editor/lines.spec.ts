import Line from './line';
import Lines from './lines';

describe('lines', () => {
    let lines: Lines;

    beforeEach(() => {
        lines = new Lines(new Line());
    });

    function getNewLine(testValue: string): Line {
        const line = new Line();
        line.addText(testValue);

        return line;
    }

    it('lines should be defined', () => {
        expect(lines).toBeDefined();
    });

    it('count. Should have a line when created', () => {
        expect(lines.count()).toBe(1);
    });

    it('count. Should have two lines after adding a line', () => {
        lines.add(new Line());

        expect(lines.count()).toBe(2);
    });

    it('add. Text after current position should be moved to next line', () => {
        lines.add(getNewLine('Some sample text'));
        lines.selectedLine().position = 12;

        lines.add(new Line());

        expect(lines.selectedLine().text).toBe('text');
    });

    it('count. Should be one after adding and removing a line', () => {
        lines.add(new Line());
        lines.remove();

        expect(lines.count()).toBe(1);
        expect(lines.selectedLineIndex()).toBe(0);
    });

    it('remove. Should remove the current line and select the previous one', () => {
        lines.add(getNewLine('sample text'));
        lines.add(new Line());
        lines.add(new Line());

        lines.selectPreviousLine();
        lines.remove();

        expect(lines.count()).toBe(3);
        expect(lines.selectedLine().text).toBe('sample text');
    });

    it('selectedLineIndex. Should be 0 when created', () => {
        expect(lines.selectedLineIndex()).toBe(0);
    });

    it('selectedLineIndex. Should be the last line added', () => {
        lines.add(new Line());

        expect(lines.selectedLineIndex()).toBe(1);
    });

    it('selectPreviousLine. Should select the previous line', () => {
        lines.add(new Line());
        lines.add(new Line());
        lines.add(new Line());

        lines.selectPreviousLine();

        expect(lines.selectedLineIndex()).toBe(2);
    });

    it('selectedPreviousLine. Should not be less than 0', () => {
        lines.selectPreviousLine();
        lines.selectPreviousLine();

        expect(lines.selectedLineIndex()).toBe(0);
    });

    it('selectedPreviousLine. If on first line select position 0', () => {
        lines.addText('some text');
        lines.selectPreviousLine();

        expect(lines.selectedLine().position).toBe(0);
    });

    it('selectedPreviousLine. Last character of previuos line should be selected', () => {
        lines.addText('some text');
        lines.add(new Line());
        lines.selectPreviousLine();
        lines.selectedLine().position = 3;
        lines.selectNextLine();
        lines.selectPreviousLine();

        expect(lines.selectedLine().position).toBe(9);
    });

    it('selectNextLine. Should select the next line', () => {
        lines.add(new Line());
        lines.add(new Line());

        lines.selectPreviousLine();
        lines.selectNextLine();

        expect(lines.selectedLineIndex()).toBe(2);
    });

    it('selectNextLine. Should select the first character on next line', () => {
        lines.add(new Line());
        lines.add(getNewLine('some sample text'));

        lines.selectPreviousLine();
        lines.selectNextLine();

        expect(lines.selectedLine().position).toBe(0);
    });

    it('selectNextLine. Selected line should not be greater than the number of lines', () => {
        lines.add(new Line());

        lines.selectNextLine();

        expect(lines.selectedLineIndex()).toBe(1);
    });

    it('selectNextLine. If on last line select the last position', () => {
        lines.add(getNewLine('some sample text'));
        lines.selectPreviousChar();
        lines.selectPreviousChar();
        lines.selectPreviousChar();

        lines.selectNextLine();

        expect(lines.selectedLine().position).toBe(16);

    });

    it('selectedLine. Should return selected line', () => {
        lines.add(getNewLine('sample text'));

        expect(lines.selectedLine().text).toBe('sample text');
    });

    it('selectPreviousChar. Should select previous char on selected line', () => {
        lines.add(getNewLine('sample text'));
        lines.selectPreviousChar();

        expect(lines.selectedLineIndex()).toBe(1);
        expect(lines.selectedLine().position).toBe(10);
    });

    it('selectPreviousChar. Should select last char on previous line if the current line is at the begining', () => {
        lines.add(getNewLine('sample text'));
        lines.add(new Line());

        lines.selectPreviousChar();

        expect(lines.selectedLineIndex()).toBe(1);
        expect(lines.selectedLine().position).toBe(11);
    });

    it('selectNextChar. Should select next char on selected line', () => {
        lines.add(getNewLine('sample text'));
        lines.selectPreviousChar();
        lines.selectNextChar();

        expect(lines.selectedLineIndex()).toBe(1);
        expect(lines.selectedLine().position).toBe(11);
    });

    it('selectNextChar. Should select first char on next line if the current line is at the end', () => {
        lines.add(getNewLine('sample text'));
        lines.add(new Line());

        lines.selectPreviousChar();
        lines.selectNextChar();

        expect(lines.selectedLineIndex()).toBe(2);
        expect(lines.selectedLine().position).toBe(0);
    });

    it('render. HTMLElement should have all the lines on it', () => {
        lines.add(getNewLine('sample text'));
        lines.add(new Line());

        const dom = document.createElement('div');

        lines.render(dom);

        const line = dom.childNodes[1] as HTMLElement;

        expect(dom.childNodes.length).toBe(3);
        expect(line.innerHTML).toEqual('sample&nbsp;text');
    });

    it('renderLineNumbers. HTMLElement should have all the line numbers on it', () => {
        lines.add(getNewLine('sample text'));
        lines.add(new Line());

        const dom = document.createElement('div');

        lines.renderLineNumbers(dom);

        expect(dom.childNodes.length).toBe(3);
        expect(dom.childNodes.item(1).textContent).toBe('2');
    });

    it('addText. Should add text on selected line', () => {
        lines.addText('sample');

        expect(lines.selectedLine().text).toBe('sample');
    });

    it('removeChar. Should remove the character in current possition', () => {
        lines.addText('some sample text');
        lines.removeChar();

        expect(lines.selectedLine().text).toBe('some sample tex');
    });

    it('removeChar. Should not remove if in position 0 of the first line', () => {
        lines.add(getNewLine('some text'));
        lines.selectPreviousLine();
        lines.removeChar();

        expect(lines.count()).toBe(2);
        expect(lines.selectedLine().text).toBe('');
    });

    it('removeChar. Should remove the line if char is at the first possition', () => {
        lines.add(new Line());
        lines.removeChar();

        expect(lines.count()).toBe(1);
    });

    it('removeChar. Should move text on current line to the previous line if at first possition', () => {
        lines.add(getNewLine('text + '));
        lines.add(getNewLine('Some text'));
        lines.selectedLine().position = 0;

        lines.removeChar();

        expect(lines.count()).toBe(2);
        expect(lines.selectedLine().text).toBe('text + Some text');
        expect(lines.selectedLine().position).toBe(7);
    });
});
