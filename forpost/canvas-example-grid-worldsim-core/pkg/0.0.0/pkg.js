/*
   canvas-example-grid-worldsim-core
   Copyright 2020 by Dustin Pfister
   https://raw.githubusercontent.com/dustinpfister/canvas-examples/master/LICENSE
 
   https://github.com/dustinpfister/canvas-examples
*/
var u={};u.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};u.createCanvas=function(opt){opt=opt||{};opt.container=opt.container||document.getElementById("canvas-app")||document.body;opt.canvas=document.createElement("canvas");opt.ctx=opt.canvas.getContext("2d");opt.canvas.className="canvas_example";opt.canvas.width=opt.width===undefined?320:opt.width;opt.canvas.height=opt.height===undefined?240:opt.height;opt.ctx.translate(.5,.5);opt.canvas.onselectstart=function(){return false};opt.canvas.style.imageRendering="pixelated";opt.ctx.imageSmoothingEnabled=false;opt.container.appendChild(opt.canvas);return opt};var world=function(){var CELL_VALUES={sx:32,sy:32,size:32};var init={defaultValues:{before:function(state){},forCell:function(state,events,cell){cell.x=cell.i%state.width;cell.y=Math.floor(cell.i/state.width)},after:function(state){}}};var events={};var ticks={};var callHook=function(state,initObjKey,hookName,cell){hookName=hookName||"before";initObjKey=initObjKey||"defaultValues";var initObj=init[initObjKey];if(initObj[hookName]){initObj[hookName](state,events,cell)}};var createCells=function(state){var i=0,len=state.width*state.height,cell;state.cells=[];while(i<len){cell={};cell.i=i;state.cells.push(cell);i+=1}Object.keys(init).forEach(function(initObjKey){callHook(state,initObjKey,"before");i=0;while(i<len){callHook(state,initObjKey,"forCell",state.cells[i]);i+=1}callHook(state,initObjKey,"after")})};return{CELL_VALUES:CELL_VALUES,create:function(){var state={year:0,lt:new Date,yearRate:1,cells:[],width:10,height:8};createCells(state);return state},load:function(plug){if(plug.init){init[plug.key]=plug.init}if(plug.events){Object.keys(plug.events).forEach(function(eventKey){events[eventKey]=plug.events[eventKey]})}if(plug.tick){ticks[plug.key]=plug.tick}console.log("plugin: "+plug.key+" loaded.");console.log(init);console.log(events);console.log(ticks)},update:function(state){var now=new Date,t=now-state.lt,years=0,secs=t/1e3;if(secs>=state.yearRate){years=Math.floor(secs/state.yearRate);state.year+=years;state.lt=new Date(now-secs%state.yearRate*1e3);Object.keys(ticks).forEach(function(plugKey){var tick=ticks[plugKey];if(tick.before){tick.before(state,events,state.year)}if(tick.forCell){state.cells.forEach(function(cell){tick.forCell(state,events,state.year,cell)})}if(tick.after){tick.after(state,events,state.year)}})}}}}();world.load({key:"land_base",events:{fertup:{init:function(state,x,y){var i=state.cells.length,d,per,cell;while(i--){cell=state.cells[i];d=u.distance(cell.x,cell.y,x,y);per=0;if(d<=3){per=(3-d)/3}cell.land.fert+=Math.floor(10*per)}}}},init:{before:function(state,events){console.log("land_base before hook")},forCell:function(state,events,cell){console.log("land_base forCell hook");var land=cell.land={};land.fert=0;land.soil={rockPer:1,dirtPer:0}},after:function(state,events){console.log("land_base after hook");var i=6;while(i--){var x=Math.floor(state.width*Math.random()),y=Math.floor(state.height*Math.random())}state.cells.forEach(function(cell){if(cell.land.fert>10){cell.land.fert=10}})}},tick:{before:function(state,events,year){},forCell:function(state,events,year,cell){if(cell.land.fert>5){cell.land.fert-=1}},after:function(state,events,year){}}});var draw=function(){return{back:function(ctx,canvas){ctx.fillStyle="black";ctx.fillRect(0,0,canvas.width,canvas.height)},worldCells:function(ctx,state){var i=state.cells.length,x,y,r,g,b,per,cell;while(i--){cell=state.cells[i];per=1-cell.land.fert/10;r=Math.floor(100+100*per);g=Math.floor(75+75*per);b=Math.floor(25+25*per);ctx.fillStyle="rgb("+r+","+g+","+b+",1)";x=cell.x*world.CELL_VALUES.size+world.CELL_VALUES.sx;y=cell.y*world.CELL_VALUES.size+world.CELL_VALUES.sy;ctx.fillRect(x,y,world.CELL_VALUES.size,world.CELL_VALUES.size)}},infoBar:function(ctx,state){ctx.fillStyle="white";ctx.textBaseline="top";ctx.fillText("year: "+state.year,10,10)},ver:function(ctx,state){ctx.fillStyle="white";ctx.textBaseline="top";ctx.font="10px arial";ctx.fillText("v"+state.ver,5,state.canvas.height-15)}}}();var canvasObj=u.createCanvas({width:640,height:480}),canvas=canvasObj.canvas,ctx=canvasObj.ctx;var state=world.create();state.ver="0.0.0";state.canvas=canvas;var loop=function(){requestAnimationFrame(loop);world.update(state);draw.back(ctx,canvas);draw.worldCells(ctx,state);draw.infoBar(ctx,state);draw.ver(ctx,state)};loop();