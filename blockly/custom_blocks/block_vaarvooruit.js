Blockly.Blocks['vaar_vooruit'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("vaar vooruit met")
        .appendField(new Blockly.FieldDropdown([["1", "ONE"], ["2", "TWO"], ["3", "THREE"]]), "SPEED");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};