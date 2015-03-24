Blockly.Blocks['maak_rechtsomkeert'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("maak rechtsomkeert");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
}