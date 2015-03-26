var BlocklyPirateQuestion={
	strategyData: {blockTypeName: 'voer_uit',blockCodeString: '', blockFieldText: 'het plan:'},
	cardTypeData: {
		"one knot": {blockTypeName: 'ga_een_knoop',blockCodeString: '"one knot",', blockFieldText: 'ga met een (1) knoop'},
		"two knots": {blockTypeName: 'ga_twee_knopen',blockCodeString: '"two knots",', blockFieldText: 'ga met twee knopen'},
		"three knots": {blockTypeName: 'ga_drie_knopen',blockCodeString: '"three knots",', blockFieldText: 'ga met drie knopen'},
		"turn port": {blockTypeName: 'draai_bakboord',blockCodeString: '"turn port",', blockFieldText: 'draai bakboord'},
		"turn starboard": {blockTypeName: 'draai_stuurboord',blockCodeString: '"turn starboard",', blockFieldText: 'draai stuurboord'},
		"turn stern": {blockTypeName: 'maak_rechtsomkeert',blockCodeString: '"turn stern",', blockFieldText: 'maak rechtsomkeert'},
		"retreat": {blockTypeName: 'ga_achteruit',blockCodeString: '"retreat",', blockFieldText: 'ga achteruit'},
	},
	blockInitFunction: function(blockly, cardType){
		var fieldText=this.cardTypeData[cardType].blockFieldText;
		return function(){
			this.setHelpUrl('http://www.example.com/');
			this.setColour(180);
			this.appendDummyInput()
				.setAlign(blockly.ALIGN_RIGHT)
				.appendField(fieldText);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		};
	},
	blockCodeGenerator: function(cardType){
		var codeString=this.cardTypeData[cardType].blockCodeString;
		return function(block){
			var code=codeString;
			return code;
		};
	},
	strategyBlockInitFunction: function(){
		var fieldText=this.strategyData.blockFieldText;
		return function(){
			this.setHelpUrl('http://www.example.com/');
			this.setColour(225);
			this.appendDummyInput()
				.appendField(fieldText);
			this.appendStatementInput("ACTIONS");
			this.setTooltip('');
		};
	},
	strategyBlockCodeGenerator: function(blockly){
		return function(block){
			 var statements_actions = blockly.JavaScript.statementToCode(block, 'ACTIONS');
			// TODO: Assemble JavaScript into code variable.
			var code = '['+statements_actions+'];';
			return code;
		};
	},
	setBlockTypes: function(blockly){
		blockly.Blocks[this.strategyData.blockTypeName]={
			init: this.strategyBlockInitFunction()
		};
		blockly.JavaScript[this.strategyData.blockTypeName]=this.strategyBlockCodeGenerator(blockly);
		for(cardType in this.cardTypeData){
			blockly.Blocks[this.cardTypeData[cardType].blockTypeName]={
			init: this.blockInitFunction(blockly, cardType)
			};
			blockly.JavaScript[this.cardTypeData[cardType].blockTypeName]=this.blockCodeGenerator(cardType);
		}
	},
	getDeckBlocklyXml: function(deck){
		var xml={
			start: '<xml xmlns="http://www.w3.org/1999/xhtml">',
			blockStrings: [],
			currentBlockId: 9,
			end: '</xml>',
			addBlockString: function(blockString){this.blockStrings[this.blockStrings.length]=blockString;},
			addBlock: function(type, x, y, howManyTimes){
				for(var i=1;i<=howManyTimes;i++){
					this.addBlockString('<block type="'+type+'" id="'+this.currentBlockId+'" deletable="false" x="'+(x+2*i)+'" y="'+(y+2*i)+'"></block>');
					this.currentBlockId+=9;
				}
			},
			toString: function(){
				var s=this.start;
				for(var i=0;i<this.blockStrings.length;i++){s+=this.blockStrings[i];}
				return s+this.end;
			}
		};
		xml.addBlock(this.strategyData.blockTypeName,10,300,1);
		var xy=function(i){return {x:10,y:10+i*40};}
		var offsetXY={
			"one knot": xy(0),
			"two knots": xy(1),
			"three knots": xy(2),
			"turn port": xy(3),
			"turn starboard": xy(4),
			"turn stern": xy(5),
			"retreat": xy(6),
		};
		for(cardType in deck){
			var howManyTimes=deck[cardType];
			if(typeof howManyTimes==="string"){howManyTimes=parseInt(howManyTimes);}
			xml.addBlock(this.cardTypeData[cardType].blockTypeName, offsetXY[cardType].x, offsetXY[cardType].y, howManyTimes);
		}
		return xml.toString();
	},
	fillBlocklyWithDeck: function(blockly, deck){
		this.setBlockTypes(blockly);
		blockly.mainWorkspace.clear();
		var xmlString=this.getDeckBlocklyXml(deck);
		var dom=blockly.Xml.textToDom(xmlString);
		blockly.Xml.domToWorkspace(blockly.mainWorkspace, dom);
	},
	puzzleMover: function(blockly){
		this.moveStrings=(function(){
			if(typeof blockly==="undefined"){return [];}
			if(!blockly.JavaScript){
				if(typeof blockly==="string"){
					var code=blockly;
				}
				else{return [];}
			}else{
				var code=blockly.JavaScript.workspaceToCode();
			}
			var matches=code.match(/\[\s*(".*?",\s*?)+?\]/g);
			if(matches==null){return [];}
			var s=matches[matches.length-1];
			var validMoveStrings=["turn port", "turn starboard", "turn stern", "retreat", "one knot", "two knots", "three knots"];
			var moveStrings=(function(){
				var moveStrings=s.substring(1,s.length-1).split(/,/g);
				var moveStrings1=[];
				for(var i=0;i<moveStrings.length;i++){
					if(moveStrings[i]!=""){
						var moveString=moveStrings[i].replace(/['"]/g,"").trim();
						if(validMoveStrings.indexOf(moveString)!=-1){moveStrings1[moveStrings1.length]=moveString;}
					}
				}
				return moveStrings1;
			})();
			return moveStrings;
		})();
		var self=this;
		this.mover=function(toBeMoved){
			this.moveStrings=self.moveStrings;
			this.moved=0;
			this.isDone=function(){return this.moved==this.moveStrings.length;}
			this.nextMoveString=function(){
				if(this.isDone()){return "";}
				return this.moveStrings[this.moved++];
			};
			this.toBeMoved=toBeMoved;
			var self1=this;
			this.move=(function(){
				if(typeof self1.toBeMoved==="string"){
					return function(moveString){
						this.toBeMoved=this.toBeMoved+" did '"+moveString+"', ";
					}
				}
				if(self1.toBeMoved.play){
					return function(moveString){
						this.toBeMoved=this.toBeMoved.play(moveString);
					}
				}
				return function(moveString){return;};
			})();
			this.moveNext=function(){
				var moveString=this.nextMoveString();
				if(moveString!=""){
					this.move(moveString);
				}
				return !this.isDone();
			};
			this.moveAll=function(){
				while(this.moveNext()){}
				return false;
			};
			this.getToBeMoved=function(){return this.toBeMoved;}
		};
		this.newMover=function(puzzle){
			return new this.mover(puzzle);
		};
	},
	getPuzzleMover: function(blockly){
		return new this.puzzleMover(blockly);
	}
};