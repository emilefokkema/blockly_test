Blockly.Blocks['loop_naar'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("loop naar")
        .appendField(new Blockly.FieldDropdown([["links", "L"], ["rechts", "R"], ["", "OPTIONNAME"]]), "DIR")
        .appendField("met");
    this.appendValueInput("DIST")
        .setCheck("Number");
    this.setTooltip('');
  }
};