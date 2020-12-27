/*
   canvas-example-hyper-casual-space-shooter by Dustin Pfister
*/
var utils={};utils.mod=function(x,m){return(x%m+m)%m};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx}};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};utils.wrapRadian=function(radian){return utils.mod(radian,Math.PI*2)};utils.angleTo=function(toX,toY,fromX,fromY){return utils.wrapRadian(Math.atan2(fromY-toY,fromX-toX)+Math.PI)};utils.normalizeHalf=function(n,scale){var c=scale||Math.PI*2;var h=c/2;return utils.mod(n+h,c)-h};utils.shortestDirection=function(from,to,scale){var z=from-to;if(from===to){return 0}else if(utils.normalizeHalf(z,scale)<0){return-1}else{return+1}};utils.deepClone=function(obj){var clone={};for(var i in obj){if(typeof obj[i]=="object"&&obj[i]!=null){clone[i]=utils.deepClone(obj[i]);if(obj[i].constructor.name==="Array"){clone[i].length=Object.keys(clone[i]).length;clone[i]=Array.from(clone[i])}}else{clone[i]=obj[i]}}return clone};utils.clampPer=function(per){if(per>1){return 1}if(per<0){return 0}return per};utils.per=function(a,d,mode){mode=mode===undefined?"per":mode;if(mode==="per"){return utils.clampPer(a/d)}return a*d};utils.log1=function(a,d,mode){var per;if(mode==="per"){per=utils.per(a,d,"per");return utils.clampPer(Math.log(1+per)/Math.log(2))}per=a;return(Math.pow(2,1+per)/2-1)*d};utils.log2=function(a,d,mode,basePer,maxPer){basePer=basePer===undefined?.25:basePer;maxPer=maxPer===undefined?.75:maxPer;var logPer=utils.log1(a,d,"per"),range=maxPer-basePer,per=basePer+range*logPer;if(mode==="per"){return utils.clampPer(per)}return 0};utils.log3=function(a,d,mode,p1){mode=mode===undefined?"per":mode;p1=p1===undefined?12:p1;if(mode==="per"){var n=a;var per=utils.per(n,d,"per");return Math.log(1+per)/Math.log(2+p1)}var per=a;var base=2+p1;return(Math.pow(base,1+per)/base-1)*d};utils.xp=function(){var xpAPI={};xpAPI.createOptions=function(opt){opt=opt||{};return{levelCap:opt.levelCap||100,expCap:opt.expCap||1e3,perMethod:opt.perMethod||"log1",perArgs:opt.perArgs||[0],tableWidth:opt.tableWidth||25,tableHeight:opt.tableHeight||25,tableX:opt.tableX===undefined?0:opt.tableX,tableY:opt.tableY===undefined?0:opt.tableY}};var createLevelObject=function(xp,opt){xp=xp>=opt.expCap?opt.expCap:xp;xp=xp<0?0:xp;var l=utils[opt.perMethod].apply(null,[xp/opt.expCap,opt.levelCap,"n"].concat(opt.perArgs));l=l>=opt.levelCap?opt.levelCap-1:l;l=l<0?0:l;return{opt:opt,l:l,level:Math.round(l)+1,levelCap:opt.levelCap,perToLevelCap:l/(opt.levelCap-1),xp:xp,xpForNext:null,expCap:opt.expCap,valueOf:function(){return this.level}}};var getXPByLevel=function(l,opt){var per=utils[opt.perMethod].apply(null,[l,opt.levelCap,"per"].concat(opt.perArgs));return opt.expCap*per};var appendXPForNext=function(levelObj){if(levelObj.level<levelObj.levelCap){levelObj.xpForNext=getXPByLevel(levelObj.level,levelObj.opt)}else{levelObj.xpForNext=Infinity}};xpAPI.byLevel=function(l,opt){opt=xpAPI.createOptions(opt);l=l>=opt.levelCap?opt.levelCap-1:l;l=l<0?0:l;var per=utils[opt.perMethod].apply(null,[l,opt.levelCap,"per"].concat(opt.perArgs));var levelObj=createLevelObject(opt.expCap*per,opt);appendXPForNext(levelObj);return levelObj};xpAPI.byExp=function(xp,opt){opt=xpAPI.createOptions(opt);var levelObj=createLevelObject(xp,opt);appendXPForNext(levelObj);return levelObj};xpAPI.createTable=function(opt){opt=xpAPI.createOptions(opt);var l=0,levelObj,table={levelObjArray:[],points:[],w:opt.tableWidth,h:opt.tableHeight,x:opt.tableX,y:opt.tableY};while(l<opt.levelCap){levelObj=table.levelObjArray[l]=xpAPI.byLevel(l,opt);table.points[l]={x:table.w/(opt.levelCap-1)*levelObj.l,y:table.h-levelObj.xp/levelObj.expCap*table.h};l+=1}return table};xpAPI.createUpgrade=function(desc,levelIndex,applyToState,opt){opt=xpAPI.createOptions(opt);var upgrade=xpAPI.createTable(opt);upgrade.opt=opt;upgrade.desc=desc||"";upgrade.levelIndex=levelIndex||0;upgrade.levelObj=upgrade.levelObjArray[upgrade.levelIndex];upgrade.applyToState=applyToState||function(){};return upgrade};return xpAPI}();var poolMod=function(){var EFFECTS_MAX=10;var api={};var getInactive=function(pool){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(!obj.active){return obj}}return false};api.createDisplayObject=function(opt){var obj={type:opt.type||"",active:false,i:opt.i===undefined?null:opt.i,x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,r:opt.r===undefined?16:opt.r,radian:opt.radian===undefined?0:opt.radian,pps:opt.pps===undefined?32:opt.pps,lifespan:opt.lifespan||3,fillStyle:opt.fillStyle||"red",data:{}};return obj};var Effects={create:function(obj,opt){opt=opt||{};if(obj.effects.length<EFFECTS_MAX){obj.awardBlockMoney=true;obj.effects.push({effectType:"burn",damage:opt.damage===undefined?3:opt.damage,every:opt.every===undefined?1:opt.every,count:opt.count===undefined?5:opt.count,secs:0})}},update:function(obj,pool,state,secs){var i=obj.effects.length,effect;if(obj.effects.length===0){obj.awardBlockMoney=false}while(i--){effect=obj.effects[i];effect.secs+=secs;if(effect.secs>=effect.every){effect.secs=utils.mod(effect.secs,effect.every);if(effect.damage){obj.hp.current-=effect.damage}effect.count-=1;if(effect.count<=0){obj.effects.splice(i,1)}obj.hp.current=obj.hp.current>obj.hp.max?obj.hp.max:obj.hp.current;obj.hp.current=obj.hp.current<0?0:obj.hp.current;obj.hp.per=obj.hp.current/obj.hp.max}}}};api.createEffect=function(obj,opt){Effects.create(obj,opt)};api.getEffectStats=function(obj){var stats={};obj.effects.forEach(function(effect){stats[effect.effectType]=stats[effect.effectType]===undefined?1:stats[effect.effectType]+=1});return stats};var types={block:{spawn:function(obj,pool,state,opt){obj.effects=[];obj.effectStats={};obj.awardBlockMoney=false},update:function(obj,pool,state,secs){Effects.update(obj,pool,state,secs)}}};api.create=function(opt){opt=opt||{};opt.count=opt.count||10;opt.type=opt.type||"";var i=0,spawn=opt.spawn||function(obj,pool,state,opt){},update=opt.update||function(obj,pool,state,secs){},pool={type:opt.type,objects:[],data:opt.data||{},spawn:function(obj,pool,state,opt){if(pool.type in types){types[pool.type].spawn(obj,pool,state,opt)}spawn(obj,pool,state,opt)},purge:opt.purge||function(obj,pool,state){},update:function(obj,pool,state,opt){if(obj.effects){Effects.update(obj,pool,state,opt)}update(obj,pool,state,opt)}};while(i<opt.count){pool.objects.push(api.createDisplayObject(opt));i+=1}return pool};api.spawn=function(pool,state,opt){var obj=getInactive(pool);state=state||{};opt=opt||{};if(obj){if(!obj.active){obj.active=true;pool.spawn.call(pool,obj,pool,state,opt);return obj}}return false};api.update=function(pool,secs,state){var i=pool.objects.length,obj;state=state||{};while(i--){obj=pool.objects[i];if(obj.active){pool.update.call(pool,obj,pool,state,secs);obj.lifespan-=secs;obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;pool.purge.call(pool,obj,pool,state)}}}};api.getAllActive=function(pool,activeState){activeState=activeState===undefined?true:activeState;return pool.objects.filter(function(object){return object.active===activeState})};api.setActiveStateForAll=function(pool,bool){bool=bool===undefined?false:bool;var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];obj.active=bool}};return api}();var gameMod=function(){var GAME_MONEY_START=0,GAME_UPDATE_MAX_SECS=.8,MONEY_PERLOSS_ON_DEATH=.1,BLOCK_COUNT=20,BLOCK_POS_MAX_DIST=600,BLOCK_POS_SLOT_DIST=15,BLOCK_HP_MIN=5,BLOCK_HP_MAX=1e3,BLOCK_MONEY_BASE=1,BLOCK_MONEY_DIST=999,SHIP_AUTOFIRE=false,SHIP_HP=10,SHIP_AUTOHEAL_ENABLED=true,SHIP_AUTOHEAL_RATE=10,SHIP_AUTOHEAL_AMOUNT=1,SHIP_ROTATION_RATE_MIN=20,SHIP_ROTATION_RATE_MAX=180,SHIP_MAX_SPEED_START=64,SHIP_MAX_SPEED_MAX=1024,SHIP_ACC_START=8,SHIP_ACC_MAX=128,MAP_MAX_DIST=Math.pow(10,5),BASE_DIST=100;var WEAPONS={0:{name:"Pulse Gun",firesPerSecond:{min:2,max:10,levelOpt:{levelCap:10,expCap:1e3,perMethod:"log1",perArgs:[],tableX:160-12,tableY:120-12-30}},shotDamage:{min:1,max:Math.floor(BLOCK_HP_MAX*.05),levelOpt:{levelCap:10,expCap:1500,perMethod:"log1",perArgs:[],tableX:160-12,tableY:120-12}},effects:[{effectType:"burn",chance:.25,maxStack:5,damage:1,every:.25,count:10}],shotRange:128,shotPPS:256,shotsPerFire:[2,2,1],onFireStart:function(game,secs,state){var weapon=game.weapons[game.ship.weaponIndex];var shotIndex=0;var radianStart=state.game.map.radian;var shotsPerFire=weapon.shotsPerFire[weapon.shotsPerFireIndex];while(shotIndex<shotsPerFire){var side=shotIndex%2===0?-1:1;var dist=8;if(shotsPerFire===1){dist=0}poolMod.spawn(game.shots,state,{radian:radianStart,x:Math.sin(Math.PI-radianStart)*dist*side,y:Math.cos(Math.PI+radianStart)*dist*side});shotIndex+=1}}},1:{name:"Cannon",firesPerSecond:{min:4,max:10,levelOpt:{levelCap:10,expCap:15e3,perMethod:"log1",perArgs:[],tableX:160-12,tableY:120-12-30}},shotDamage:{min:Math.floor(BLOCK_HP_MAX*.05),max:Math.floor(BLOCK_HP_MAX*.25),levelOpt:{levelCap:10,expCap:5e4,perMethod:"log1",perArgs:[],tableX:160-12,tableY:120-12}},shotRange:256,shotsPerFire:[3,2],onFireStart:function(game,secs,state){var weapon=game.weapons[game.ship.weaponIndex];var shotIndex=0;var radianStart=state.game.map.radian-Math.PI/180*20;while(shotIndex<weapon.shotsPerFire[weapon.shotsPerFireIndex]){var shotPer=shotIndex/(weapon.shotsPerFire[weapon.shotsPerFireIndex]-1);var radianDelta=Math.PI/180*40*shotPer;poolMod.spawn(game.shots,state,{radian:radianStart+radianDelta});shotIndex+=1}}},2:{name:"Atom",firesPerSecond:{min:1,max:5,levelOpt:{levelCap:10,expCap:25e3,perMethod:"log1",perArgs:[],tableX:160-12,tableY:120-12-30}},shotDamage:{min:Math.floor(BLOCK_HP_MAX*.25),max:BLOCK_HP_MAX,levelOpt:{levelCap:10,expCap:3e4,perMethod:"log1",perArgs:[],tableX:160-12,tableY:120-12}},shotRange:64,shotsPerFire:[1]}};var create_DEFAULT_WEAPONS=function(){return Object.keys(WEAPONS).map(function(weaponKey){var weaponDATA=WEAPONS[weaponKey];return{name:weaponDATA.name,firesPerSecond:weaponDATA.firesPerSecond.min,shotDamage:weaponDATA.shotDamage.min,shotRange:weaponDATA.shotRange||64,shotsPerFire:weaponDATA.shotsPerFire||[1],onFireStart:weaponDATA.onFireStart||function(game,secs,state){poolMod.spawn(game.shots,state,{radian:state.game.map.radian})},shotPPS:weaponDATA.shotPPS||128,shotsPerFireIndex:0,effects:weaponDATA.effects||[]}})};var append_WEAPON_UPGRADES=function(){Object.keys(WEAPONS).forEach(function(weaponKey){var weapon=WEAPONS[weaponKey];["firesPerSecond","shotDamage"].forEach(function(weaponProp){levelOpt=utils.deepClone(weapon[weaponProp].levelOpt||{});levelOpt.levelCap=levelOpt.levelCap||30;levelOpt.expCap=levelOpt.expCap||1e4;levelOpt.perArgs=levelOpt.perArgs||[0];var upgrade={id:"w-"+weaponKey+"-"+weaponProp,desc:weapon.name+" "+weaponProp,applyToState:function(game,levelObj,upgrade){var weaponIndex=Number(upgrade.id.split("-")[1]),weapon=game.weapons[weaponIndex],weaponDATA=WEAPONS[weaponIndex],weaponProp=upgrade.id.split("-")[2];var delta=weaponDATA[weaponProp].max-weaponDATA[weaponProp].min;weapon[weaponProp]=weaponDATA[weaponProp].min+delta*levelObj.perToLevelCap},levelOpt:levelOpt};DEFAULT_UPGRADES.push(upgrade)})})};var DEFAULT_WEAPONS=create_DEFAULT_WEAPONS();var BASE_BUTTONS={main:{0:{desc:"Weapons",x:64,y:-32,r:16,onClick:function(game){game.buttons.currentPage="weapons"}},1:{desc:"Ship",x:64,y:32,r:16,onClick:function(game){game.buttons.currentPage="ship"}}},weapons:{0:{desc:"Back",x:64,y:0,r:16,onClick:function(game){game.buttons.currentPage="main"}},1:{desc:"Change Weapon",x:64,y:32,r:16,onClick:function(game){game.ship.weaponIndex+=1;game.ship.weaponIndex=utils.mod(game.ship.weaponIndex,Object.keys(game.weapons).length);game.ship.weapon=game.weapons[game.ship.weaponIndex];updateButtons(game)}},2:{desc:"Fires Per Second",x:-64,y:-32,r:16,cost:0,type:"weaponUpgrade",weaponProp:"firesPerSecond",onClick:function(game,button){var upgradeID="w-"+game.ship.weaponIndex+"-firesPerSecond",upgrade=getUpgradeById(game,upgradeID);buyUpgrade(game,upgrade);upgrade.applyToState(game,upgrade.levelObj,upgrade);button.cost=upgrade.levelObj.xpForNext}},3:{desc:"Damage",x:-64,y:0,r:16,cost:0,type:"weaponUpgrade",weaponProp:"shotDamage",onClick:function(game,button){var upgradeID="w-"+game.ship.weaponIndex+"-shotDamage",upgrade=getUpgradeById(game,upgradeID);buyUpgrade(game,upgrade);upgrade.applyToState(game,upgrade.levelObj,upgrade);button.cost=upgrade.levelObj.xpForNext}}},ship:{0:{desc:"Back",x:64,y:0,r:16,onClick:function(game){game.buttons.currentPage="main"}},1:{desc:"Max Speed",x:64,y:-32,r:16,cost:0,upgradeID:"s1",onClick:function(game,button){var upgrade=button.upgrade;buyUpgrade(game,upgrade);upgrade.applyToState(game,upgrade.levelObj,upgrade);button.cost=upgrade.levelObj.xpForNext}},2:{desc:"Max Acc",x:64,y:32,r:16,cost:0,upgradeID:"s2",onClick:function(game,button){var upgrade=button.upgrade;buyUpgrade(game,upgrade);upgrade.applyToState(game,upgrade.levelObj,upgrade);button.cost=upgrade.levelObj.xpForNext}},3:{desc:"Rotation",x:64,y:64,r:16,cost:0,upgradeID:"s3",onClick:function(game,button){var upgrade=button.upgrade;buyUpgrade(game,upgrade);upgrade.applyToState(game,upgrade.levelObj,upgrade);button.cost=upgrade.levelObj.xpForNext}}}};var updateButtons=function(game){["base"].forEach(function(mode){Object.keys(game.buttons[mode]).forEach(function(pageKey){Object.keys(game.buttons[mode][pageKey]).forEach(function(buttonKey){var button=game.buttons[mode][pageKey][buttonKey];if(button.upgradeID){button.upgrade=getUpgradeById(game,button.upgradeID)}if(button.type){if(button.type==="weaponUpgrade"){var upgradeID="w-"+game.ship.weaponIndex+"-"+button.weaponProp;button.upgrade=getUpgradeById(game,upgradeID)}}if(button.upgrade&&button.cost!=undefined){button.cost=button.upgrade.levelObj.xpForNext}})})})};var DEFAULT_UPGRADES=[{id:"s1",desc:"Max Speed",applyToState:function(game,levelObj,upgrade){var delta=SHIP_MAX_SPEED_MAX-SHIP_MAX_SPEED_START;game.map.maxPPS=SHIP_MAX_SPEED_START+delta*levelObj.perToLevelCap},levelOpt:{levelCap:10,expCap:1e4,perMethod:"log1",perArgs:[],tableX:260,tableY:120-12-32}},{id:"s2",desc:"Ship Acceleration",applyToState:function(game,levelObj,upgrade){var delta=SHIP_ACC_MAX-SHIP_ACC_START;game.map.ppsDelta=SHIP_ACC_START+delta*levelObj.perToLevelCap},levelOpt:{levelCap:10,expCap:7500,perMethod:"log1",perArgs:[],tableX:260,tableY:120-12+32}},{id:"s3",desc:"Rotation",applyToState:function(game,levelObj,upgrade){var delta=SHIP_ROTATION_RATE_MAX-SHIP_ROTATION_RATE_MIN;game.map.degreesPerSecond=SHIP_ROTATION_RATE_MIN+delta*levelObj.perToLevelCap},levelOpt:{levelCap:10,expCap:5e3,perMethod:"log1",perArgs:[],tableX:260,tableY:120-12+64}}];append_WEAPON_UPGRADES();var getUpgradeById=function(game,id){var i=game.upgrades.length;while(i--){var upgrade=game.upgrades[i];if(id===upgrade.id){return upgrade}}return false};var buyUpgrade=function(game,upgrade){var lvCurrent=upgrade.levelObj,lvNext;if(lvCurrent.level<upgrade.opt.levelCap){lvNext=upgrade.levelObjArray[lvCurrent.level];if(game.money>=lvNext.xp){upgrade.levelIndex=lvNext.level-1;upgrade.levelObj=lvNext;game.money-=lvNext.xp}else{}}else{}};var api={};var CreateHPObject=function(maxHP){return{current:maxHP||100,max:maxHP||100,per:1,autoHeal:{enabled:false,rate:5,amount:-1,secs:0}}};var autoHealObject=function(obj,secs){if(obj.hp){if(obj.hp.autoHeal.enabled){obj.hp.autoHeal.secs+=secs;if(obj.hp.autoHeal.secs>=obj.hp.autoHeal.rate){obj.hp.current+=obj.hp.autoHeal.amount;obj.hp.current=obj.hp.current>obj.hp.max?obj.hp.max:obj.hp.current;obj.hp.current=obj.hp.current<0?0:obj.hp.current;obj.hp.per=obj.hp.current/obj.hp.max;obj.hp.autoHeal.secs=0}}else{obj.hp.autoHeal.secs=0}}};var onShipDeath=function(game){game.ship=createShip(game);game.map.x=0;game.map.y=0;game.map.pps=0;poolMod.getAllActive(game.blocks).forEach(function(block){block.active=false;block.lifespan=0});game.money=game.money>0?game.money*(1-MONEY_PERLOSS_ON_DEATH):0};var attackObject=function(game,obj,damage){if(obj.hp){obj.hp.current-=damage;obj.hp.current=obj.hp.current<0?0:obj.hp.current;obj.hp.per=obj.hp.current/obj.hp.max;if(obj.hp.current===0&&obj.type==="ship"){onShipDeath(game)}}};var createShotsPool=function(){return poolMod.create({count:60,fillStyle:"red",r:2,spawn:function(shot,pool,state,opt){var weapon=state.game.ship.weapon,range=weapon.shotRange||32;shot.x=opt.x===undefined?0:opt.x;shot.y=opt.y===undefined?0:opt.y;shot.radian=opt.radian;shot.pps=weapon.shotPPS;shot.lifespan=1/shot.pps*range;shot.damage=weapon.shotDamage;shot.effects=[];weapon.effects.forEach(function(effect){var roll=Math.random();if(roll<effect.chance){shot.effects.push(effect)}})},update:function(shot,pool,state,secs){var objDeltaX=Math.cos(shot.radian)*shot.pps*secs;var objDeltaY=Math.sin(shot.radian)*shot.pps*secs;shot.x+=objDeltaX;shot.y+=objDeltaY;var blocks=poolMod.getAllActive(state.game.blocks,true);var i=blocks.length;while(i--){var block=blocks[i];var dist=utils.distance(shot.x,shot.y,block.x,block.y);if(dist<=block.r+shot.r){shot.lifespan=0;attackObject(state.game,block,shot.damage);shot.effects.forEach(function(effect){var stackCount=block.effectStats[effect.effectType]||0;if(stackCount<effect.maxStack){poolMod.createEffect(block,effect)}});if(block.hp.current<=0){state.game.money+=block.money;block.lifespan=0;block.active=false}break}}}})};var getFreePositions=function(game,blockPool){var map=game.map,activeBlocks=poolMod.getAllActive(blockPool||game.blocks,true),xMapAjust=utils.mod(game.map.x,32),yMapAjust=utils.mod(game.map.y,32),spotX,spotY,blockIndex,block,free=[],gridH=10,gridW=10,slotDist=BLOCK_POS_SLOT_DIST,sx=Math.ceil(Math.cos(game.map.radian)*(gridH/2+slotDist)-gridW/2),sy=Math.ceil(Math.sin(game.map.radian)*(gridH/2+slotDist)-gridH/2),x=sx,y=sy;while(y<gridH+sy){x=sx;spotY=y*32-yMapAjust;loopx:while(x<gridW+sx){spotX=x*32-xMapAjust;blockIndex=activeBlocks.length;while(blockIndex--){block=activeBlocks[blockIndex];if(utils.distance(block.x,block.y,spotX,spotY)<=block.r){x+=1;continue loopx}}free.push({x:spotX,y:spotY});x+=1}y+=1}return free};var positionBlock=function(state,obj){var game=state.game;var freeSlots=getFreePositions(game);if(freeSlots.length===0){obj.active=false;obj.lifespan=0}else{var slot=freeSlots.splice(Math.floor(freeSlots.length*Math.random()),1)[0];obj.x=slot.x;obj.y=slot.y}};var createBlocksPool=function(){return poolMod.create({type:"block",data:{},fillStyle:"#1a1a1a",count:BLOCK_COUNT,spawn:function(obj,pool,state,opt){var game=state.game;positionBlock(state,obj);obj.radian=utils.wrapRadian(game.map.radian+Math.PI);obj.pps=game.map.pps;obj.lifespan=1;obj.hp=CreateHPObject(BLOCK_HP_MIN+Math.round(BLOCK_HP_MAX-BLOCK_HP_MIN)*game.map.per);obj.damage=1;obj.money=BLOCK_MONEY_BASE+Math.round(game.map.per*BLOCK_MONEY_DIST)},update:function(obj,pool,state,secs){obj.lifespan=1;var game=state.game;var map=state.game.map;obj.radian=utils.wrapRadian(state.game.map.radian+Math.PI);obj.pps=state.game.map.pps;var objDeltaX=Math.cos(obj.radian)*obj.pps*secs;var objDeltaY=Math.sin(obj.radian)*obj.pps*secs;obj.x+=objDeltaX;obj.y+=objDeltaY;obj.data.dist=utils.distance(obj.x,obj.y,state.game.ship.x,state.game.ship.y);autoHealObject(obj,secs);if(obj.data.dist<=game.ship.r+obj.r){attackObject(game,game.ship,obj.damage);obj.lifespan=0}if(obj.data.dist>=BLOCK_POS_MAX_DIST){obj.lifespan=0}if(obj.hp.current<=0){if(obj.awardBlockMoney){game.money+=obj.money}obj.lifespan=0}obj.effectStats=poolMod.getEffectStats(obj)}})};var createShip=function(game){var ship={type:"ship",x:0,y:0,r:8,hp:CreateHPObject(SHIP_HP),fillStyle:"blue",weaponSecs:0,weaponIndex:0,weapon:game.weapons[0]};ship.hp.autoHeal.enabled=SHIP_AUTOHEAL_ENABLED;ship.hp.autoHeal.rate=SHIP_AUTOHEAL_RATE;ship.hp.autoHeal.amount=SHIP_AUTOHEAL_AMOUNT;return ship};api.create=function(){var game={money:GAME_MONEY_START,mode:"space",weapons:utils.deepClone(DEFAULT_WEAPONS),upgrades:[],ship:{},shots:createShotsPool(),blocks:createBlocksPool(),map:{x:0,y:0,degree:270,degreesPerSecond:SHIP_ROTATION_RATE_MIN,radian:0,aToOrigin:0,pps:0,ppsDelta:SHIP_ACC_START,maxPPS:SHIP_MAX_SPEED_START,dist:0,per:0},buttons:{currentPage:"main",base:utils.deepClone(BASE_BUTTONS)},baseObj:{fillStyle:"#282828",x:0,y:0,r:BASE_DIST}};game.ship=createShip(game);game.upgrades=DEFAULT_UPGRADES.map(function(upDef){var upgrade=utils.xp.createUpgrade(upDef.desc,0,upDef.applyToState,upDef.levelOpt);upgrade.id=upDef.id;upgrade.applyToState(game,upgrade.levelObj,upgrade);return upgrade});updateButtons(game);console.log(game.upgrades.map(function(upgrade){return upgrade.levelObjArray.map(function(levelObj){return levelObj.xp})}));return game};api.setMapMovement=function(game,degree,pps){game.map.radian=utils.wrapRadian(Math.PI/180*degree);game.map.pps=pps;game.map.pps=game.map.pps<0?0:game.map.pps;game.map.pps=game.map.pps>game.map.maxPPS?game.map.maxPPS:game.map.pps};var clampMapPos=function(map){if(map.dist>=MAP_MAX_DIST){var radian=utils.wrapRadian(map.radian+Math.PI);map.x=Math.cos(radian)*MAP_MAX_DIST;map.y=Math.sin(radian)*MAP_MAX_DIST}};var updateMap=function(game,secs){var map=game.map;map.x+=Math.cos(map.radian)*map.pps*secs;map.y+=Math.sin(map.radian)*map.pps*secs;map.dist=utils.distance(0,0,map.x,map.y);clampMapPos(map);map.per=game.map.dist/MAP_MAX_DIST;map.aToOrigin=utils.angleTo(0,0,map.x,map.y);autoHealObject(game.ship,secs)};var updateBlocks=function(game,secs,state){if(game.mode==="space"){poolMod.update(game.blocks,secs,state);poolMod.spawn(game.blocks,state,{})}if(game.mode==="base"){poolMod.setActiveStateForAll(game.blocks,false)}};var updateShots=function(game,secs,state){var ship=game.ship,weapon=ship.weapon;if(game.mode==="space"){ship.weaponSecs+=secs;if(SHIP_AUTOFIRE||state.input.fire){if(ship.weaponSecs>=1/weapon.firesPerSecond){weapon.onFireStart(game,secs,state);weapon.shotsPerFireIndex+=1;weapon.shotsPerFireIndex%=weapon.shotsPerFire.length;ship.weaponSecs=0}}}poolMod.update(game.shots,secs,state)};api.update=function(game,secs,state){secs=secs>GAME_UPDATE_MAX_SECS?GAME_UPDATE_MAX_SECS:secs;secs=secs<0?0:secs;if(game.map.dist>BASE_DIST&&game.mode==="base"){game.mode="space"}if(game.map.dist<=BASE_DIST&&game.mode==="space"){game.buttons.currentPage="main";game.mode="base"}game.baseObj.x=game.map.x*-1;game.baseObj.y=game.map.y*-1;updateMap(game,secs);updateBlocks(game,secs,state);updateShots(game,secs,state)};var buttonCheck=function(button,pos){if(utils.distance(button.x,button.y,pos.x-160,pos.y-120)<=button.r){return true}return false};api.checkButtons=function(game,pos,e){var buttons_mode=game.buttons[game.mode],i;if(buttons_mode){i=Object.keys(buttons_mode[game.buttons.currentPage]).length;while(i--){button=buttons_mode[game.buttons.currentPage][i];if(buttonCheck(button,pos)){button.onClick(game,button,e);break}}}};api.updateButtons=updateButtons;return api}();var draw=function(){var drawHealthBar=function(ctx,obj){if(obj.hp){if(obj.hp.per<1){ctx.beginPath();ctx.rect(obj.x-obj.r,obj.y+obj.r-5,obj.r*2,5);ctx.fillStyle="rgba(120,120,120,0.4)";ctx.fill();ctx.beginPath();ctx.rect(obj.x-obj.r,obj.y+obj.r-5,obj.r*2*obj.hp.per,5);ctx.fillStyle="rgba(0,255,0,0.4)";ctx.fill()}}};var drawArrowToBase=function(ctx,game){ctx.save();ctx.translate(160,120);var x=Math.cos(game.map.aToOrigin)*32;var y=Math.sin(game.map.aToOrigin)*32;ctx.fillStyle="red";ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();ctx.restore()};var baseObjectDraw=function(ctx,obj,render){ctx.save();ctx.translate(160,120);ctx.fillStyle=obj.fillStyle||"gray";ctx.strokeStyle=obj.strokeStyle||"white";ctx.beginPath();ctx.lineWidth=1;ctx.arc(obj.x,obj.y,obj.r,0,Math.PI*2);ctx.fill();ctx.stroke();if(render){render(ctx,obj)}if(obj.hp){drawHealthBar(ctx,obj)}ctx.restore()};var api={};api.background=function(ctx,state){var canvas=state.canvas,map=state.game.map,r=Math.floor(map.per*255);ctx.fillStyle="rgba("+r+",0,0,1)";ctx.fillRect(0,0,canvas.width,canvas.height)};api.currentMode=function(ctx,state){var game=state.game;draw.gridLines(state.ctx,state,"rgba(255,255,255,0.1)");baseObjectDraw(ctx,game.baseObj,function(){});var buttons_mode=game.buttons[game.mode];if(buttons_mode){var buttons_page=buttons_mode[game.buttons.currentPage];Object.keys(buttons_page).forEach(function(key){baseObjectDraw(ctx,buttons_page[key],function(ctx,button){ctx.fillStyle="yellow";ctx.textAlign="center";ctx.textBaseline="middle";ctx.font="8px arial";ctx.fillText(button.desc,button.x,button.y);var cost=button.cost;if(cost!=undefined){ctx.fillText(Math.ceil(button.cost)+"$",button.x,button.y+10)}})})}draw.blocks(state.ctx,state);draw.ship(state.ctx,state);draw.shots(state.ctx,state);if(game.mode==="base"){if(game.buttons.currentPage==="weapons"){var upgradeIndex=game.ship.weaponIndex*2+3;api.xpTable(ctx,game.upgrades[upgradeIndex]);api.xpTable(ctx,game.upgrades[upgradeIndex+1])}if(game.buttons.currentPage==="ship"){api.xpTable(ctx,game.upgrades[0]);api.xpTable(ctx,game.upgrades[1]);api.xpTable(ctx,game.upgrades[2])}}if(game.mode==="space"){drawArrowToBase(ctx,game)}};api.shots=function(ctx,state){var game=state.game;state.game.shots.objects.forEach(function(shot){if(shot.active){baseObjectDraw(ctx,shot,function(ctx,shot){ctx.fillStyle="yellow";ctx.textBaseline="middle";ctx.textAlign="center"})}})};api.blocks=function(ctx,state){var game=state.game;state.game.blocks.objects.forEach(function(block){if(block.active){baseObjectDraw(ctx,block,function(ctx,block){ctx.fillStyle="yellow";ctx.textBaseline="middle";ctx.textAlign="center";ctx.font="8px arial";ctx.fillText(block.effects.length+" : "+JSON.stringify(block.effectStats),block.x,block.y-8);ctx.fillText(Math.floor(block.hp.current)+"/"+Math.floor(block.hp.max),block.x,block.y);ctx.fillText(block.money.toFixed(2),block.x,block.y+8)})}})};api.ship=function(ctx,state){var game=state.game;ctx.fillStyle="rgba(0,0,255,0.2)";baseObjectDraw(ctx,game.ship,function(){var radian=game.map.radian;ctx.strokeStyle="white";ctx.beginPath();ctx.moveTo(game.ship.x+Math.cos(radian)*game.ship.r,game.ship.y+Math.sin(radian)*game.ship.r);ctx.lineTo(game.ship.x,game.ship.y);ctx.lineWidth=3;ctx.stroke()})};api.gridLines=function(ctx,state,style){var grid={cellSize:64,cellWidth:7,cellHeight:7,xOffset:state.game.map.x,yOffset:state.game.map.y},sx=grid.cellWidth*grid.cellSize/2*-1-grid.xOffset%grid.cellSize,sy=grid.cellHeight*grid.cellSize/2*-1+grid.yOffset%grid.cellSize*-1,x,y,len=grid.cellWidth*grid.cellHeight,i=0;ctx.strokeStyle=style||"red";ctx.lineWidth=1;ctx.save();ctx.translate(160,120);while(i<len){x=sx+i%grid.cellWidth*grid.cellSize;y=sy+Math.floor(i/grid.cellWidth)*grid.cellSize;ctx.beginPath();ctx.rect(x,y,grid.cellSize,grid.cellSize);ctx.stroke();i+=1}ctx.restore()};api.info=function(ctx,state){var game=state.game,ship=game.ship,w=ship.weapon,map=game.map;ctx.fillStyle="yellow";ctx.font="10px arial";ctx.textBaseline="top";ctx.textAlign="left";ctx.fillText("map pos: "+Math.floor(map.x)+" , "+Math.floor(map.y),10,10);ctx.fillText("map radian: "+map.radian.toFixed(2)+"; map pps: "+map.pps.toFixed(2)+" / "+map.maxPPS.toFixed(2),10,20);ctx.fillText("map dist: "+map.dist.toFixed(2)+" ("+Math.floor(map.per*100)+"%)",10,30);ctx.fillText("a to origin: "+map.aToOrigin.toFixed(2),10,40);ctx.fillText("weapon : "+w.name+"; damage: "+w.shotDamage.toFixed(2)+"; fps: "+w.firesPerSecond.toFixed(2),10,50);ctx.fillText("money : "+game.money.toFixed(2)+"$",10,60);ctx.fillText("mode : "+game.mode,10,70)};api.ver=function(ctx,state){ctx.fillStyle="yellow";ctx.font="10px arial";ctx.textBaseline="top";ctx.textAlign="left";ctx.fillText("v"+state.ver,5,state.canvas.height-15)};api.xpTable=function(ctx,table){table.points.forEach(function(point,i){if(i===0){ctx.beginPath();ctx.moveTo(table.x+point.x,table.y+point.y)}ctx.lineTo(table.x+point.x,table.y+point.y)});ctx.strokeStyle="green";ctx.stroke();ctx.strokeStyle="gray";ctx.beginPath();ctx.rect(table.x,table.y,table.w,table.h);ctx.stroke();if(table.levelIndex>=0){var point=table.points[table.levelIndex];ctx.strokeStyle="lime";ctx.beginPath();ctx.arc(table.x+point.x,table.y+point.y,2,0,Math.PI*2);ctx.stroke()}};return api}();var createCanvas=function(opt){opt=opt||{};opt.container=opt.container||document.getElementById("canvas-app")||document.body;opt.canvas=document.createElement("canvas");opt.ctx=opt.canvas.getContext("2d");opt.container.appendChild(opt.canvas);opt.canvas.width=opt.width===undefined?320:opt.width;opt.canvas.height=opt.height===undefined?240:opt.height;opt.ctx.translate(.5,.5);return opt};var canvasObj=createCanvas(),canvas=canvasObj.canvas;var state={ver:"0.18.0",canvas:canvas,ctx:canvasObj.ctx,game:gameMod.create(),input:{pointer:{down:false,pos:{},dir:0,dist:0},degree:0,degreesPerSecond:90,fire:false,keys:{}}};var updatePointer=function(pos){var d=Math.floor(utils.angleTo(pos.x,pos.y,160,120)/(Math.PI*2)*360);state.input.pointer.dir=utils.shortestDirection(d,Math.floor(state.input.degree),360);state.input.pointer.dist=utils.distance(pos.x,pos.y,160,120)};var numberButtonCheck=function(game,input){if(game.mode==="base"){[1,2,3].forEach(function(n){if(input.keys[n]){game.ship.weaponIndex=n-1;game.ship.weapon=game.weapons[n-1];game.buttons.currentPage="weapons";gameMod.updateButtons(game)}})}};var lt=new Date,FPS_target=1e3/30;var loop=function(){var now=new Date,t=now-lt,game=state.game,map=game.map,input=state.input,secs=t/1e3;requestAnimationFrame(loop);if(t>=FPS_target){updatePointer(input.pointer.pos);if(input.keys.w){map.pps+=map.ppsDelta*secs;map.pps=map.pps>map.maxPPS?map.maxPPS:map.pps}if(input.keys.a){map.degree+=map.degreesPerSecond*secs}if(input.keys.d){map.degree-=map.degreesPerSecond*secs}if(input.keys.s){map.pps-=map.ppsDelta*secs;map.pps=map.pps<0?0:map.pps}if(input.pointer.down&&input.pointer.dist<=32){if(input.pointer.dir===1){map.degree+=map.degreesPerSecond*secs}if(input.pointer.dir===-1){map.degree-=map.degreesPerSecond*secs}}if(input.pointer.down&&input.pointer.dist<32){var per=input.pointer.dist/32;map.pps.pps=map.maxPPS*per}input.fire=false;if(input.keys.l){input.fire=true}numberButtonCheck(game,input);map.degree=utils.mod(map.degree,360);map.radian=utils.wrapRadian(Math.PI/180*map.degree);gameMod.update(game,secs,state);draw.background(state.ctx,state);draw.currentMode(state.ctx,state);draw.info(state.ctx,state);draw.ver(state.ctx,state);lt=now}};loop();window.addEventListener("keydown",function(e){var key=e.key.toLowerCase();state.input.keys[key]=true});window.addEventListener("keyup",function(e){var key=e.key.toLowerCase();state.input.keys[key]=false});var pointerEvent=function(e){var pos=state.input.pointer.pos=utils.getCanvasRelative(e);if(e.type==="mousedown"||e.type==="touchstart"){state.input.pointer.down=true}if(e.type==="mouseup"||e.type==="touchend"){state.input.pointer.down=false;gameMod.checkButtons(state.game,pos,e)}};canvas.addEventListener("mousedown",pointerEvent);canvas.addEventListener("mousemove",pointerEvent);canvas.addEventListener("mouseup",pointerEvent);
