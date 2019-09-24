import Cursor from './cursor';
import Line from './line';
import Lines from './lines';
import RenderHtml from './renderHtml';

const cursor = new Cursor();
const lines = new Lines(new Line());
const renderHtml = new RenderHtml(lines, cursor);
let timeSinceLastChange = new Date();

window.setInterval(() => {
    const currentTime = new Date();
    if (currentTime.getTime() - timeSinceLastChange.getTime() > 500) {
        cursor.updateVisibility();
        renderHtml.renderCursor();
    }
}, 500);

document.addEventListener('keydown', logKey);

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
        lines.removeText();
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
    if (e.keyCode === 46) {
        lines.removeText(1);
    }

    timeSinceLastChange = new Date();
    cursor.setPosition(lines.selectedLine().index, lines.index);
    renderHtml.render();
}
