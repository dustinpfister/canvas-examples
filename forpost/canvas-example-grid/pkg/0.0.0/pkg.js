/*
   canvas-example-grid
   Copyright 2020 by Dustin Pfister
   https://raw.githubusercontent.com/dustinpfister/canvas-examples/master/LICENSE
 
   https://github.com/dustinpfister/canvas-examples
*/
var gridMod=function(){var createGrid=function(opt){opt=opt||{};var grid={ver:opt.ver||""};grid.canvas=opt.canvas||{width:640,height:480};grid.xOffset=opt.xOffset===undefined?5:opt.xOffset;grid.yOffset=opt.yOffset===undefined?5:opt.yOffset;grid.cellSize=opt.cellSize===undefined?32:opt.cellSize;grid.width=opt.width||4;grid.height=opt.height||2;grid.cells=createBaseCellsArray(grid.width,grid.height);grid.bounds=createBoundsObject(grid,grid.canvas);return grid};var createBaseCellsArray=function(width,height){var cells=[],i=0,len=width*height;while(i<len){cells.push({i:i,y:Math.floor(i/width),x:i%width});i+=1}return cells};var api={};api.create=createGrid;var createBoundsObject=function(grid){var xMax=grid.cellSize,yMax=grid.cellSize;return{xMax:xMax,yMax:yMax,xMin:xMax+(grid.cellSize*grid.width-(grid.canvas.width-grid.cellSize*2))*-1,yMin:yMax+(grid.cellSize*grid.height-(grid.canvas.height-grid.cellSize*2))*-1}};api.applyBounds=function(grid,bounds){bounds=bounds||grid.bounds;grid.xOffset=grid.xOffset>bounds.xMax?bounds.xMax:grid.xOffset;grid.xOffset=grid.xOffset<bounds.xMin?bounds.xMin:grid.xOffset;grid.yOffset=grid.yOffset>bounds.yMax?bounds.yMax:grid.yOffset;grid.yOffset=grid.yOffset<bounds.yMin?bounds.yMin:grid.yOffset};api.onEdge=function(grid){var bounds=createBoundsObject(grid);if(grid.xOffset>=bounds.xMax||grid.xOffset<=bounds.xMin||grid.yOffset>=bounds.yMax||grid.yOffset<=bounds.yMin){return true}return false};api.moveMap=function(grid,secs,radian,pps){secs=secs===undefined?0:secs;radian=radian===undefined?0:radian;pps=pps===undefined?0:pps;var deltaX=Math.cos(radian)*pps*secs;var deltaY=Math.sin(radian)*pps*secs;grid.xOffset+=deltaX;grid.yOffset+=deltaY};return api}();var draw={};draw.cells=function(ctx,grid,style){var ci=0,cell,cLen=grid.cells.length;ctx.strokeStyle=style||"red";while(ci<cLen){cell=grid.cells[ci];ctx.strokeRect(cell.x*grid.cellSize+grid.xOffset+.5,cell.y*grid.cellSize+grid.yOffset+.5,grid.cellSize,grid.cellSize);ci+=1}};draw.back=function(ctx,canvas){ctx.fillStyle="black";ctx.fillRect(0,0,canvas.width,canvas.height)};draw.info=function(ctx,grid){ctx.fillStyle="white";ctx.textBaseline="top";ctx.font="10px arial";ctx.fillText("offset: "+grid.xOffset.toFixed(2)+" , "+grid.yOffset.toFixed(2),5,5)};draw.ver=function(ctx,grid){ctx.fillStyle="white";ctx.textBaseline="top";ctx.font="10px arial";ctx.fillText("v"+grid.ver,5,grid.canvas.height-15)};var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),container=document.getElementById("canvas-app")||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(.5,.5);var grid=gridMod.create({ver:"0.0.0",canvas:canvas,width:16,height:8});var lt=new Date,radian=Math.PI*1.75;var loop=function(){var now=new Date,secs=(now-lt)/1e3;requestAnimationFrame(loop);gridMod.moveMap(grid,secs,radian,-128);gridMod.applyBounds(grid);if(gridMod.onEdge(grid)){radian=Math.PI*2*Math.random()}draw.back(ctx,canvas);draw.cells(ctx,grid);draw.info(ctx,grid);draw.ver(ctx,grid);lt=new Date};loop();