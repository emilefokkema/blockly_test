Blockly.Blocks['draai_bakboord'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("draai bakboord");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
}