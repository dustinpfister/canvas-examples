/*
   canvas-example-pop-the-lock
   Copyright 2020,2021 by Dustin Pfister
   https://raw.githubusercontent.com/dustinpfister/canvas-examples/master/LICENSE
 
   https://github.com/dustinpfister/canvas-examples
*/
var utils={};utils.noop=function(){};utils.isNaN=function(a){return String(a)==="NaN"&&typeof a!="string"};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};utils.boundingBox=function(x1,y1,w1,h1,x2,y2,w2,h2){return!(y1+h1<y2||y1>y2+h2||x1+w1<x2||x1>x2+w2)};utils.mod=function(x,m){return(x%m+m)%m};utils.clampPer=function(per){per=per>1?1:per;per=per<0?0:per;return per};utils.randomRange=function(a,b){var x=a,y=b;if(typeof a==="object"){x=a[0];y=a[1]}return x+(y-x)*Math.random()};utils.normalizeHalf=function(degree,scale){var halfScale=scale/2;return utils.mod(degree+halfScale,scale)-halfScale};utils.shortestDistance=function(a,b,scale){var halfScale=scale/2,diff=utils.normalizeHalf(a-b,scale);if(diff>halfScale){diff=diff-scale}return Math.abs(diff)};utils.createCanvas=function(opt){opt=opt||{};opt.container=opt.container||document.getElementById("canvas-app")||document.body;opt.canvas=document.createElement("canvas");opt.ctx=opt.canvas.getContext("2d");opt.canvas.className="canvas_example";opt.canvas.width=opt.width===undefined?320:opt.width;opt.canvas.height=opt.height===undefined?240:opt.height;opt.ctx.translate(.5,.5);opt.canvas.onselectstart=function(){return false};opt.canvas.style.imageRendering="pixelated";opt.ctx.imageSmoothingEnabled=false;opt.container.appendChild(opt.canvas);return opt};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect(),pos={x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};pos.x=Math.floor(pos.x/canvas.scrollWidth*canvas.width);pos.y=Math.floor(pos.y/canvas.scrollHeight*canvas.height);e.preventDefault();return pos};utils.save=function(appName,slotID,state){var key=appName+"-"+slotID;var str=JSON.stringify(state);localStorage.setItem(key,str)};utils.load=function(appName,slotID){var key=appName+"-"+slotID;var str=localStorage.getItem(key);if(str){try{return JSON.parse(str)}catch(e){return false}}return false};var poolMod=function(){var api={};var getInactive=function(pool){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(!obj.active){return obj}}return false};api.create=function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool={maxSecs:opt.maxSecs||.125,objects:[],data:opt.data||{},spawn:opt.spawn||function(obj,pool,state,opt){},purge:opt.purge||function(obj,pool,state){},update:opt.update||function(obj,pool,state,secs){}};while(i<opt.count){pool.objects.push({active:false,i:i,x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,w:opt.w===undefined?32:opt.w,h:opt.h===undefined?32:opt.h,heading:opt.heading===undefined?0:opt.heading,pps:opt.pps===undefined?32:opt.pps,lifespan:opt.lifespan||3,data:{}});i+=1}return pool};api.spawn=function(pool,state,opt){var obj=getInactive(pool);state=state||{};opt=opt||{};if(obj){if(!obj.active){obj.active=true;pool.spawn.call(pool,obj,pool,state,opt);return obj}}return false};api.update=function(pool,secs,state){var i=pool.objects.length,obj;state=state||{};secs=secs>=pool.maxSecs?pool.maxSecs:secs;while(i--){obj=pool.objects[i];if(obj.active){pool.update.call(pool,obj,pool,state,secs);obj.lifespan-=secs;obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;pool.purge.call(pool,obj,pool,state)}}}};api.setActiveStateForAll=function(pool,bool){bool=bool===undefined?false:bool;var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];obj.active=bool}};api.getObjectAt=function(pool,x,y){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(obj.active){if(api.boundingBox(obj,{x:x,y:y,w:1,h:1})){return obj}}}return false};api.moveByPPS=function(obj,secs){obj.x+=Math.cos(obj.heading)*obj.pps*secs;obj.y+=Math.sin(obj.heading)*obj.pps*secs};api.moveByFramePerObj=function(obj,fp){var per=fp.frame/fp.frameMax;per=per>1?1:per;per=per<0?0:per;per=fp.rev?1-per:per;obj.x=fp.sx+Math.cos(fp.heading)*fp.dist*per;obj.y=fp.sy+Math.sin(fp.heading)*fp.dist*per};api.checkBounds=function(obj,canvas){if(obj.x>=canvas.width||obj.x<obj.w*-1||obj.y>canvas.height||obj.y<obj.h*-1){return false}return true};api.boundingBox=function(a,b){return utils.boundingBox(a.x,a.y,a.w,a.h,b.x,b.y,b.w,b.h)};return api}();var gameMod=function(){var modeAPI={};var modes={};var getDistanceFromTarget=function(game){return utils.shortestDistance(game.deg.current,game.deg.target,game.deg.total)};var getInRange=function(game){return game.deg.distance<=game.deg.margin};var getTarget=function(game,degOrgin,per,rangePer){degOrgin=degOrgin===undefined?game.deg.current:degOrgin;per=utils.mod(per===undefined?0:per,1);rangePer=utils.clampPer(rangePer===undefined?1:rangePer);var halfDeg=game.deg.total/2,halfRange=halfDeg*rangePer,homeDeg=utils.mod(degOrgin+halfDeg,game.deg.total),deg=homeDeg-halfRange+halfRange*2*per;return utils.mod(Math.round(deg),game.deg.total)};var getTargetFrom=function(game,degOrgin,margin,dir){margin=margin===undefined?0:margin;dir=dir===undefined?1:dir;return utils.mod(Math.round(degOrgin+margin*dir),game.deg.total)};var getTargetRandom=modeAPI.getTargetRandom=function(game){return getTarget(game,game.deg.current,Math.random(),game.range)};var getTargetRandomTripUp=function(game){var deltaDeg=utils.randomRange(game.tripUp.degRange);return getTargetFrom(game,game.deg.current+deltaDeg*game.dir)};var newTarget=modeAPI.newTarget=function(game){if(game.tripUp.count>0){game.tripUp.count-=1;return getTargetRandomTripUp(game)}var roll=Math.random();if(roll<game.tripUp.chance){game.tripUp.count=Math.floor(utils.randomRange(game.tripUp.countRange));return getTargetRandomTripUp(game)}return getTargetRandom(game)};var api={};api.modes=modes;api.create=function(opt){opt=opt||{};var game={mode:opt.mode||"freePlay",level:1,deg:{perSec:30,current:25,target:0,total:100,margin:4,distance:0},missTrack:{canMiss:false,count:0},clickTrack:{total:0,hits:0},tripUp:{count:5,chance:.12,countRange:[3,10],degRange:[10,20]},hp:{active:false,current:5,max:10},gameOver:false,pause:true,range:.5,dir:-1,inRange:false,score:0};game.deg.target=newTarget(game);modes[game.mode].init(modeAPI,game);game.deg.distance=getDistanceFromTarget(game);game.inRange=getInRange(game);return game};api.update=function(game,secs){if(!game.pause&&!game.gameOver){game.deg.current+=game.deg.perSec*secs*game.dir}game.deg.current=utils.mod(game.deg.current,game.deg.total);game.deg.distance=getDistanceFromTarget(game);game.inRange=getInRange(game);if(game.inRange){game.missTrack.canMiss=true}if(game.missTrack.canMiss&&!game.inRange){modes[game.mode].onMiss(modeAPI,game);game.missTrack.canMiss=false}modes[game.mode].update(modeAPI,game,secs)};api.click=function(game){if(!game.pause&&!game.gameOver){game.clickTrack.total+=1;game.clickTrack.hits+=game.inRange?1:0;if(game.inRange){game.missTrack.canMiss=false;game.dir=game.dir===1?-1:1}modes[game.mode].onClick(modeAPI,game)}game.pause=false};api.loadMode=function(gameMode){console.log(gameMode);modes[gameMode.key]=gameMode};return api}();gameMod.loadMode({key:"freePlay",init:function(modeAPI,game){game.hp.active=false;game.deg.perSec=30},update:function(modeAPI,game){var hitPer=game.clickTrack.hits/game.clickTrack.total,missLoss=1-1/(game.missTrack.count+1);hitPer=utils.isNaN(hitPer)?1:hitPer;game.score=Math.floor(game.clickTrack.hits*hitPer*(1-missLoss))},onMiss:function(modeAPI,game){game.missTrack.count+=1},onClick:function(modeAPI,game){if(game.inRange){game.deg.target=modeAPI.newTarget(game)}}});gameMod.loadMode({key:"endurance",init:function(modeAPI,game){game.hp.active=true;game.hp.current=game.hp.max*.5;game.hp.perSec=.8;game.deg.perSec=20;game.deg.current=25;game.deg.target=modeAPI.getTargetRandom(game)},update:function(modeAPI,game,secs){var hits=game.clickTrack.hits;game.score=Math.floor(hits+Math.pow(1.075,hits))-1;if(game.hp.current<=0){game.gameOver=true}else{game.hp.current+=game.hp.perSec*secs;game.hp.current=game.hp.current>=game.hp.max?game.hp.max:game.hp.current}},onMiss:function(modeAPI,game){game.missTrack.count+=1;game.hp.current-=1},onClick:function(modeAPI,game){if(game.inRange){game.deg.target=modeAPI.getTargetRandom(game);game.level+=1;game.level=game.level>100?100:game.level;game.deg.perSec=20+Math.round(120*(game.level/140))}else{game.hp.current-=1}}});gameMod.loadMode({key:"sudendeath",init:function(modeAPI,game){game.hp.active=false;game.deg.perSec=20;game.deg.current=25;game.deg.target=modeAPI.getTargetRandom(game)},update:function(modeAPI,game){var hits=game.clickTrack.hits;game.score=Math.floor(hits+Math.pow(1.075,hits))-1},onMiss:function(modeAPI,game){game.missTrack.count=1;game.gameOver=true},onClick:function(modeAPI,game){if(game.inRange){game.deg.target=modeAPI.getTargetRandom(game);game.level+=1;game.level=game.level>100?100:game.level;game.deg.perSec=20+Math.round(80*(game.level/100))}else{game.gameOver=true}}});var draw=function(){var CIRCLE_RADIUS=200;var text_base_center=function(ctx){ctx.fillStyle="white";ctx.textBaseline="middle";ctx.textAlign="center"};var text_title_center=function(ctx){text_base_center(ctx);ctx.font="75px arial"};var text_big_center=function(ctx){text_base_center(ctx);ctx.font="40px arial"};var text_med_center=function(ctx){text_base_center(ctx);ctx.font="20px arial"};var text_small_center=function(ctx){text_base_center(ctx);ctx.font="15px arial"};var text_game_stats=function(ctx){ctx.fillStyle="lime";ctx.textBaseline="top";ctx.font="10px arial";ctx.textAlign="left"};var baseCircle=function(ctx,canvas){ctx.strokeStyle="white";ctx.lineWidth=6;ctx.beginPath();ctx.arc(canvas.width/2,canvas.height/2,CIRCLE_RADIUS,0,Math.PI*2);ctx.stroke()};var targetRange=function(ctx,canvas,game){ctx.strokeStyle="red";ctx.beginPath();ctx.lineWidth=8;ctx.arc(canvas.width/2,canvas.height/2,CIRCLE_RADIUS,utils.mod(game.deg.target-game.deg.margin,game.deg.total)/game.deg.total*Math.PI*2,utils.mod(game.deg.target+game.deg.margin,game.deg.total)/game.deg.total*Math.PI*2);ctx.stroke()};var current_pos=function(ctx,canvas,game){ctx.strokeStyle="blue";ctx.beginPath();ctx.lineWidth=6;var r=game.deg.current/game.deg.total*Math.PI*2,x=Math.cos(r)*CIRCLE_RADIUS+canvas.width/2,y=Math.sin(r)*CIRCLE_RADIUS+canvas.height/2;ctx.arc(x,y,10,0,Math.PI*2);ctx.stroke();ctx.fill()};var hpBar=function(ctx,canvas,game){if(game.hp.active){ctx.fillStyle="black";ctx.fillRect(canvas.width/2-50,10,100,10);ctx.fillStyle="lime";var per=game.hp.current/game.hp.max;ctx.fillRect(canvas.width/2-50,10,100*per,10)}};var api={};api.background=function(ctx,canvas,style){ctx.globalAlpha=1;ctx.fillStyle=style||"black";ctx.fillRect(0,0,canvas.width,canvas.height)};api.PTL=function(ctx,canvas,game){baseCircle(ctx,canvas);targetRange(ctx,canvas,game);current_pos(ctx,canvas,game);hpBar(ctx,canvas,game)};api.score=function(ctx,canvas,sm){var game=sm.game;text_big_center(ctx);ctx.fillText(game.score,canvas.width/2,canvas.height*.25);text_med_center(ctx);var miss=game.clickTrack.total-game.clickTrack.hits;ctx.fillText("late: "+game.missTrack.count+", miss: "+miss,canvas.width/2,canvas.height*.35);text_small_center(ctx);var hs=sm.highScores[sm.game.mode];if(hs){ctx.fillText("High Score: "+hs,canvas.width/2,canvas.height*.65)}};api.text_title=function(ctx,canvas){text_title_center(ctx);ctx.fillText("Pop The Lock",canvas.width/2,canvas.height*.125)};api.text_gameover=function(ctx,canvas,sm){var game=sm.game,sx=canvas.width/2-120,sy=canvas.height/2-25;text_big_center(ctx);ctx.fillText("Game Over",canvas.width/2,canvas.height/2-50);text_game_stats(ctx);ctx.fillText("clicks (hits/total): "+game.clickTrack.hits+"/"+game.clickTrack.total,sx,sy+10);ctx.fillText("miss count: "+game.missTrack.count,sx,sy+20);ctx.fillText("score: "+game.score,sx,sy+40)};api.ver=function(ctx,canvas,sm){ctx.fillStyle="white";ctx.textBaseline="top";ctx.font="10px arial";ctx.textAlign="left";ctx.fillText("v"+sm.ver,5,canvas.height-15)};api.pool=function(ctx,pool){var i=pool.objects.length,obj;ctx.fillStyle="white";ctx.strokeStyle="black";ctx.lineWidth=3;while(i--){obj=pool.objects[i];if(obj.active){ctx.save();ctx.fillStyle=obj.data.fill||"white";ctx.globalAlpha=obj.data.alpha||1;ctx.translate(obj.x,obj.y);ctx.beginPath();ctx.rect(0,0,obj.w,obj.h);ctx.fill();ctx.stroke();if(obj.data.disp){ctx.fillStyle="black";ctx.textBaseline="middle";ctx.font="20px arial";ctx.textAlign="center";ctx.fillText(obj.data.disp,obj.w/2,obj.h/2)}ctx.restore()}}};api.debugInfo=function(ctx,canvas,game){ctx.fillStyle="yellow";ctx.textBaseline="top";ctx.textAlign="left";ctx.globalAlpha=.35;ctx.font="20px arial";ctx.fillText("deg.current "+game.deg.current.toFixed(2),10,20);ctx.fillText("deg.target "+game.deg.target,10,40);ctx.fillText("deg.distance "+game.deg.distance.toFixed(2),10,60);ctx.fillText("trip up count: "+game.tripUp.count,10,80);ctx.fillText("inrange "+game.inRange,10,100);ctx.fillText("miss count: "+game.missTrack.count,10,120);ctx.fillText("clicks (hits/total): "+game.clickTrack.hits+"/"+game.clickTrack.total,10,140);ctx.fillText("paused: "+game.pause,10,160);ctx.fillText("mode: "+game.mode,10,180);ctx.fillText("level: "+game.level,10,200)};return api}();(function(){var canvasObj=utils.createCanvas({width:640,height:480}),canvas=canvasObj.canvas,ctx=canvasObj.ctx;var buttonPool=poolMod.create({count:5,maxSecs:.25,spawn:function(obj,pool,sm,opt){obj.data=opt;obj.x=opt.hx;obj.y=opt.hy;obj.w=opt.w||128;obj.h=opt.h||32},update:function(obj,pool,sm,secs){var fp={sx:obj.data.sx||0,sy:obj.data.sy||0,dist:obj.data.dist||0,heading:obj.data.heading||0,frame:Math.round(sm.trans.secs/sm.trans.secsTotal*50),frameMax:50,rev:!sm.trans.inState};poolMod.moveByFramePerObj(obj,fp);obj.lifespan=Infinity}});var sm={ver:"0.5.1",appName:"canvas-example-pop-the-lock",canvas:canvas,ctx:ctx,game:{},highScores:{},lt:new Date,currentState:"title",gameMode:"",trans:{active:true,inState:true,secs:0,secsTotal:.5,onDone:utils.noop},states:{},buttons:buttonPool};var changeState=function(sm,stateKey){sm.currentState=stateKey;sm.trans.active=true;sm.trans.inState=true;sm.trans.secs=0;sm.states[sm.currentState].init(sm)};var startStateChangeTrans=function(sm,stateKey){sm.trans.active=true;sm.trans.inState=false;sm.trans.secs=0;sm.trans.onDone=function(sm){changeState(sm,stateKey);sm.trans.onDone=function(){};sm.trans.onDone=utils.noop}};var updateState=function(sm,secs){if(sm.trans.active){if(sm.trans.secs<sm.trans.secsTotal){sm.trans.secs+=secs;sm.trans.secs=sm.trans.secs>sm.trans.secsTotal?sm.trans.secsTotal:sm.trans.secs;if(sm.trans.secs===sm.trans.secsTotal){sm.trans.active=false;sm.trans.onDone(sm)}}sm.states[sm.currentState].trans(sm,secs)}else{sm.states[sm.currentState].update(sm,secs)}};sm.states.title={init:function(sm){poolMod.setActiveStateForAll(sm.buttons,false);Object.keys(gameMod.modes).forEach(function(gameModeKey,i){var bool=i%2,w=250,h=64;poolMod.spawn(sm.buttons,sm,{action:"start_game_"+gameModeKey,disp:"New "+gameModeKey+" Game",sx:bool?sm.canvas.width+w:w*-1,sy:sm.canvas.height*.35+(h+10)*i,w:w,h:h,dist:sm.canvas.width*.5+w/2+(bool?w:0),heading:Math.PI*bool,rev:false})})},trans:function(sm,secs){poolMod.update(sm.buttons,secs,sm)},update:function(sm,secs){},draw:function(sm,ctx,canvas){draw.text_title(ctx,canvas,sm);draw.pool(ctx,sm.buttons)},click:function(sm,pos,e){var button=poolMod.getObjectAt(sm.buttons,pos.x,pos.y);if(button){Object.keys(gameMod.modes).forEach(function(gameModeKey,i){if(button.data.action==="start_game_"+gameModeKey){sm.gameMode=gameModeKey;startStateChangeTrans(sm,"game")}})}}};sm.states.game={init:function(sm){poolMod.setActiveStateForAll(sm.buttons,false);var margin=10;poolMod.spawn(sm.buttons,sm,{action:"set_state_gameover",disp:"Quit",sx:sm.canvas.width+80,sy:margin,dist:160+margin,heading:Math.PI,rev:false,w:80,h:80});sm.game=gameMod.create({mode:sm.gameMode})},trans:function(sm,secs){poolMod.update(sm.buttons,secs,sm)},update:function(sm,secs){gameMod.update(sm.game,secs);if(sm.game.gameOver){startStateChangeTrans(sm,"gameOver")}},draw:function(sm,ctx,canvas){draw.PTL(ctx,canvas,sm.game);draw.score(ctx,canvas,sm);draw.pool(ctx,sm.buttons);draw.debugInfo(ctx,canvas,sm.game)},click:function(sm,pos,e){var button=poolMod.getObjectAt(sm.buttons,pos.x,pos.y);if(button){if(button.data.action==="set_state_gameover"){startStateChangeTrans(sm,"gameOver")}}else{gameMod.click(sm.game)}}};sm.states.gameOver={init:function(sm){poolMod.setActiveStateForAll(sm.buttons,false);var dispText=["Title","Try Again"];["title","game"].forEach(function(stateKey,i){poolMod.spawn(sm.buttons,sm,{action:"set_state_"+stateKey,disp:dispText[i],sx:sm.canvas.width,sy:sm.canvas.height*.75-(64+20)*i,dist:256+20,heading:Math.PI,rev:false,w:256,h:64})});var highScore=sm.highScores[sm.game.mode];if(!highScore||highScore<sm.game.score){sm.highScores[sm.game.mode]=sm.game.score;utils.save(sm.appName,0,sm.highScores)}},trans:function(sm,secs){poolMod.update(sm.buttons,secs,sm)},update:function(sm,secs){},draw:function(sm,ctx,canvas){draw.PTL(ctx,canvas,sm.game);draw.background(ctx,canvas,"rgba(0,0,0,0.8)");draw.text_gameover(ctx,canvas,sm);draw.pool(ctx,sm.buttons)},click:function(sm,pos,e){var button=poolMod.getObjectAt(sm.buttons,pos.x,pos.y);if(button){["title","game"].forEach(function(stateKey,i){if(button.data.action==="set_state_"+stateKey){startStateChangeTrans(sm,stateKey)}})}}};var highScores=utils.load(sm.appName,"0");if(highScores){sm.highScores=highScores}changeState(sm,"title");var loop=function(){var now=new Date,secs=(now-sm.lt)/1e3;requestAnimationFrame(loop);updateState(sm,secs);draw.background(ctx,canvas,"#0a0a0a");sm.states[sm.currentState].draw(sm,ctx,canvas);draw.ver(ctx,canvas,sm);sm.lt=now};loop();canvas.addEventListener("mousedown",function(e){var pos=utils.getCanvasRelative(e);sm.states[sm.currentState].click(sm,pos,e)});canvas.addEventListener("touchstart",function(e){var pos=utils.getCanvasRelative(e);sm.states[sm.currentState].click(sm,pos,e)})})();
