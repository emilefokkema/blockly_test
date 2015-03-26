var BlocklyQuestion={
	blockTypeName: "custom_question_part",
	blockInitFunction: function(blockly, questionPartText){
		return function(){
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.setAlign(blockly.ALIGN_RIGHT)
				.appendField(questionPartText);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		};
	},
	setBlockTypes: function(blockly, question){
		var l=question.parts.length;
		for(var i=0;i<l;i++){
			blockly.Blocks[this.blockTypeName+i]={
				init: this.blockInitFunction(blockly, question.parts[i])
			};
			blockly.JavaScript[this.blockTypeName+i]=(function(i){
				return function(block){
					var code="part"+i;
					return code;
				};
			})(i);
		}
	},
	getQuestionBlocklyXml: function(question){
		var s='<xml xmlns="http://www.w3.org/1999/xhtml">';
		var l=question.parts.length;
		for(var i=0;i<l;i++){
			s+='<block type="'+(this.blockTypeName+i)+'" id="'+((i+1)*9)+'" deletable="false" x="10" y="'+(10+30*i)+'"></block>';
		}
		return s+'</xml>';
	},
	displayQuestion: function(blockly, question){
		blockly.mainWorkspace.clear();
		this.setBlockTypes(blockly, question);
		var xmlString=this.getQuestionBlocklyXml(question);
		var dom=blockly.Xml.textToDom(xmlString);
		blockly.Xml.domToWorkspace(blockly.mainWorkspace, dom);
	},
	scoreCodeAgainstQuestion: function(code, question){
		var isIn=function(thing, array){return array.indexOf(thing)!=-1;};
		var subSetOf=function(array1, array2){
			for(var i=0;i<array1.length;i++){if(!isIn(array1[i], array2)){return false;}}
			return true;
		};
		var equals=function(array1, array2){return subSetOf(array1, array2)&&subSetOf(array2, array1);};
		var arrayIsIn=function(array, arrayarray){
			for(var i=0;i<arrayarray.length;i++){if(equals(array, arrayarray[i])){return true;}}
			return false;
		};
		var arraySubSetOf=function(arrayarray1, arrayarray2){
			for(var i=0;i<arrayarray1.length;i++){if(!arrayIsIn(arrayarray1[i], arrayarray2)){return false;}}
			return true;
		};
		var arrayEquals=function(arrayarray1, arrayarray2){return arraySubSetOf(arrayarray1, arrayarray2)&&arraySubSetOf(arrayarray2, arrayarray1);};
		var partsArrays=(function(){
			var groups=code.split(/\n/g);
			var getPartsArray=function(group){
				var partsArray=[];
				var indices=group.split(/part/g);
				for(var i=0;i<indices.length;i++){
					if(indices[i]!=""){partsArray[partsArray.length]=parseInt(indices[i]);}
				}
				
				return partsArray;
			};
			var partsArrays=[];
			for(var i=0;i<groups.length;i++){
				var partsArray=getPartsArray(groups[i]);
				if(partsArray.length>1){partsArrays[partsArrays.length]=partsArray;}
			}
			return partsArrays;
		})();
		return arrayEquals(partsArrays, question.answer);
	}
};