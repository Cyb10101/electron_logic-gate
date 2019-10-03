'use strict';

class LogicGate {
    constructor(selector) {
        this.rootDiv = document.querySelector(selector);
        this.bindModeButtons(selector);
        this.bindSvgRadio();
        this.updateSvg();
        this.updateTruthTable();
    }

    bindModeButtons() {
        let self = this;
        $('input[name="mode"]').on('change', function () {
            self.updateTruthTable();
            self.updateSvg();
        });
    }

    bindSvgRadio() {
        let self = this;
        $('.logic-gate-svg-select .radio').on('click', function () {
            if ($(this).hasClass('checked')) {
                return;
            }
            if ($(this).hasClass('radioA')) {
                $('.logic-gate-svg-select .radioA').toggleClass('checked');
            }
            if ($(this).hasClass('radioB')) {
                $('.logic-gate-svg-select .radioB').toggleClass('checked');
            }
            self.updateSvg();
        });
    }

    getSvgRadioValue(selector) {
        return (parseInt($('.logic-gate-svg-select ' + selector + '.checked').data('value'), 10) === 1);
    }

    updateSvg() {
        let svg = document.querySelector('.logic-gate-svg-select');
        if (svg) {
            let hide = (this.getModeOperatorId() === 0);
            svg.querySelector('.lineB').style.display = (hide ? 'none' : 'block');
            svg.querySelectorAll('.radioB').forEach(function (obj) {
                obj.style.display = (hide ? 'none' : 'block');
            });

            svg.querySelector('.boxTextTop').innerHTML = this.getOperator();
            svg.querySelector('.boxTextMiddle').innerHTML = this.getOperatorText(true);
            svg.querySelector('.boxTextBottom').innerHTML = this.getExecuteText(this.getSvgRadioValue('.radioA'), this.getSvgRadioValue('.radioB'));

            svg.querySelector('.executeText').innerHTML = this.getExecuteText(this.getSvgRadioValue('.radioA'), this.getSvgRadioValue('.radioB'));
            svg.querySelector('.resultText').innerHTML = this.execute(this.getSvgRadioValue('.radioA'), this.getSvgRadioValue('.radioB'));
        }
    }

    getModeOperatorId() {
        return parseInt($('input[name="mode"]:checked').val(), 10);
    }

    jsSimulatedGateXor(a, b) {
        return (a || b) && !(a && b);
    }

    execute(first = false, last = false) {
        switch(this.getModeOperatorId()) {
            case 0: return !(first);
            case 1: return (first && last);
            case 2: return (first || last);
            case 3: return this.jsSimulatedGateXor(first, last);
            case 4: return !(first && last);
            case 5: return !(first || last);
            case 6: return !this.jsSimulatedGateXor(first, last);
        }
        return false;
    }

    getExecuteText(first = false, last = false) {
        if (this.getModeOperatorId() === 0) {
            return '(' + this.getOperator() + ' ' + (first ? 'true': 'false') + ')';
        }
        return '(' + (first ? 'true': 'false') + ' ' + this.getOperator() + ' ' + (last ? 'true': 'false') + ')';
    }

    getOperator() {
        switch(this.getModeOperatorId()) {
            case 0: return '!';
            case 1: return '&&';
            case 2: return '||';
            case 3: return 'xor';
            case 4: return 'nand';
            case 5: return 'nor';
            case 6: return 'xnor';
        }
        return '';
    }

    getOperatorText(additional = false) {
        switch(this.getModeOperatorId()) {
            case 0: return 'NOT';
            case 1: return 'AND';
            case 2: return 'OR';
            case 3: return 'XOR';
            case 4: return 'NAND' + (additional ? ' (NOT AND)' : '');
            case 5: return 'NOR' + (additional ? ' (NOT OR)' : '');
            case 6: return 'XNOR' + (additional ? ' (NOT XOR)' : '');
        }
        return '';
    }

    colorBool(value) {
        return value ? '<span style="color:#008000;">true</span>' : '<span style="color:#ff0000;">false</span>';
    }

    updateTruthTable() {
        let html = '';
        if (this.getModeOperatorId() === 0) {
            html += '(' + this.getOperator() + ' ' + this.colorBool(true) + ') = ' + this.colorBool(this.execute(true)) + '<br/>';
            html += '(' + this.getOperator() + ' ' + this.colorBool(false) + ') = ' + this.colorBool(this.execute(false)) + '<br/>';
            html += '&nbsp;<br/>';
            html += '&nbsp;';
        } else {
            html += '(' + this.colorBool(true) + ' ' + this.getOperator() + ' ' + this.colorBool(true) + ') = ' + this.colorBool(this.execute(true, true)) + '<br/>';
            html += '(' + this.colorBool(true) + ' ' + this.getOperator() + ' ' + this.colorBool(false) + ') = ' + this.colorBool(this.execute(true, false)) + '<br/>';
            html += '(' + this.colorBool(false) + ' ' + this.getOperator() + ' ' + this.colorBool(true) + ') = ' + this.colorBool(this.execute(false, true)) + '<br/>';
            html += '(' + this.colorBool(false) + ' ' + this.getOperator() + ' ' + this.colorBool(false) + ') = ' + this.colorBool(this.execute(false, false));
        }
        this.rootDiv.querySelector('.truth-table .data').innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.logic-gate')) {
        const logicGate = new LogicGate('.logic-gate');
    }
});
