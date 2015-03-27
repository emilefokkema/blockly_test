var PuzzleMover=function(blockly){
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
	};