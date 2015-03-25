/*

vaarvooruit:https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#unfgdk

draaibakboord:https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vhipgi



het plan:https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#7zc2ae

*/

Blockly.JavaScript['voer_uit'] = function(block) {
  var statements_actions = Blockly.JavaScript.statementToCode(block, 'ACTIONS');
  // TODO: Assemble JavaScript into code variable.
  var code = '['+statements_actions+'];';
  return code;
};

Blockly.JavaScript['vaar_vooruit'] = function(block) {
  var dropdown_speed = block.getFieldValue('SPEED');
  // TODO: Assemble JavaScript into code variable.
  var knots;
  switch(dropdown_speed){
	  case 'ONE': knots='"one knot"'; break;
	  case 'TWO': knots='"two knots"'; break;
	  case 'THREE': knots='"three knots"'; break;
  }
  var code = knots+',';
  return code;
};

Blockly.JavaScript['maak_rechtsomkeert'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"turn stern",';
  return code;
};

Blockly.JavaScript['ga_een_knoop'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"one knot",';
  return code;
};

Blockly.JavaScript['ga_twee_knopen'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"two knots",';
  return code;
};

Blockly.JavaScript['ga_drie_knopen'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"three knots",';
  return code;
};

Blockly.JavaScript['ga_achteruit'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"retreat",';
  return code;
};

Blockly.JavaScript['draai_stuurboord'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"turn starboard",';
  return code;
};

Blockly.JavaScript['draai_bakboord'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"turn port",';
  return code;
};

//our custom blocks themselves:

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
};

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
};

Blockly.Blocks['draai_stuurboord'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("draai stuurboord");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

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
};

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

Blockly.Blocks['ga_een_knoop'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ga met een (1) knoop");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ga_twee_knopen'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ga met twee knopen");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ga_drie_knopen'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ga met drie knopen");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};