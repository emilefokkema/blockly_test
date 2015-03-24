Blockly.JavaScript['voer_uit'] = function(block) {
  var statements_actions = Blockly.JavaScript.statementToCode(block, 'ACTIONS');
  // TODO: Assemble JavaScript into code variable.
  var code = '['+statements_actions+'];';
  return code;
};