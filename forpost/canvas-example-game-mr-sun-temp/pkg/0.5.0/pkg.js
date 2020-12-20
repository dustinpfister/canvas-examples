/*
   canvas-example-game-mr-sun-temp
   Copyright 2020 by Dustin Pfister
   https://raw.githubusercontent.com/dustinpfister/canvas-examples/master/LICENSE
 
   https://github.com/dustinpfister/canvas-examples
*/
var utils={};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx}};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};utils.logPer=function(per,a,b){a=a===undefined?2:a;b=b===undefined?a:b;per=per<0?0:per;per=per>1?1:per;return Math.log(1+a-2+per)/Math.log(b)};utils.createLogPerObject=function(i,len,base,max,a,b){a=a===undefined?2:a;b=b===undefined?a:b;base=base===undefined?0:base;max=max===undefined?1:max;var per=i/len,logPer=utils.logPer(per,a,b);return{i:i,len:len,per:per,logPer:logPer,n:base+logPer*(max-base),valueOf:function(){return this.n}}};utils.createLogPerCollection=function(opt){opt=opt||{};opt.len=opt.len===undefined?100:opt.len;opt.base=opt.base===undefined?0:opt.base;opt.max=opt.max===undefined?50:opt.max;opt.a=opt.a===undefined?2:opt.a;opt.b=opt.b===undefined?opt.a:opt.b;var i=0,obj,collection={len:opt.len,base:opt.base,max:opt.max,a:opt.a,b:opt.b};collection.data=[];while(i<opt.len){obj=utils.createLogPerObject(i,opt.len,opt.base,opt.max,opt.a,opt.b);collection.data.push(obj);i+=1}return collection};var gameMod=function(){var plugs={};var getCallPrioritySorted=function(){var keys=Object.keys(plugs);return keys.sort(function(a,b){var plugObjA=plugs[a],plugObjB=plugs[b];if(plugObjA.callPriority>plugObjB.callPriority){return 1}if(plugObjA.callPriority<plugObjB.callPriority){return-1}return 0})};var usePlugs=function(game,methodName,args){methodName=methodName||"create";args=args||[game];var keys=getCallPrioritySorted();keys.forEach(function(plugKey){var plugObj=plugs[plugKey],method=plugObj[methodName];if(method){method.apply(plugObj,args)}})};var api={};api.create=function(opt){opt=opt||{};opt.canvas=opt.canvas||{width:320,height:240};var game={};game.centerX=opt.centerX||opt.canvas.width/2;game.centerY=opt.centerY||opt.canvas.height/2;game.sectionRadius=opt.sectionRadius||16;game.worldRadius=opt.worldRadius||100;game.secs=0;game.year=0;game.yearRate=opt.yearRate||1;game.sun={radius:16,x:game.centerX,y:game.centerY,sunGrid:{}};var i=0,sections=[],total=opt.sectionCount||20,radian,cx=game.centerX,cy=game.centerY;while(i<total){radian=Math.PI*2/total*i;sections.push({i:i,x:Math.cos(radian)*game.worldRadius+cx,y:Math.sin(radian)*game.worldRadius+cy,radius:game.sectionRadius,per:1});i+=1}game.sections=sections;usePlugs(game,"create",[game,opt]);gameMod.updateSections(game);return game};api.updateSections=function(game){var sun=game.sun;game.sections.forEach(function(section){var ajust=section.radius+sun.radius;var d=utils.distance(section.x,section.y,sun.x,sun.y)-ajust;var per=d/(game.worldRadius*2-ajust*2);per=per>1?1:per;per=per<0?0:per;per=1-per;section.per=per})};api.getSectionByPos=function(game,x,y){var section,i=game.sections.length;while(i--){section=game.sections[i];if(utils.distance(section.x,section.y,x,y)<=section.radius){return section}}return false};var boundToCircle=function(obj,cx,cy,radius){if(utils.distance(obj.x,obj.y,cx,cy)>radius){var a=Math.atan2(obj.y-cy,obj.x-cx);obj.x=cx+Math.cos(a)*radius;obj.y=cy+Math.sin(a)*radius}};api.moveSun=function(game,pos){var ajust=game.sun.radius+game.sectionRadius;game.sun.x=pos.x;game.sun.y=pos.y;boundToCircle(game.sun,game.centerX,game.centerY,game.worldRadius-ajust);api.updateSections(sm.game)};api.update=function(game,secs){game.secs+=secs;var deltaYears=Math.floor(game.secs/game.yearRate);if(deltaYears>=1){game.year+=deltaYears;game.secs%=game.yearRate;usePlugs(game,"onDeltaYear",[game,deltaYears])}};api.load=function(plugObj){var len=Object.keys(plugs).length;plugObj.name=plugObj.name||len;plugObj.callPriority=plugObj.callPriority||len;plugs[plugObj.name]=plugObj};return api}();var draw=function(){var api={};var drawMineralList=function(ctx,obj,startY,fontSize){startY=startY===undefined?0:startY;fontSize=fontSize||10;if(obj.minerals){ctx.font=fontSize+"px arial";Object.keys(obj.minerals).forEach(function(min,i){ctx.fillText(min+": "+obj.minerals[min].toFixed(2),10,startY+i*fontSize)})}};api.sectionData=function(sm,section){ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="15px arial";ctx.fillText("section "+section.i,10,10);ctx.font="10px arial";ctx.fillText("groundTemp: "+section.groundTemp.toFixed(2),10,30);ctx.fillText("temp: "+section.temp.toFixed(2),10,40);drawMineralList(ctx,section,50,10)};api.sections=function(sm){var ctx=sm.ctx;sm.game.sections.forEach(function(section){var b=50+Math.round(section.per*128);ctx.fillStyle="rgb(0,0,"+b+")";ctx.beginPath();ctx.arc(section.x,section.y,section.radius,0,Math.PI*2);ctx.fill();ctx.fillStyle="white";ctx.textAlign="center";ctx.textBaseline="middle";ctx.font="8px arial";ctx.fillText(section.per.toFixed(2),section.x,section.y-5);ctx.fillText(section.temp.toFixed(2),section.x,section.y+5)})};api.sunData=function(sm,sun){var game=sm.game;ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="15px arial";ctx.fillText("Sun Status: ",10,10);ctx.font="10px arial";ctx.fillText("status: "+game.sun.state,10,30);ctx.fillText("years: "+game.tempData.years,10,40);ctx.fillText("temp: "+sun.temp.toFixed(2),10,50);ctx.fillText("tempLevel: "+game.tempData.i+"/"+Number(game.tempData.len-1),10,60);drawMineralList(ctx,sun,70,10);var h=100,w=100,sy=150,sx=200;ctx.fillStyle="#5f5f5f";ctx.fillRect(sx,sy-h,w,h);ctx.beginPath();sun.sunGrid.data.forEach(function(tempObj){ctx.strokeStyle="white";ctx.fillStyle="black";var temp=tempObj.valueOf(),y=sy-h*(temp/sun.sunGrid.max),x=sx+w*tempObj.per;if(tempObj.i===0){ctx.moveTo(x,y)}else{ctx.lineTo(x,y)}if(tempObj.i===game.tempData.i){ctx.stroke();ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.stroke();ctx.fill();ctx.beginPath()}});ctx.stroke()};api.sun=function(sm){var sun=sm.game.sun,color="yellow",textColor="black",ctx=sm.ctx;if(sun.state==="dead"){color="black";textColor="white"}ctx.fillStyle=color;ctx.beginPath();ctx.arc(sun.x,sun.y,sun.radius,0,Math.PI*2);ctx.fill();ctx.fillStyle=textColor;ctx.font="10px arial";if(sun.state==="alive"){ctx.fillText(Math.round(sun.temp),sun.x,sun.y)}if(sun.state==="dead"){ctx.fillText(Math.round(sun.toAlivePer*100),sun.x,sun.y)}};api.back=function(sm){sm.ctx.fillStyle="#202020";sm.ctx.fillRect(0,0,sm.canvas.width,sm.canvas.height)};api.disp=function(sm){var ctx=sm.ctx;ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="10px courier";ctx.fillText("year: "+sm.game.year,3,3)};api.ver=function(sm){var ctx=sm.ctx;ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="10px courier";ctx.fillText("v"+sm.ver,10,sm.canvas.height-15)};return api}();gameMod.load({name:"sun",callPriority:"0",create:function(game,opt){var sun=game.sun;sun.state="dead";sun.spawnRate=20;sun.deadYears=0;sun.toAlivePer=0;sun.lifeSpan=0},onDeltaYear:function(game,deltaYears){var sun=game.sun;if(sun.state==="explode"){sun.deadYears=0;sun.toAlivePer=0;sun.state="dead"}if(sun.state==="dead"){sun.deadYears+=deltaYears;sun.deadYears=sun.deadYears>sun.spawnRate?sun.spawnRate:sun.deadYears;sun.toAlivePer=sun.deadYears/sun.spawnRate;if(sun.toAlivePer>=1){sun.state="alive";sun.lifeSpan=1e3}}if(sun.state==="alive"){sun.lifeSpan-=deltaYears;sun.lifeSpan=sun.lifeSpan<0?0:sun.lifeSpan;if(sun.lifeSpan===0){sun.state="explode"}}}});gameMod.load(function(){var updateSun=function(game,deltaYears){var td=game.tempData;if(game.sun.state==="dead"){game.sun.temp=0;td.years=0;td.i=0;td.globalMaxGroundTemp=game.tempData.max}if(game.sun.state==="alive"){updateLiveSun(game,deltaYears)}};var updateLiveSun=function(game,deltaYears){var td=game.tempData;td.years+=deltaYears;td.i=Math.floor(td.years/td.iAtYears);td.i=td.i>=td.len?td.len-1:td.i;td.temp=utils.createLogPerObject(td.i,td.len,td.base,td.max);game.sun.temp=td.temp.valueOf();td.globalMaxGroundTemp=game.sun.temp/10};var updateTempSections=function(game,deltaYears){var i=game.sections.length,td=game.tempData,section;while(i--){section=game.sections[i];if(Math.floor(section.per*100)>=49){section.groundTemp+=game.sun.temp/10*section.per}else{section.groundTemp-=section.groundTemp/100}section.maxGroundTemp=td.globalMaxGroundTemp*section.per;section.groundTemp=section.groundTemp<.25?0:section.groundTemp;section.groundTemp=section.groundTemp>section.maxGroundTemp?section.maxGroundTemp:section.groundTemp;section.temp=section.groundTemp+game.sun.temp*section.per}};return{name:"temp",callPriority:"1.0",create:function(game,opt){var td=game.tempData={i:0,len:100,base:10,max:500,years:0,iAtYears:100,temp:{},globalMaxGroundTemp:0};updateSun(game,0);game.sections=game.sections.map(function(section){section.temp=0;section.groundTemp=0;return section})},onDeltaYear:function(game,deltaYears){updateSun(game,deltaYears);updateTempSections(game,deltaYears)}}}());gameMod.load(function(){var getMinDelta=function(sun,rate,temp,deltaYears){return rate*Math.floor(sun.temp/temp)*deltaYears};var createMineralsObj=function(){return{copper:0,iron:0}};return{name:"fusion",callPriority:"1.1",create:function(game,opt){game.sun.minerals=createMineralsObj();var i=game.sections.length,section;while(i--){section=game.sections[i];section.minerals=createMineralsObj()}},onDeltaYear:function(game,deltaYears){var sun=game.sun;if(sun.state==="alive"){if(sun.temp>=10){sun.minerals.iron+=getMinDelta(sun,1,10,deltaYears)}if(sun.temp>=25){sun.minerals.copper+=getMinDelta(sun,.5,25,deltaYears)}var i=game.sections.length,section;while(i--){section=game.sections[i];if(section.per>.95){Object.keys(sun.minerals).forEach(function(minKey){var minCount=sun.minerals[minKey];var transferAmount=1*deltaYears;if(minCount>=transferAmount){section.minerals[minKey]+=transferAmount;sun.minerals[minKey]-=transferAmount}})}}}if(sun.state==="explode"){Object.keys(sun.minerals).forEach(function(minKey){var minCount=sun.minerals[minKey],i=game.sections.length,section;if(minCount>0){while(i--){section=game.sections[i];section.minerals[minKey]+=Math.floor(minCount/game.sections.length*section.per)}sun.minerals[minKey]=0}})}}}}());var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),container=document.getElementById("canvas-app")||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(.5,.5);var changeState=function(sm,stateKey,opt){opt=opt||{};var newState=sm.states[stateKey];if(newState.start){newState.start(sm,opt)}sm.currentState=stateKey};var states={game:{init:function(sm){sm.game=gameMod.create({canvas:sm.canvas,sectionCount:19,worldRadius:100,yearRate:.01})},update:function(sm,secs){gameMod.update(sm.game,secs);draw.back(sm);draw.sections(sm);draw.sun(sm);draw.disp(sm);draw.ver(sm)},pointerStart:function(sm,pos,e){},pointerMove:function(sm,pos,e){var sun=sm.game.sun;if(sm.input.pointerDown){gameMod.moveSun(sm.game,pos)}},pointerEnd:function(sm,pos){if(sm.input.d<3){var section=gameMod.getSectionByPos(sm.game,pos.x,pos.y);if(section){changeState(sm,"observe_section",{section:section})}if(utils.distance(sm.game.sun.x,sm.game.sun.y,pos.x,pos.y)<=sm.game.sun.radius){changeState(sm,"observe_sun",{})}}}},observe_section:{data:{section:{}},start:function(sm,opt){sm.states["observe_section"].data.section=opt.section},update:function(sm,secs){gameMod.update(sm.game,secs);draw.back(sm);draw.sectionData(sm,sm.states["observe_section"].data.section)},pointerEnd:function(sm){changeState(sm,"game",{})}},observe_sun:{data:{},start:function(sm,opt){},update:function(sm,secs){var state=sm.states["observe_sun"],td=sm.game.tempData;gameMod.update(sm.game,secs);sm.game.sun.sunGrid=utils.createLogPerCollection({len:td.len,base:td.base,max:td.max});draw.back(sm);draw.sunData(sm,sm.game.sun)},pointerEnd:function(sm){changeState(sm,"game",{})}}};var sm={ver:"0.5.0",canvas:canvas,currentState:"game",ctx:ctx,game:{},states:states,input:{pointerDown:false,d:0,startPos:{x:0,y:0},pos:{x:0,y:0}}};var pointerHanders={start:function(sm,pos,e){var pos=sm.input.pos;sm.input.pointerDown=true;sm.input.startPos={x:pos.x,y:pos.y};sm.input.d=0;var method=states[sm.currentState].pointerStart;if(method){method(sm,pos,e)}},move:function(sm,pos,e){var method=states[sm.currentState].pointerMove,startPos=sm.input.startPos;sm.input.d=utils.distance(startPos.x,startPos.y,pos.x,pos.y);if(method){method(sm,pos,e)}},end:function(sm,pos,e){sm.input.pointerDown=false;var method=states[sm.currentState].pointerEnd;if(method){method(sm,pos,e)}}};var createPointerHandler=function(sm,type){return function(e){var pos=utils.getCanvasRelative(e);sm.input.pos=pos;e.preventDefault();pointerHanders[type](sm,pos,e)}};canvas.addEventListener("mousedown",createPointerHandler(sm,"start"));canvas.addEventListener("mousemove",createPointerHandler(sm,"move"));canvas.addEventListener("mouseup",createPointerHandler(sm,"end"));canvas.addEventListener("touchstart",createPointerHandler(sm,"start"));canvas.addEventListener("touchmove",createPointerHandler(sm,"move"));canvas.addEventListener("touchend",createPointerHandler(sm,"end"));states[sm.currentState].init(sm);var lt=new Date,FPS_target=30;var loop=function(){var now=new Date,t=now-lt,secs=t/1e3;requestAnimationFrame(loop);if(t>=1e3/FPS_target){states[sm.currentState].update(sm,secs);lt=now}};loop();