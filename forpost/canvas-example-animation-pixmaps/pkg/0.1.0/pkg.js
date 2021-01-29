/*
   canvas-example-animation-pixmaps by Dustin Pfister
*/
var utils={};utils.pi2=Math.PI*2;utils.createCanvas=function(opt){opt=opt||{};opt.container=opt.container||document.getElementById("canvas-app")||document.body;opt.canvas=document.createElement("canvas");opt.ctx=opt.canvas.getContext("2d");opt.canvas.className="canvas_example";opt.canvas.width=opt.width===undefined?320:opt.width;opt.canvas.height=opt.height===undefined?240:opt.height;opt.ctx.translate(.5,.5);opt.canvas.onselectstart=function(){return false};opt.canvas.style.imageRendering="pixelated";opt.ctx.imageSmoothingEnabled=false;opt.container.appendChild(opt.canvas);return opt};utils.mod=function(x,m){return(x%m+m)%m};utils.bias=function(n,d){var per=n/d;return 1-Math.abs(.5-per)/.5};utils.log1=function(n,d,base){base=base===undefined?2:base;var per=n/d;return Math.log(1+per*(base-1))/Math.log(base)};var poolMod=function(){var api={};var getInactive=function(pool){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(!obj.active){return obj}}return false};api.create=function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool={objects:[],data:opt.data||{},spawn:opt.spawn||function(obj,pool,state,opt){},purge:opt.purge||function(obj,pool,state){},update:opt.update||function(obj,pool,state,secs){}};while(i<opt.count){pool.objects.push({active:false,i:i,x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,w:opt.w===undefined?32:opt.w,h:opt.h===undefined?32:opt.h,heading:opt.heading===undefined?0:opt.heading,pps:opt.pps===undefined?32:opt.pps,lifespan:opt.lifespan||3,data:{}});i+=1}return pool};api.spawn=function(pool,state,opt){var obj=getInactive(pool);state=state||{};opt=opt||{};if(obj){if(!obj.active){obj.active=true;pool.spawn.call(pool,obj,pool,state,opt);return obj}}return false};api.update=function(pool,secs,state){var i=pool.objects.length,obj;state=state||{};while(i--){obj=pool.objects[i];if(obj.active){pool.update.call(pool,obj,pool,state,secs);obj.lifespan-=secs;obj.lifespan=obj.lifespan<0?0:obj.lifespan;obj.x+=Math.cos(obj.heading)*obj.pps*secs;obj.y+=Math.sin(obj.heading)*obj.pps*secs;if(obj.lifespan===0){obj.active=false;pool.purge.call(pool,obj,pool,state)}}}};api.setActiveStateForAll=function(pool,bool){bool=bool===undefined?false:bool;var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];obj.active=bool}};api.getAllActive=function(pool,activeState){activeState=activeState===undefined?true:activeState;return pool.objects.filter(function(object){return object.active===activeState})};api.moveByPPS=function(obj,secs){obj.x+=Math.cos(obj.heading)*obj.pps*secs;obj.y+=Math.sin(obj.heading)*obj.pps*secs};api.checkBounds=function(obj,canvas){if(obj.x>=canvas.width||obj.x<obj.w*-1||obj.y>canvas.height||obj.y<obj.h*-1){return false}return true};api.boundingBox=function(a,b){return utils.boundingBox(a.x,a.y,a.w,a.h,b.x,b.y,b.w,b.h)};return api}();var forFrame=function(){var DEFAULT_MAX_FRAME=50,DEFAULT_FRAME=0,DEFAULT_WIDTH=320,DEFAULT_HEIGHT=240;var FF_TYPES={plain:{create:function(ff){return ff},beforeCall:function(ff){return{points:[],x:0,y:0,w:32,h:32,r:0,fillStyle:"red"}},forframe_arguments:function(ff){return[ff.model,ff.frame,ff.maxFrame,ff.per]},default_forframe:function(ff,model,frame,maxFrame,per){model.x=24+(ff.width-48)*per;model.y=utils.log1(utils.bias(frame,maxFrame),1,16)*ff.height-24;model.r=Math.PI/180*360*2*per;return model},draw:function(){}},points:{create:function(ff){return ff},beforeCall:function(ff){return{points:[]}},forframe_arguments:function(ff){return[ff.model,ff.model.points,ff.per]},default_forframe:function(ff,model,points){var len=50,i=0,pointPer;while(i<len){pointPer=i/len;points.push({x:ff.width*pointPer,y:ff.height*.75-utils.log1(i,len,8)*(ff.height*.25)*ff.bias});i+=1}return ff.model},draw:function(ff,ctx,canvas,stroke,fill){ctx.beginPath();ctx.strokeStyle=stroke||"white";ff.model.points.forEach(function(point,i){if(i===0){ctx.moveTo(point.x,point.y)}else{ctx.lineTo(point.x,point.y)}});ctx.closePath();ctx.stroke();if(fill){ctx.fillStyle=fill;ctx.fill()}}}};var api={};var setFrame=function(ff,frame){ff.frame=frame;ff.frame=utils.mod(ff.frame,ff.maxFrame);ff.per=ff.frame/ff.maxFrame;ff.bias=1-Math.abs(.5-ff.per)/.5;ff.model=FF_TYPES[ff.type].beforeCall(ff);var argu=FF_TYPES[ff.type].forframe_arguments(ff);ff.model=ff.forFrame.apply(ff,[ff].concat(argu));return ff};api.create=function(opt){opt=opt||{};var ff={type:opt.type||"plain",frame:opt.frame||DEFAULT_FRAME,width:opt.width||DEFAULT_WIDTH,height:opt.height||DEFAULT_HEIGHT,maxFrame:opt.maxFrame||DEFAULT_MAX_FRAME,model:{},per:0,secs:0};ff=FF_TYPES[ff.type].create(ff);ff.forFrame=opt.forFrame||FF_TYPES[ff.type].default_forframe;ff=setFrame(ff,ff.frame);return ff};api.createPoints=function(opt){opt=opt||{};opt.type="points";return api.create(opt)};api.step=function(ff,stepFrames){stepFrames=stepFrames===undefined?1:stepFrames;stepFrames=Math.round(stepFrames);return setFrame(ff,ff.frame+stepFrames)};api.update=function(ff,secs,fps){var frames;secs=secs===undefined?0:secs;fps=fps===undefined?30:fps;ff.secs+=secs;if(ff.secs>=1/fps){frames=Math.floor(ff.secs/(1/fps));api.step(ff,frames);ff.secs=utils.mod(ff.secs,1/fps)}return ff};api.createCanvas=function(ff,ffDraw,backFill,stroke,fill){var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");canvas.width=ff.width*ff.maxFrame;canvas.height=ff.height;ffDraw=ffDraw||FF_TYPES[ff.type].draw||function(){};if(backFill){ctx.fillStyle=backFill;ctx.fillRect(0,0,canvas.width,canvas.height)}ff.frame=0;while(ff.frame<ff.maxFrame){setFrame(ff,ff.frame);ffDraw.apply(ff,[ff,ctx,canvas,stroke,fill]);ctx.translate(ff.width,0);ff.frame+=1}return{canvas:canvas,ctx:ctx,frame:0,maxFrame:ff.maxFrame,cellWidth:ff.width,cellHeight:ff.height,step:function(delta){delta=delta===undefined?1:delta;this.frame+=delta;this.frame=utils.mod(this.frame,this.maxFrame)},set:function(frame){frame=frame===undefined?0:frame;this.frame=frame;this.frame=utils.mod(this.frame,this.maxFrame)},draw:function(ctx,x,y,w,h){ctx.drawImage(this.canvas,this.cellWidth*this.frame,0,this.cellWidth,this.cellHeight,x,y,w,h)}}};return api}();var pixmapMod=function(){var api={};var plugins={};api.load=function(plug){var key=plug.name||"pix_"+Object.keys(plugins).length;plugins[key]=plug;console.log(plugins)};var createFF=function(maxFrame,w,h,pixdata,pallette){var size=w*h;return forFrame.create({maxFrame:maxFrame,width:w,height:h,forFrame:function(ff,model,frame,maxFrame,per){return{pallette:pallette,pixdata:pixdata.slice(ff.frame*size,ff.frame*size+size)}}})};var ffDraw=function(ff,ctx,canvas){var colors=ff.model.pallette;ctx.imageSmoothingEnabled=false;ff.model.pixdata.forEach(function(colorIndex,pxIndex){var x=pxIndex%ff.width,y=Math.floor(pxIndex/ff.width);if(typeof colors[colorIndex]==="string"){ctx.fillStyle=colors[colorIndex];ctx.fillRect(x,y,1,1)}})};api.create=function(opt){var pixmaps={};Object.keys(plugins).forEach(function(key){var plug=plugins[key];pixmaps[key]={};Object.keys(plug.ani).forEach(function(aniKey){var ani=plug.ani[aniKey],frameSize=ani.w*ani.h,maxFrame=ani.data.length/frameSize,palette=plug.palettes[ani.paletteIndex],ff=createFF(maxFrame,ani.w,ani.h,ani.data,palette);pixmaps[key][aniKey]=forFrame.createCanvas(ff,ffDraw)})});return pixmaps};return api}();pixmapMod.load({name:"box_basics",palettes:[[false,"black","lime","green"],["lime","black","white","gray"]],ani:{box1:{paletteIndex:0,w:8,h:8,data:[1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,2,3,3,3,3,3,1,1,2,3,3,3,3,3,1,1,2,3,3,3,3,3,1,1,2,3,3,3,3,3,1,1,2,3,3,3,3,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,2,2,2,2,1,0,0,1,2,3,3,3,1,0,0,1,2,3,3,3,1,0,0,1,2,3,3,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,2,2,1,0,0,0,0,1,2,3,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},box2:{paletteIndex:0,w:8,h:8,data:[3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,2,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0]}}});var draw={};draw.background=function(ctx,canvas){ctx.fillStyle="gray";ctx.fillRect(0,0,canvas.width,canvas.height)};draw.ffInfo=function(ctx,ff,x,y){ctx.fillStyle="white";ctx.font="10px arial";ctx.textBaseline="top";ctx.textAlign="left";ctx.fillText("frame: "+ff.frame+" / "+ff.maxFrame,x,y)};draw.ver=function(ctx,canvas,state){ctx.fillStyle="white";ctx.textBaseline="top";ctx.textAlign="left";ctx.font="10px arial";ctx.fillText("v"+state.ver,2,canvas.height-12)};var LIFESPAN=7;var canvasObj=utils.createCanvas({width:320,height:240});var state={ver:"0.1.0",pixmaps:pixmapMod.create(),canvas:canvasObj.canvas,ctx:canvasObj.ctx,lt:new Date,framesPerSec:20,secs:1};state.boxes=poolMod.create({count:20,spawn:function(obj,pool,state,opt){obj.x=state.canvas.width/2-obj.w/2;obj.y=state.canvas.height/2-obj.h/2;obj.heading=utils.pi2*Math.random();obj.pps=16+128*Math.random();obj.lifespan=1+3*Math.random();obj.pixmapKey="box_basics";obj.aniKey=["box1","box2"][Math.floor(Math.random()*2)];obj.frameIndex=0;obj.secs=0},update:function(obj,pool,state,secs){obj.secs+=secs;if(obj.secs>=.25){obj.frameIndex+=1;obj.frameIndex%=3;obj.secs%=.25}}});var loop=function(){var now=new Date,secs=(now-state.lt)/1e3;requestAnimationFrame(loop);state.secs+=secs;if(state.secs>=1/state.framesPerSec){draw.background(state.ctx,state.canvas);state.boxes.objects.forEach(function(box){if(box.active){state.pixmaps[box.pixmapKey][box.aniKey].set(box.frameIndex);state.pixmaps[box.pixmapKey][box.aniKey].draw(state.ctx,box.x,box.y,box.w,box.h)}});draw.ver(state.ctx,state.canvas,state);poolMod.spawn(state.boxes,state,{});poolMod.update(state.boxes,state.secs,state);state.secs=0}state.lt=now};loop();
