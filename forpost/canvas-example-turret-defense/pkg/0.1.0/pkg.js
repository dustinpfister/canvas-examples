/*
   canvas-example-turret-defense
   Copyright 2020 - 2021 by Dustin Pfister
   https://raw.githubusercontent.com/dustinpfister/canvas-examples/master/LICENSE
 
   https://github.com/dustinpfister/canvas-examples
*/
var utils={};utils.noop=function(){};utils.mod=function(x,m){return(x%m+m)%m};utils.normalizeHalf=function(n,scale){var c=scale||360,h=c/2;return utils.mod(n+h,c)-h};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};utils.angleDistance=function(a,b,scale){var m=scale||360,h=m/2,diff=utils.normalizeHalf(a-b);if(diff>h){diff=diff-m}return Math.abs(diff)};utils.getAngleToPoint=function(pt1,pt2){return utils.normalizeHalf(Math.atan2(pt1.y-pt2.y,pt1.x-pt2.x))};utils.shortestAngleDirection=function(a1,a2){var z=a1-a2,x=utils.normalizeHalf(z);if(x<0){return-1}if(x>0){return 1}return 0};utils.boundingBox=function(x1,y1,w1,h1,x2,y2,w2,h2){return!(y1+h1<y2||y1>y2+h2||x1+w1<x2||x1>x2+w2)};utils.createCanvas=function(opt){opt=opt||{};opt.container=opt.container||document.getElementById("canvas-app")||document.body;opt.canvas=document.createElement("canvas");opt.ctx=opt.canvas.getContext("2d");opt.canvas.className="canvas_example";opt.canvas.width=opt.width===undefined?320:opt.width;opt.canvas.height=opt.height===undefined?240:opt.height;opt.ctx.translate(.5,.5);opt.canvas.onselectstart=function(){return false};opt.canvas.style.imageRendering="pixelated";opt.ctx.imageSmoothingEnabled=false;opt.container.appendChild(opt.canvas);return opt};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect(),pos={x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};pos.x=Math.floor(pos.x/canvas.scrollWidth*canvas.width);pos.y=Math.floor(pos.y/canvas.scrollHeight*canvas.height);e.preventDefault();return pos};var poolMod=function(){var api={};var getInactive=function(pool){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(!obj.active){return obj}}return false};api.create=function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool={maxSecs:opt.maxSecs||.125,objects:[],data:opt.data||{},spawn:opt.spawn||function(obj,pool,state,opt){},purge:opt.purge||function(obj,pool,state){},update:opt.update||function(obj,pool,state,secs){}};while(i<opt.count){pool.objects.push({active:false,i:i,x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,w:opt.w===undefined?32:opt.w,h:opt.h===undefined?32:opt.h,heading:opt.heading===undefined?0:opt.heading,pps:opt.pps===undefined?32:opt.pps,lifespan:opt.lifespan||3,data:{}});i+=1}return pool};api.spawn=function(pool,state,opt){var obj=getInactive(pool);state=state||{};opt=opt||{};if(obj){if(!obj.active){obj.active=true;pool.spawn.call(pool,obj,pool,state,opt);return obj}}return false};api.update=function(pool,secs,state){var i=pool.objects.length,obj;state=state||{};secs=secs>=pool.maxSecs?pool.maxSecs:secs;while(i--){obj=pool.objects[i];if(obj.active){pool.update.call(pool,obj,pool,state,secs);obj.lifespan-=secs;obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;pool.purge.call(pool,obj,pool,state)}}}};api.setActiveStateForAll=function(pool,bool){bool=bool===undefined?false:bool;var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];obj.active=bool}};api.getObjectAt=function(pool,x,y){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(obj.active){if(api.boundingBox(obj,{x:x,y:y,w:1,h:1})){return obj}}}return false};api.moveByPPS=function(obj,secs){obj.x+=Math.cos(obj.heading)*obj.pps*secs;obj.y+=Math.sin(obj.heading)*obj.pps*secs};api.moveByFramePerObj=function(obj,fp){var per=fp.frame/fp.frameMax;per=per>1?1:per;per=per<0?0:per;per=fp.rev?1-per:per;obj.x=fp.sx+Math.cos(fp.heading)*fp.dist*per;obj.y=fp.sy+Math.sin(fp.heading)*fp.dist*per};api.checkBounds=function(obj,canvas){if(obj.x>=canvas.width||obj.x<obj.w*-1||obj.y>canvas.height||obj.y<obj.h*-1){return false}return true};api.boundingBox=function(a,b){return utils.boundingBox(a.x,a.y,a.w,a.h,b.x,b.y,b.w,b.h)};api.activeCount=function(pool,activeState){activeState=activeState===undefined?true:activeState;var i=pool.objects.length,count=0;while(i--){if(pool.objects[i].active===activeState){count+=1}}return count};return api}();var waveMod=function(){var BUTTON_HEIGHT=128,BUTTON_BASE_PPS=BUTTON_HEIGHT/60,BUTTON_RUSH_PPS=BUTTON_HEIGHT/1;var api={};var spawn=function(obj,pool,sm,opt){obj.heading=Math.PI*1.5;obj.pps=pool.data.pps;obj.h=BUTTON_HEIGHT;obj.lifespan=Infinity;obj.x=opt.x||0;obj.y=opt.startY;obj.data.waveNumber=pool.data.waveNumber||0;obj.data.unitCount=pool.data.baseUnitCount;pool.data.waveNumber+=1;pool.data.toSpawn-=1};var update=function(obj,pool,sm,secs){obj.pps=pool.data.pps;poolMod.moveByPPS(obj,secs);if(obj.y<=0){obj.active=false;sm.game.onWaveStart(obj,sm);pool.data.currentWave+=1}};api.create=function(opt){opt=opt||{};opt.startY=opt.startY||0;var pool=poolMod.create({count:4,spawn:spawn,update:update,data:{sm:opt.sm||{},pps:BUTTON_BASE_PPS,baseUnitCount:opt.baseUnitCount||1,currentWave:0,waveNumber:1,waveCount:opt.waveCount||0,toSpawn:opt.waveCount,activeCount:4,rushTo:0}});pool.objects.map(function(obj,i){if(i<opt.waveCount){poolMod.spawn(pool,opt.sm,{x:opt.x,startY:opt.startY+i*BUTTON_HEIGHT})}});return{x:opt.x||0,y:opt.y||0,pool:pool}};var getLowsetActive=function(pool){var lowest={y:0,obj:{}};pool.objects.forEach(function(obj,i){if(obj.active&&obj.y>lowest.y){lowest.y=obj.y;lowest.obj=obj}});return lowest.obj};api.update=function(sm,secs){var pool=sm.game.waveButtons.pool;poolMod.update(pool,secs,sm);pool.data.activeCount=poolMod.activeCount(pool);if(pool.data.activeCount<pool.objects.length&&pool.data.toSpawn>0){var lowest=getLowsetActive(pool);poolMod.spawn(pool,sm,{startY:lowest.y+BUTTON_HEIGHT})}pool.data.pps=BUTTON_BASE_PPS;if(pool.data.rushTo>pool.data.currentWave){pool.data.pps=BUTTON_RUSH_PPS}};api.onClick=function(sm,pos){var pool=sm.game.waveButtons.pool;var obj=poolMod.getObjectAt(pool,pos.x,pos.y);if(obj){pool.data.rushTo=obj.data.waveNumber}};return api}();var gameMod=function(){var UNIT_PPS=64,UNIT_RELEASE_RATE_MIN=.25,UNIT_RELEASE_RATE_MAX=3,UNIT_HP_RANGE=[1,10];var createHPprops=function(obj,hpRange,hpPer){var HPDelta=Math.round((hpRange[1]-hpRange[0])*hpPer);obj.data.maxHP=hpRange[0]+HPDelta;obj.data.HP=obj.data.maxHP};var PLAYER_UNITS={};PLAYER_UNITS.manual={spawn:function(obj,pool,sm,opt){obj.heading=Math.PI*1.5;obj.data.facing=obj.heading;obj.data.target=null},update:function(obj,pool,sm,secs){},onClick:function(obj,pool,sm,pos,e){var unit=poolMod.getObjectAt(sm.game.unitPool,pos.x,pos.y);if(unit){unit.data.HP-=1;if(unit.data.HP<=0){unit.data.HP=0;unit.lifespan=0}}}};var api={};var playerUnitSpawn=function(obj,pool,sm,opt){obj.lifespan=Infinity;var type=opt.type||"manual";obj.data.type=type;obj.data.gridIndex=opt.gridIndex||0;var size=32,halfSize=size/2,x=sm.canvas.width/2-halfSize,y=sm.canvas.height/2-halfSize;obj.x=x;obj.y=y;obj.data.cx=obj.x+halfSize;obj.data.cy=obj.y+halfSize;createHPprops(obj,[10,10],1);PLAYER_UNITS[type].spawn(obj,pool,sm,opt)};var playerUnitUpdate=function(obj,pool,sm,secs){if(obj.data.HP===0){obj.lifespan=0}PLAYER_UNITS[obj.data.type].update(obj,pool,sm,secs)};var unitSpawn=function(obj,pool,sm,opt){var radian=Math.PI*2*Math.random(),radius=sm.canvas.width*.5;obj.x=sm.canvas.width*.5-obj.w/2+Math.cos(radian)*radius;obj.y=sm.canvas.height*.5-obj.h/2+Math.sin(radian)*radius;obj.heading=radian+Math.PI;obj.lifespan=Infinity;createHPprops(obj,UNIT_HP_RANGE,opt.hpPer);obj.damage=1};var unitUpdate=function(obj,pool,sm,secs){var cx=sm.canvas.width*.5,cy=sm.canvas.height*.5;obj.pps=UNIT_PPS;if(utils.distance(obj.x+obj.w/2,obj.y+obj.h/2,cx,cy)<=25){sm.game.playerUnitPool.objects.forEach(function(playerUnit){playerUnit.data.HP-=obj.damage;playerUnit.data.HP=playerUnit.data.HP<0?0:playerUnit.data.HP});obj.lifespan=0;obj.pps=0}poolMod.moveByPPS(obj,secs)};var onWaveStart=function(waveObj,sm){sm.game.unitQueue.unitCount+=waveObj.data.unitCount};api.create=function(opt){opt=opt||{};var game={activeCount:0,win:false,gameOver:false,unitQueue:{unitCount:0,secs:0},unitPool:poolMod.create({count:30,spawn:unitSpawn,update:unitUpdate,data:{}}),playerUnitPool:poolMod.create({count:1,spawn:playerUnitSpawn,update:playerUnitUpdate,data:{}}),waveButtons:waveMod.create({startY:64,waveCount:opt.waveCount||99,baseUnitCount:opt.baseUnitCount||10}),onWaveStart:onWaveStart};return game};api.update=function(sm,secs){var game=sm.game;if(game.unitQueue.unitCount>0){game.unitQueue.secs+=secs;var releasePer=game.unitQueue.unitCount/30;releasePer=releasePer>1?1:releasePer;var releaseDelta=(UNIT_RELEASE_RATE_MAX-UNIT_RELEASE_RATE_MIN)*(1-releasePer);game.unit_release_rate=UNIT_RELEASE_RATE_MIN+releaseDelta;if(game.unitQueue.secs>game.unit_release_rate){var waveData=game.waveButtons.pool.data,wavePer=waveData.currentWave/waveData.waveCount;var unit=poolMod.spawn(game.unitPool,sm,{hpPer:wavePer});if(unit){game.unitQueue.unitCount-=1}game.unitQueue.secs=0}}if(poolMod.activeCount(game.playerUnitPool)===0){game.win=false;game.gameOver=true}var wbData=game.waveButtons.pool.data;var over=false,activeCount=poolMod.activeCount(game.unitPool);if(wbData.currentWave===wbData.waveCount){if(activeCount===0&&sm.game.unitQueue.unitCount===0){game.win=true;game.gameOver=true}}game.activeCount=activeCount;waveMod.update(sm,secs);poolMod.update(game.unitPool,secs,sm);poolMod.update(game.playerUnitPool,secs,sm)};api.click=function(game,pos,e,sm){game.playerUnitPool.objects.forEach(function(obj){var unitProfile=PLAYER_UNITS[obj.data.type];if(unitProfile.onClick){unitProfile.onClick(obj,game.playerUnitPool,sm,pos,e)}})};return api}();var forFrame=function(){var DEFAULT_MAX_FRAME=50,DEFAULT_FRAME=0,DEFAULT_WIDTH=320,DEFAULT_HEIGHT=240,FORFRAME_BUILT_IN=function(){},FFDRAW_BUILT_IN=function(){};var setFrame=function(ff,frame){ff.frame=frame;ff.frame=utils.mod(ff.frame,ff.maxFrame);ff.per=ff.frame/ff.maxFrame;ff.bias=1-Math.abs(.5-ff.per)/.5;ff.model={};var argu=[ff.model,ff.model.points,ff.per];ff.model=ff.forFrame.apply(ff,[ff].concat(argu));return ff};var api={};api.create=function(opt){opt=opt||{};var ff={type:opt.type||"plain",frame:opt.frame||DEFAULT_FRAME,width:opt.width||DEFAULT_WIDTH,height:opt.height||DEFAULT_HEIGHT,maxFrame:opt.maxFrame||DEFAULT_MAX_FRAME,model:{},per:0,secs:0};ff.forFrame=opt.forFrame||FORFRAME_BUILT_IN;ff=setFrame(ff,ff.frame);return ff};api.step=function(ff,stepFrames){stepFrames=stepFrames===undefined?1:stepFrames;stepFrames=Math.round(stepFrames);return setFrame(ff,ff.frame+stepFrames)};api.update=function(ff,secs,fps){var frames;secs=secs===undefined?0:secs;fps=fps===undefined?30:fps;ff.secs+=secs;if(ff.secs>=1/fps){frames=Math.floor(ff.secs/(1/fps));api.step(ff,frames);ff.secs=utils.mod(ff.secs,1/fps)}return ff};api.createCanvas=function(ff,ffDraw,backFill,stroke,fill){var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");canvas.width=ff.width*ff.maxFrame;canvas.height=ff.height;ffDraw=ffDraw||FFDRAW_BUILT_IN;if(backFill){ctx.fillStyle=backFill;ctx.fillRect(0,0,canvas.width,canvas.height)}ff.frame=0;while(ff.frame<ff.maxFrame){setFrame(ff,ff.frame);ffDraw.apply(ff,[ff,ctx,canvas,stroke,fill]);ctx.translate(ff.width,0);ff.frame+=1}return{canvas:canvas,ctx:ctx,frame:0,maxFrame:ff.maxFrame,cellWidth:ff.width,cellHeight:ff.height,step:function(delta){delta=delta===undefined?1:delta;this.frame+=delta;this.frame=utils.mod(this.frame,this.maxFrame)},set:function(frame){frame=frame===undefined?0:frame;this.frame=frame;this.frame=utils.mod(this.frame,this.maxFrame)},draw:function(ctx,x,y,w,h){ctx.drawImage(this.canvas,this.cellWidth*this.frame,0,this.cellWidth,this.cellHeight,x,y,w,h)}}};return api}();var pixmapMod=function(){var api={};var plugins={};api.load=function(plug){var key=plug.name||"pix_"+Object.keys(plugins).length;plugins[key]=plug;console.log(plugins)};var createFF=function(maxFrame,w,h,pixdata,pallette){var size=w*h;return forFrame.create({maxFrame:maxFrame,width:w,height:h,forFrame:function(ff,model,frame,maxFrame,per){return{pallette:pallette,pixdata:pixdata.slice(ff.frame*size,ff.frame*size+size)}}})};var ffDraw=function(ff,ctx,canvas){var colors=ff.model.pallette;ctx.imageSmoothingEnabled=false;ff.model.pixdata.forEach(function(colorIndex,pxIndex){var x=pxIndex%ff.width,y=Math.floor(pxIndex/ff.width);if(typeof colors[colorIndex]==="string"){ctx.fillStyle=colors[colorIndex];ctx.fillRect(x,y,1,1)}})};api.create=function(opt){var pixmaps={};Object.keys(plugins).forEach(function(key){var plug=plugins[key];pixmaps[key]={};Object.keys(plug.ani).forEach(function(aniKey){var ani=plug.ani[aniKey],frameSize=ani.w*ani.h,maxFrame=ani.data.length/frameSize,palette=plug.palettes[ani.paletteIndex],ff=createFF(maxFrame,ani.w,ani.h,ani.data,palette);pixmaps[key][aniKey]=forFrame.createCanvas(ff,ffDraw)})});return pixmaps};return api}();var draw=function(){var api={};api.background=function(ctx,canvas,style){ctx.globalAlpha=1;ctx.fillStyle=style||"black";ctx.fillRect(0,0,canvas.width,canvas.height)};var drawPool=function(ctx,pool,globalDraw){var i=pool.objects.length,obj;ctx.fillStyle="white";ctx.strokeStyle="black";ctx.lineWidth=3;while(i--){obj=pool.objects[i];if(obj.active){ctx.save();if(obj.data.draw){obj.data.draw(ctx,obj,i)}else{globalDraw(ctx,obj,i)}ctx.restore()}}};var globalDraw={basic:function(ctx,obj,i){ctx.fillStyle=obj.data.fill||"white";ctx.globalAlpha=obj.data.alpha||1;ctx.beginPath();ctx.rect(obj.x,obj.y,obj.w,obj.h);ctx.fill();ctx.stroke();ctx.globalAlpha=1},unit:function(ctx,obj,i){globalDraw.basic(ctx,obj,i);ctx.fillStyle="lime";var per=obj.data.HP/obj.data.maxHP;ctx.fillRect(obj.x,obj.y,obj.w*per,10)},waveButtons:function(ctx,obj,i){globalDraw.basic(ctx,obj,i);ctx.fillStyle="black";ctx.fillText(obj.data.waveNumber,obj.x+5,obj.y+5)},buttonPool:function(ctx,obj,i){var parts=obj.data.action.split("_");ctx.fillStyle=obj.data.fill||"white";ctx.translate(obj.x,obj.y);ctx.beginPath();ctx.globalAlpha=obj.data.alpha===undefined?1:obj.data.alpha;ctx.rect(0,0,obj.w,obj.h);ctx.fill();if(parts[2]==="current"){var value=sm.modeSettings[parts[3]],range=obj.data.setting.range,deltaRange=range[1]-range[0],per=(value-range[0])/deltaRange;ctx.beginPath();ctx.fillStyle="black";ctx.rect(0,0,obj.w*per,obj.h);ctx.fill()}ctx.beginPath();ctx.rect(0,0,obj.w,obj.h);ctx.globalAlpha=obj.data.alpha2===undefined?ctx.globalAlpha:obj.data.alpha2;ctx.stroke();if(obj.data.disp){ctx.fillStyle="black";ctx.textBaseline="middle";ctx.font="20px arial";ctx.textAlign="center";ctx.fillText(obj.data.disp,obj.w/2,obj.h/2)}ctx.globalAlpha=1}};api.pool=function(ctx,pool){drawPool(ctx,pool,globalDraw.basic)};api.units=function(ctx,pool){drawPool(ctx,pool,globalDraw.unit)};api.waveButtons=function(ctx,pool){drawPool(ctx,pool,globalDraw.waveButtons)};api.buttonPool=function(ctx,pool,sm){sm=sm||{};drawPool(ctx,pool,globalDraw.buttonPool)};api.resetButton=function(ctx,sm){ctx.fillStyle="white";ctx.globalAlpha=1;ctx.beginPath();var obj=sm.resetButton;ctx.rect(obj.x,obj.y,obj.w,obj.h);ctx.fill();ctx.stroke();ctx.globalAlpha=1};api.ver=function(ctx,canvas,sm){ctx.fillStyle="white";ctx.textBaseline="top";ctx.font="15px arial";ctx.textAlign="left";ctx.fillText("v"+sm.ver,canvas.width-50,canvas.height-15)};return api}();var stateMachine=function(){var api={};var STATES={};api.create=function(opt){opt=opt||{};var canvasObj=utils.createCanvas({width:640,height:480}),canvas=canvasObj.canvas,ctx=canvasObj.ctx;var sm={ver:opt.ver||"",appName:opt.appName||"",saveSlotIndex:opt.saveSlotIndex||0,debugMode:opt.debugMode||false,pixmaps:pixmapMod.create(),canvas:canvas,ctx:ctx,game:{},highScores:{},lt:new Date,currentState:"title",gameModeIndex:0,gameMode:"",modeSettingsCollection:{},modeSettings:{},trans:{active:true,inState:true,secs:0,secsTotal:.5,onDone:utils.noop},states:STATES,buttons:api.createButtonPool(20),dispObjects:api.createButtonPool(2),background:"blue"};return sm};api.createButtonPool=function(count){return poolMod.create({count:count||20,maxSecs:.25,spawn:function(obj,pool,sm,opt){obj.data=opt;obj.x=opt.hx;obj.y=opt.hy;obj.w=opt.w||128;obj.h=opt.h||32},update:function(obj,pool,sm,secs){var fp={sx:obj.data.sx||0,sy:obj.data.sy||0,dist:obj.data.dist||0,heading:obj.data.heading||0,frame:Math.round(sm.trans.secs/sm.trans.secsTotal*50),frameMax:50,rev:!sm.trans.inState};poolMod.moveByFramePerObj(obj,fp);obj.lifespan=Infinity}})};api.spawnButton=function(sm,bx,actionString,dispText,angle,poolKey){poolKey=poolKey===undefined?"buttons":poolKey;angle=angle===undefined?Math.PI*.5:angle;var sx=bx.x+Math.cos(angle)*sm.canvas.width,sy=bx.y+Math.sin(angle)*sm.canvas.width;return poolMod.spawn(sm[poolKey],sm,{action:actionString,disp:dispText,fill:"#ffffff",sx:sx,sy:sy,w:bx.w||256,h:bx.h||64,alpha:.4,alpha2:.8,dist:utils.distance(bx.x,bx.y,sx,sy),heading:utils.mod(angle+Math.PI,Math.PI*2)})};api.getButtonByAction=function(buttonPool,action){var result=buttonPool.objects.filter(function(button){return button.active&&button.data.action===action});if(result.length>=1){return result[0]}return false};api.changeState=function(sm,stateKey){sm.currentState=stateKey;sm.trans.active=true;sm.trans.inState=true;sm.trans.secs=0;poolMod.setActiveStateForAll(sm.buttons,false);poolMod.setActiveStateForAll(sm.dispObjects,false);sm.states[sm.currentState].init(sm)};api.startStateChangeTrans=function(sm,stateKey){sm.trans.active=true;sm.trans.inState=false;sm.trans.secs=0;sm.trans.onDone=function(sm){api.changeState(sm,stateKey);sm.trans.onDone=function(){};sm.trans.onDone=utils.noop}};api.updateState=function(sm,secs){if(sm.trans.active){if(sm.trans.secs<sm.trans.secsTotal){sm.trans.secs+=secs;sm.trans.secs=sm.trans.secs>sm.trans.secsTotal?sm.trans.secsTotal:sm.trans.secs;if(sm.trans.secs===sm.trans.secsTotal){sm.trans.active=false;sm.trans.onDone(sm)}}sm.states[sm.currentState].trans(sm,secs)}else{sm.states[sm.currentState].update(sm,secs)}};api.load=function(stateObj){STATES[stateObj.key]=stateObj};return api}();(function(){stateMachine.load({key:"title",init:function(sm){var x=sm.canvas.width*.5-128,y=sm.canvas.height*.3;stateMachine.spawnButton(sm,{x:x,y:y},"start_state_game","Play")},trans:function(sm,secs){poolMod.update(sm.buttons,secs,sm)},update:function(sm,secs){},draw:function(sm,ctx,canvas){draw.background(ctx,canvas,sm.background);draw.buttonPool(ctx,sm.buttons)},click:function(sm,pos,e){var button=poolMod.getObjectAt(sm.buttons,pos.x,pos.y);if(button.data.action==="start_state_game"){stateMachine.startStateChangeTrans(sm,"game")}}})})();(function(){stateMachine.load({key:"game",init:function(sm){var x=sm.canvas.width*.87,y=sm.canvas.height*.045;stateMachine.spawnButton(sm,{x:x,y:y,w:64},"start_state_title","Title");sm.game=gameMod.create({waveCount:5,baseUnitCount:10,sm:sm});poolMod.spawn(sm.game.playerUnitPool,sm,{})},trans:function(sm,secs){poolMod.update(sm.buttons,secs,sm)},update:function(sm,secs){gameMod.update(sm,secs);if(sm.game.gameOver){stateMachine.startStateChangeTrans(sm,"gameOver")}},draw:function(sm,ctx,canvas){draw.background(ctx,canvas,sm.background);draw.units(sm.ctx,sm.game.unitPool);draw.units(sm.ctx,sm.game.playerUnitPool);draw.waveButtons(sm.ctx,sm.game.waveButtons.pool);draw.buttonPool(ctx,sm.buttons);var waveButtonsPool=sm.game.waveButtons.pool,waveButtonData=waveButtonsPool.data,sx=40,sy=32;if(sm.debugMode){ctx.fillStyle="white";ctx.font="10px arial";ctx.textBaseline="top";ctx.textAlign="left";ctx.fillText("currentWave: "+waveButtonData.currentWave,sx,sy);ctx.fillText("waveCount: "+waveButtonData.waveCount,sx,sy+10);ctx.fillText("toSpawn: "+waveButtonData.toSpawn,sx,sy+20);ctx.fillText("ActiveWaveButtonCount: "+waveButtonData.activeCount,sx,sy+30);ctx.fillText("rushTo: "+waveButtonData.rushTo,sx,sy+40);ctx.fillText("Unit Count: "+sm.game.unitQueue.unitCount,sx,sy+50);ctx.fillText("Active Player Units: "+sm.game.activeCount,sx,sy+60)}},click:function(sm,pos,e){var button=poolMod.getObjectAt(sm.buttons,pos.x,pos.y);if(button){if(button.data.action==="start_state_title"){stateMachine.startStateChangeTrans(sm,"title")}}waveMod.onClick(sm,pos);gameMod.click(sm.game,pos,e,sm)}})})();(function(){stateMachine.load({key:"gameOver",init:function(sm){var x=sm.canvas.width*.5-128,y=sm.canvas.height*.3;stateMachine.spawnButton(sm,{x:x,y:y},"start_state_title","Title")},trans:function(sm,secs){poolMod.update(sm.buttons,secs,sm)},update:function(sm,secs){},draw:function(sm,ctx,canvas){draw.background(ctx,canvas,sm.background);draw.units(sm.ctx,sm.game.unitPool);draw.units(sm.ctx,sm.game.playerUnitPool);draw.buttonPool(ctx,sm.buttons);var sx=40,sy=32;if(sm.debugMode){ctx.fillStyle="white";ctx.font="10px arial";ctx.textBaseline="top";ctx.textAlign="left";ctx.fillText("gameOver?: "+sm.game.gameOver,sx,sy);ctx.fillText("Win?: "+sm.game.win,sx,sy+10)}},click:function(sm,pos,e){var button=poolMod.getObjectAt(sm.buttons,pos.x,pos.y);if(button.data.action==="start_state_title"){stateMachine.startStateChangeTrans(sm,"title")}}})})();(function(){var sm=stateMachine.create({appName:"canvas-example-massive-attack",ver:"0.1.0",debugMode:true,saveSlotIndex:0});stateMachine.changeState(sm,"title");var loop=function(){var now=new Date,secs=(now-sm.lt)/1e3;requestAnimationFrame(loop);stateMachine.updateState(sm,secs);sm.states[sm.currentState].draw(sm,sm.ctx,sm.canvas);draw.ver(sm.ctx,sm.canvas,sm);sm.lt=now};loop();sm.canvas.addEventListener("mousedown",function(e){var pos=utils.getCanvasRelative(e);sm.states[sm.currentState].click(sm,pos,e)});sm.canvas.addEventListener("touchstart",function(e){var pos=utils.getCanvasRelative(e);sm.states[sm.currentState].click(sm,pos,e)})})();
