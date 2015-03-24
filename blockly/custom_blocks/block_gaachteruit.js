Blockly.Blocks['ga_achteruit'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ga achteruit");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
}