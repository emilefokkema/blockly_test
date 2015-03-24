Blockly.Blocks['voer_uit'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendDummyInput()
        .appendField("het plan:");
    this.appendStatementInput("ACTIONS");
    this.setTooltip('');
  }
};