import Line from './line';
import Lines from './lines';

describe('lines', () => {
    let lines: Lines;

    beforeEach(() => {
        lines = new Lines(new Line());
    });

    function addNewLine(testValue: string): Line {
        const line = new Line();
        lines.add(line);
        line.addText(testValue);

        return line;
    }

    it('lines should be defined', () => {
        expect(lines).toBeDefined();
    });

    it('count. Should have a line when created', () => {
        expect(lines.count).toBe(1);
    });

    it('count. Should have two lines after adding a line', () => {
        lines.add(new Line());

        expect(lines.count).toBe(2);
    });

    it('lines. Should return the array of lines', () => {
        const line = addNewLine('some sample text');

        expect(lines.lines.length).toBe(2);
        expect(lines.lines[1]).toBe(line);
    });

    it('add. Text after current position should be moved to next line', () => {
        addNewLine('Some sample text');
        lines.selectedLine().index = 12;

        lines.add(new Line());

        expect(lines.selectedLine().text).toBe('text');
    });

    it('add. Position should be at char 0 when adding a new line', () => {
        lines.addText('Some sample text');
        lines.selectedLine().index = 12;
        lines.add(new Line());

        expect(lines.selectedLine().index).toBe(0);
    });

    it('count. Should be one after adding and removing a line', () => {
        lines.add(new Line());
        lines.remove();

        expect(lines.count).toBe(1);
        expect(lines.index).toBe(0);
    });

    it('remove. Should remove the current line and select the previous one', () => {
        addNewLine('sample text');
        lines.add(new Line());
        lines.add(new Line());

        lines.selectPreviousLine();
        lines.remove();

        expect(lines.count).toBe(3);
        expect(lines.index).toBe(1);
        expect(lines.selectedLine().text).toBe('sample text');
    });

    it('selectedLineIndex. Should be 0 when created', () => {
        expect(lines.index).toBe(0);
    });

    it('selectedLineIndex. Should be the last line added', () => {
        lines.add(new Line());

        expect(lines.index).toBe(1);
    });

    it('selectPreviousLine. Should select the previous line', () => {
        lines.add(new Line());
        lines.add(new Line());
        lines.add(new Line());

        lines.selectPreviousLine();

        expect(lines.index).toBe(2);
    });

    it('selectedPreviousLine. Should not be less than 0', () => {
        lines.selectPreviousLine();
        lines.selectPreviousLine();

        expect(lines.index).toBe(0);
    });

    it('selectedPreviousLine. If on first line select position 0', () => {
        lines.addText('some text');
        lines.selectPreviousLine();

        expect(lines.selectedLine().index).toBe(0);
    });

    it('selectedPreviousLine. Last character of previuos line should be selected', () => {
        lines.addText('some text');
        lines.add(new Line());
        lines.selectPreviousLine();
        lines.selectedLine().index = 3;
        lines.selectNextLine();
        lines.selectPreviousLine();

        expect(lines.selectedLine().index).toBe(9);
    });

    it('selectNextLine. Should select the next line', () => {
        lines.add(new Line());
        lines.add(new Line());

        lines.selectPreviousLine();
        lines.selectNextLine();

        expect(lines.index).toBe(2);
    });

    it('selectNextLine. Should select the first character on next line', () => {
        lines.add(new Line());
        addNewLine('some sample text');

        lines.selectPreviousLine();
        lines.selectNextLine();

        expect(lines.selectedLine().index).toBe(0);
    });

    it('selectNextLine. Selected line should not be greater than the number of lines', () => {
        lines.add(new Line());

        lines.selectNextLine();

        expect(lines.index).toBe(1);
    });

    it('selectNextLine. If on last line select the last position', () => {
        addNewLine('some sample text');
        lines.selectPreviousChar();
        lines.selectPreviousChar();
        lines.selectPreviousChar();

        lines.selectNextLine();

        expect(lines.selectedLine().index).toBe(16);

    });

    it('selectedLine. Should return selected line', () => {
        addNewLine('sample text');

        expect(lines.selectedLine().text).toBe('sample text');
    });

    it('selectPreviousChar. Should select previous char on selected line', () => {
        addNewLine('sample text');
        lines.selectPreviousChar();

        expect(lines.index).toBe(1);
        expect(lines.selectedLine().index).toBe(10);
    });

    it('selectPreviousChar. Should select last char on previous line if the current line is at the begining', () => {
        addNewLine('sample text');
        lines.add(new Line());

        lines.selectPreviousChar();

        expect(lines.index).toBe(1);
        expect(lines.selectedLine().index).toBe(11);
    });

    it('selectNextChar. Should select next char on selected line', () => {
        addNewLine('sample text');
        lines.selectPreviousChar();
        lines.selectNextChar();

        expect(lines.index).toBe(1);
        expect(lines.selectedLine().index).toBe(11);
    });

    it('selectNextChar. Should select first char on next line if the current line is at the end', () => {
        addNewLine('sample text');
        lines.add(new Line());

        lines.selectPreviousChar();
        lines.selectNextChar();

        expect(lines.index).toBe(2);
        expect(lines.selectedLine().index).toBe(0);
    });

    it('addText. Should add text on selected line', () => {
        lines.addText('sample');

        expect(lines.selectedLine().text).toBe('sample');
    });

    it('removeText. Should remove the previous char of the current possition', () => {
        lines.addText('some sample text');
        lines.selectedLine().index = 7;
        lines.removeText();

        expect(lines.selectedLine().text).toBe('some smple text');
        expect(lines.selectedLine().index).toBe(6);
    });

    it('removeText. Can remove multiple chars at once before the current position', () => {
        lines.addText('some sample text');
        lines.removeText(-5);

        expect(lines.selectedLine().text).toBe('some sample');
        expect(lines.selectedLine().index).toBe(11);
    });

    it('removeText. Should not remove previous char if in position 0 of the first line', () => {
        addNewLine('some text');
        lines.selectPreviousLine();
        lines.removeText();

        expect(lines.count).toBe(2);
        expect(lines.selectedLine().text).toBe('');
    });

    it('removeText. Can remove chars after current posistion', () => {
        lines.addText('some sample text');
        lines.selectedLine().index = 0;
        lines.removeText(5);

        expect(lines.selectedLine().text).toBe('sample text');
        expect(lines.selectedLine().index).toBe(0);
    });

    it('removeText. Should not remove if in last position of the last line', () => {
        addNewLine('some text');
        lines.removeText(1);

        expect(lines.count).toBe(2);
        expect(lines.selectedLine().text).toBe('some text');
    });

    it('removeText. Should remove the line if char is at the first possition', () => {
        lines.add(new Line());
        lines.removeText();

        expect(lines.count).toBe(1);
    });

    it('removeText. Should move text on current line to the previous line if at first possition', () => {
        addNewLine('text + ');
        addNewLine('Some text');
        lines.selectedLine().index = 0;

        lines.removeText();

        expect(lines.count).toBe(2);
        expect(lines.selectedLine().text).toBe('text + Some text');
        expect(lines.selectedLine().index).toBe(7);
    });

    it('removeText. Should move text on the next line to the current line if at last possition', () => {
        addNewLine('text + ');
        addNewLine('Some text');
        lines.selectPreviousLine();
        lines.selectedLine().index = 7;

        lines.removeText(1);

        expect(lines.count).toBe(2);
        expect(lines.selectedLine().text).toBe('text + Some text');
        expect(lines.selectedLine().index).toBe(7);
    });

    it('select. Should select right position on the indicated line', () => {
        addNewLine('Some sample text');
        addNewLine('Another sample text');
        lines.select(1, 7);

        expect(lines.index).toBe(1);
        expect(lines.selectedLine().index).toBe(7);
    });

    it('select. Should not select line out of range', () => {
        expect(() => {
            lines.select(-1, 7);
        }).toThrow();

        expect(() => {
            lines.select(1, 7);
        }).toThrow();
    });

    it('select. Should not select position out of range', () => {
        addNewLine('Some sample line');

        expect(() => {
            lines.select(0, -1);
        }).toThrow();

        expect(() => {
            lines.select(1, 17);
        }).toThrow();
    });
});
