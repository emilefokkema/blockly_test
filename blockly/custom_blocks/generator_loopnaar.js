Blockly.JavaScript['loop_naar'] = function(block) {
  var dropdown_dir = block.getFieldValue('DIR');
  var value_dist = Blockly.JavaScript.valueToCode(block, 'DIST', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'loop_'+(dropdown_dir=='L'?'links':'rechts')+'('+value_dist+')';
  return code;
};