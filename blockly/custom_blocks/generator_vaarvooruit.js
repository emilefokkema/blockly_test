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