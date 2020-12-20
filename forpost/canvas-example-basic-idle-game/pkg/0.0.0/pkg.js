/*
   canvas-example-basic-idle-game
   Copyright 2020 by Dustin Pfister
   https://raw.githubusercontent.com/dustinpfister/canvas-examples/master/LICENSE
 
   https://github.com/dustinpfister/canvas-examples
*/
var u={};u.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();var x=(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y=(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top;return{x:x,y:y,bx:bx}};u.boundingBox=function(x1,y1,w1,h1,x2,y2,w2,h2){return!(y1+h1<y2||y1>y2+h2||x1+w1<x2||x1>x2+w2)};u.mkButtonLayout=function(opt){var blObj={};opt=opt||{};blObj.buttons=opt.buttons||[];blObj.attachTo=opt.attachTo||window;blObj.handler=function(e){var pos=u.getCanvasRelative(e),i=opt.buttons.length,b;e.preventDefault();while(i--){b=opt.buttons[i];if(u.boundingBox(pos.x,pos.y,1,1,b.x,b.y,b.w,b.h)){if(b.onAction){b.onAction.call({opt:opt,pos:pos,button:b,e:e},pos,opt,b,e)}break}}};blObj.attachTo.addEventListener("click",blObj.handler);return blObj};var game=function(){var upgradeData=[{dispName:"Manual Gather",cost:{base:10,pow:1.09,inc:5},effect:function(state,level){state.gatherRate.manual=1+level+Math.floor(Math.pow(1.05,level)-1)}},{dispName:"Auto Gather",cost:{base:1e3,pow:1.25,inc:250},effect:function(state,level,us){state.autoGatherActive=false;if(level>=1){state.autoGatherActive=true;state.gatherRate.auto=level+Math.floor(Math.pow(1.025,level)-1)}}}];var makeUS=function(ud){return{dispName:ud.dispName,ud:ud,level:0,cost:Object.assign({current:ud.cost},ud.cost)}};var getUSCostBreakdown=function(us){return{base:us.cost.base,inc:us.cost.inc*us.level,pow:Math.floor(Math.pow(us.cost.pow,us.level))}};var setUSCurrentCost=function(us,level){var bd;level=level||0;us.level=level;var bd=getUSCostBreakdown(us);us.cost.current=bd.base+bd.inc+bd.pow};var applyUSEffectToState=function(us,state,ud){ud.effect(state,us.level,us)};var setUpgradeLevel=function(us,state,level){setUSCurrentCost(us,level);applyUSEffectToState(us,state,us.ud)};var applyAllUSFromState=function(state,upgradeData){state.US.forEach(function(us,i){setUpgradeLevel(us,state,us.level)})};var createNewState=function(upgradeData){return{ver:"0.0.0",money:0,tickRate:3e3,lastTick:new Date,autoGatherActive:false,gatherRate:{manual:1,auto:0},US:upgradeData.map(function(ud){return makeUS(ud)})}};return{getState:function(){var state=createNewState(upgradeData);applyAllUSFromState(state,upgradeData);return state},buyUpgrade:function(state,usi){usi=typeof usi==="number"?state.US[usi]:usi;if(state.money>=usi.cost.current){state.money-=usi.cost.current;setUpgradeLevel(usi,state,usi.level+=1)}},manualGather:function(state){state.money+=state.gatherRate.manual},update:function(state){var now=new Date,t=now-state.lastTick,ticks=t/state.tickRate;if(state.autoGatherActive){if(ticks>=1){state.money+=state.gatherRate.auto*ticks;state.lastTick=now}}else{state.lastTick=now}}}}();var draw={};draw.background=function(ctx,canvas){ctx.fillStyle="black";ctx.fillRect(0,0,canvas.width,canvas.height)};draw.stateStatusInfo=function(ctx,state){ctx.fillStyle="white";ctx.textBaseline="top";ctx.textAlign="left";ctx.fillText("money: "+state.money.toFixed(2)+", manual: "+state.gatherRate.manual+", auto: "+state.gatherRate.auto,10,20);ctx.fillText("v"+state.ver,10,10)};draw.tickProgressBar=function(ctx,canvas,state){var t=new Date-state.lastTick,per=t/state.tickRate;if(state.autoGatherActive){ctx.fillStyle="grey";ctx.fillRect(0,canvas.height-10,canvas.width,10);ctx.fillStyle="blue";ctx.fillRect(0,canvas.height-10,canvas.width*per,10)}};draw.debugUpgrades=function(ctx,state){ctx.fillStyle="white";ctx.textBaseline="top";ctx.textAlign="left";state.US.forEach(function(uc,i){ctx.fillText("upgrade: "+uc.dispName+", level: "+uc.level,10,30+10*i)})};draw.buttonLayout=function(ctx,blObj){var i=blObj.buttons.length,b;while(i--){b=blObj.buttons[i];ctx.fillStyle="red";ctx.fillRect(b.x,b.y,b.w,b.h);ctx.fillStyle="white";ctx.textBaseline="middle";ctx.textAlign="center";ctx.fillText(b.label||"",b.x+b.w/2,b.y+b.h/2)}};var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),container=document.getElementById("canvas-app")||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;var state=game.getState();var buttons=state.US.map(function(us,i){return{x:170,y:40+32*i,w:128,h:32,label:us.dispName+" ("+us.cost.current+") ",onAction:function(pos,opt,b,e){game.buyUpgrade(state,us);b.label=us.dispName+" ("+us.cost.current+") "}}});buttons.push({x:16,y:100,w:64,h:32,label:"Gather",onAction:function(pos,opt,e){game.manualGather(state)}});var blOptions={attachTo:canvas,buttons:buttons};var blObj=u.mkButtonLayout(blOptions);var loop=function(){requestAnimationFrame(loop);draw.background(ctx,canvas);draw.tickProgressBar(ctx,canvas,state);draw.stateStatusInfo(ctx,state);draw.buttonLayout(ctx,blObj);draw.debugUpgrades(ctx,state);game.update(state)};loop();
