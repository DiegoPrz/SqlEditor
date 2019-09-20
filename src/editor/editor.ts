import Cursor from './cursor';
import Line from './line';
import Lines from './lines';

const cursor = new Cursor(document.getElementById('cursor'));
const editor = document.getElementById('editor');
const lineNumbers = document.getElementById('line-numbers');
const lines = new Lines(new Line());
let timeSinceLastChange = new Date();

window.setInterval(() => {
    const currentTime = new Date();
    if (currentTime.getTime() - timeSinceLastChange.getTime() > 500) {
        cursor.updateVisibility();
    }
}, 500);

document.addEventListener('keydown', logKey);

renderLines();

function logKey(e: KeyboardEvent): void {
    e.preventDefault();
    cursor.setVisible();

    if (e.key.length === 1) {
        lines.addText(e.key);
    }
    if (e.keyCode === 9) {
        lines.addText('    ');
    }
    if (e.keyCode === 13) {
        lines.add(new Line());
    }
    if (e.keyCode === 8) {
        lines.removeChar();
    }
    if (e.keyCode === 37) {
        lines.selectPreviousChar();
    }
    if (e.keyCode === 39) {
        lines.selectNextChar();
    }
    if (e.keyCode === 38) {
        lines.selectPreviousLine();
    }
    if (e.keyCode === 40) {
        lines.selectNextLine();
    }

    timeSinceLastChange = new Date();
    cursor.setPosition(lines.selectedLine().position, lines.selectedLineIndex());
    renderLines();
}

function renderLines(): void {
    lineNumbers.innerHTML = '';
    lines.renderLineNumbers(lineNumbers);

    editor.innerHTML = '';
    lines.render(editor);
}
