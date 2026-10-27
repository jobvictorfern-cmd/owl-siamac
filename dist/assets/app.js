(() => {
  'use strict';
  const CONTACT = { phone: '5511918512948', product: 'OWL' };
  const WEIGHING = { initial: 28840, final: 32840 };
  WEIGHING.net = WEIGHING.final - WEIGHING.initial;
  const STORY_LENGTH = 1.92;
  const STORY_SCROLL_SCALE = .8085;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Avoid invalidating styles and text when the rendered value is unchanged.
  const frameStyles=new WeakMap();
  function paintStyle(element,property,value){
    let values=frameStyles.get(element);
    if(!values){values={};frameStyles.set(element,values);}
    if(values[property]===value)return;
    values[property]=value;
    element.style[property]=value;
  }
  function paintAttribute(element,name,value){
    if(element.getAttribute(name)!==value)element.setAttribute(name,value);
  }
  function paintData(element,name,value){
    if(element.dataset[name]!==value)element.dataset[name]=value;
  }
  function paintText(element,value){
    if(element.textContent!==value)element.textContent=value;
  }
  const hero = document.querySelector('.hero-scroll');
  const deferredMedia = [...hero.querySelectorAll('[data-story-src]')];
  let storyMediaReady = deferredMedia.length === 0, mediaRequest = null;
  function loadStoryMedia() {
    if(mediaRequest)return mediaRequest;
    hero.dataset.mediaState='loading';
    mediaRequest=Promise.all(deferredMedia.map(element=>new Promise((resolve,reject)=>{
      if(element.dataset.mediaLoaded==='true'){resolve();return;}
      const clear=()=>{element.removeEventListener('load',loaded);element.removeEventListener('error',failed);};
      const loaded=()=>{
        clear();
        Promise.resolve(element.decode ? element.decode() : undefined).then(()=>{
          element.dataset.mediaLoaded='true';resolve();
        },reject);
      };
      const failed=()=>{clear();reject(new Error('Image unavailable'));};
      element.addEventListener('load',loaded,{once:true});
      element.addEventListener('error',failed,{once:true});
      element.setAttribute('fetchpriority','low');
      element.setAttribute(element.tagName.toLowerCase()==='image'?'href':'src',element.dataset.storySrc);
    }))).then(()=>{
      storyMediaReady=true;
      hero.dataset.mediaState='ready';
      // Continue from the current scroll position once every full-quality image is decoded.
      renderedProgress=Math.min(renderedProgress??0,.58/STORY_LENGTH);
      requestRender();
    }).catch(()=>{
      mediaRequest=null;
      hero.dataset.mediaState='retry';
    });
    return mediaRequest;
  }
  const stickyHero = hero.querySelector('.hero-grid');
  const storyScenes = [...document.querySelectorAll('[data-scene]')];
  const truck = document.querySelector('.truck-layer');
  const cab = document.querySelector('.truck-cab');
  const storyViewport=document.querySelector('.story-viewport');
  const svgNS='http://www.w3.org/2000/svg';
  // Seven photographed rim faces; the surrounding rubber and central hubs stay fixed.
  const wheelSpecs=[
    [664,730,27,43,-3], [912,722,20,35,-2], [994,720,19.5,35,-2],
    [1249,713,13,29,-1], [1354,713,12.5,28,-1], [1399,711,11.5,27,-1], [1438,710,10.5,26,-1]
  ];
  const wheelSurface=document.createElementNS(svgNS,'svg');
  wheelSurface.setAttribute('viewBox','0 0 1536 1024');
  wheelSurface.setAttribute('class','wheel-surface');
  wheelSurface.setAttribute('aria-hidden','true');
  const wheelDefs=document.createElementNS(svgNS,'defs');
  wheelDefs.innerHTML='<radialGradient id="rim-feather"><stop offset="0" stop-color="black"/><stop offset=".22" stop-color="black"/><stop offset=".30" stop-color="white"/><stop offset=".88" stop-color="white"/><stop offset="1" stop-color="black"/></radialGradient><image id="rim-photo" href="assets/truck-layer.webp" width="1536" height="1024"/>';
  wheelSurface.append(wheelDefs);
  const wheelRotators=wheelSpecs.map(([x,y,rx,ry,tilt],i)=>{
    const a=tilt*Math.PI/180,c=Math.cos(a),n=Math.sin(a);
    const extentX=Math.hypot(rx*c,ry*n)+2,extentY=Math.hypot(rx*n,ry*c)+2;
    const mask=document.createElementNS(svgNS,'mask');
    mask.id=`rim-mask-${i}`;mask.setAttribute('maskUnits','userSpaceOnUse');
    // Rasterize only this photographed rim, not seven full-size truck masks.
    mask.setAttribute('x',String(x-extentX));mask.setAttribute('y',String(y-extentY));
    mask.setAttribute('width',String(extentX*2));mask.setAttribute('height',String(extentY*2));
    const ellipse=document.createElementNS(svgNS,'ellipse');
    Object.entries({cx:x,cy:y,rx,ry,transform:`rotate(${tilt} ${x} ${y})`,fill:'url(#rim-feather)'}).forEach(([k,v])=>ellipse.setAttribute(k,v));
    mask.append(ellipse);wheelDefs.append(mask);
    const group=document.createElementNS(svgNS,'g');group.setAttribute('mask',`url(#rim-mask-${i})`);
    const face=document.createElementNS(svgNS,'use');face.setAttribute('href','#rim-photo');
    group.append(face);wheelSurface.append(group);
    return {face,x,y,A:[rx*c,-ry*n,rx*n,ry*c],inv:[c/rx,n/rx,-n/ry,c/ry]};
  });
  document.querySelector('.truck-wheels').append(wheelSurface);
  let lastWheelAngle = null;
  function rotateRims(angle){
    if(angle === lastWheelAngle)return;
    lastWheelAngle = angle;
    const c=Math.cos(angle),n=Math.sin(angle);
    wheelRotators.forEach(({face,x,y,A,inv})=>{
      const u=A[0]*c+A[1]*n,v=-A[0]*n+A[1]*c;
      const w=A[2]*c+A[3]*n,z=-A[2]*n+A[3]*c;
      const a=u*inv[0]+v*inv[2],b=w*inv[0]+z*inv[2];
      const k=u*inv[1]+v*inv[3],d=w*inv[1]+z*inv[3];
      face.setAttribute('transform',`matrix(${a.toFixed(6)} ${b.toFixed(6)} ${k.toFixed(6)} ${d.toFixed(6)} ${(x-a*x-k*y).toFixed(4)} ${(y-b*x-d*y).toFixed(4)})`);
    });
  }
  const storyProgress = document.querySelector('.story-progress i');
  const storySteps = hero.querySelector('.story-steps');
  const stepButtons = [...storySteps.querySelectorAll('[data-story-step]')];
  const stepPositions = [.24,.58,.89,1.39,1.68,STORY_LENGTH];
  const storyAnnouncement = document.querySelector('#story-announcement');
  const heroCopy = hero.querySelector('.hero-copy');
  const heroTitleLead = hero.querySelector('.hero-title-lead');
  const heroTitleAccent = hero.querySelector('.hero-title-accent');
  const heroDescription = hero.querySelector('.hero-description');
  const paper = document.querySelector('.weighing-ticket');
  const ticketPrinter = document.querySelector('.ticket-printer');
  const ticketExpand = document.querySelector('.ticket-expand');
  const ticketDialog = document.querySelector('#ticket-preview');
  const storyWorld = document.querySelector('.story-world');
  const workflow = document.querySelector('.owl-workflow');
  const workspace = workflow.querySelector('.owl-workspace');
  const appSurface = workflow.querySelector('.owl-app-surface');
  const heroLaptopScreen = hero.querySelector('.laptop-screen');
  const vehicleWindow = workflow.querySelector('.owl-vehicle-window');
  const finalWindow = workflow.querySelector('.owl-final-window');
  const typedPlate = workflow.querySelector('#owl-typed-plate');
  const typedTrailer = workflow.querySelector('#owl-typed-trailer');
  const plateInput = workflow.querySelector('.owl-plate-input');
  const trailerInput = workflow.querySelector('.owl-trailer-input');
  const foundVehicle = workflow.querySelector('.owl-found-vehicle');
  const workspaceShade = workflow.querySelector('.owl-workspace-shade');
  const rowHighlight = workflow.querySelector('.owl-row-highlight');
  const confirmWeighing = workflow.querySelector('.owl-confirm');
  const demoPointer = workflow.querySelector('.owl-demo-pointer');
  const clickRing = demoPointer.querySelector('i');
  const computerCaption = document.querySelector('.computer-weight-caption');
  const arrowTrack=document.querySelector('#scale-arrow-track');
  const arrowTip=document.querySelector('#scale-arrow-tip');
  const physicalIndicator=hero.querySelector('.physical-indicator');
  const usbCable=hero.querySelector('.usb-cable');
  const usbPlug=hero.querySelector('.usb-plug');
  const usbPlugLayer=hero.querySelector('.usb-connector-visibility');
  const usbSocketClip=hero.querySelector('#usb-socket-clip path');
  // Match the socket's diagonal cross-section without reducing the grip's height.
  const usbPerspective=.42;
  const usbPhotoAxis=Math.atan2(Math.sin(-7*Math.PI/180),Math.cos(-7*Math.PI/180)+usbPerspective*Math.sin(-7*Math.PI/180));
  const usbOccluder=hero.querySelector('#usb-indicator-occluder');
  const laptopCompositions=[...document.querySelectorAll('.laptop-composition')];
  const ledDisplay = document.querySelector('#led-display');
  const weightLabels = ['#indicator-weight','#software-weight','#software-readout'].map(selector=>document.querySelector(selector));
  const sceneCopy = [
    {lead:'Controle cada ',accent:'pesagem.',description:'Da chegada à balança ao registro da operação.'},
    {lead:'Peso direto da ',accent:'balança.',description:'Leitura automática, sem digitação manual.'},
    {lead:'Informação no ',accent:'OWL.',description:'O peso da balança, na tela do seu sistema.'},
    {lead:'Identifique o ',accent:'veículo.',description:'Placa e reboque vinculados à operação.'},
    {lead:'Confirme a ',accent:'pesagem.',description:'Confira os pesos e finalize o registro.'},
    {lead:'Pesagem ',accent:'registrada.',description:'Pesos e fotos da operação, prontos para consulta.'}
  ];
  const clamp = n => Math.max(0, Math.min(1, n));
  const portion = (p, from, to) => clamp((p - from) / (to - from));
  const smooth = (p, from, to) => { const n = portion(p, from, to); return n * n * (3 - 2 * n); };
  const numberFormat = new Intl.NumberFormat('pt-BR');
  // The printed values and animated readouts share the same weighing data.
  paper.querySelectorAll('[data-ticket-weight]').forEach(field=>{
    field.textContent=`${numberFormat.format(WEIGHING[field.dataset.ticketWeight])} kg`;
  });
  paper.setAttribute('aria-label',`Exemplo de ticket SIAMAC com fotos de entrada e saída: peso inicial de ${numberFormat.format(WEIGHING.initial)} quilos, peso final de ${numberFormat.format(WEIGHING.final)} quilos e peso líquido de ${numberFormat.format(WEIGHING.net)} quilos`);
  workflow.querySelectorAll('[data-demo-weight]').forEach(field=>{
    field.textContent=`${numberFormat.format(WEIGHING[field.dataset.demoWeight])} kg`;
  });
  let storyStart = 0, storyRange = 1, renderPending = false, previousScene = -1, previousWeight = -1;
  let renderedProgress = null, targetProgress = 0, previousFrameTime = 0, viewportRatio=1, arrivalUnit=1;
  let workflowScale=1, screenQuad=[], workflowCamera={x:3200,y:266.5,zoom:1.16}, demoAnchors={};
  let usbPlugScale=1,usbInsertDistance=32,usbDock={x:0,y:0,dx:1,dy:0,angle:0};
  let workflowGeometry = {}, measurePending = false, animationFrame = 0, measuredSize = '';
  let stepNavigation = null, stepRequest = 0;
  let lastArrowProgress = null, lastArrowPoint, lastUsbProgress = null, lastUsbPoint;
  const ease = n => { const t=clamp(n); return t*t*t*(t*(t*6-15)+10); };
  const easeRange = (p, from, to) => ease(portion(p,from,to));

  // Cache real path geometry once. Both journeys share the same camera model.
  function prepareRoute(path,tracks=[]){
    const length=path.getTotalLength();
    tracks.forEach(line=>line.setAttribute('pathLength','1'));
    const samples=Array.from({length:121},(_,i)=>{const point=path.getPointAtLength(length*i/120);return{x:point.x,y:point.y};});
    return {path,tracks,samples,length};
  }
  const arrowRoute=prepareRoute(arrowTrack,[arrowTrack]);
  const usbTracks=[...document.querySelectorAll('.usb-track')];
  const usbRoute=prepareRoute(usbTracks[0],usbTracks);
  // Seven physical LED segments, drawn once. Only the segment classes change.
  const segments = {
    a: 'M9 2h36l6 5-6 5H9L3 7Z', b: 'M49 9l5 6v23l-5 6-5-6V15Z',
    c: 'M49 48l5 6v24l-5 6-5-6V54Z', d: 'M9 80h36l6 5-6 5H9L3 85Z',
    e: 'M5 48l5 6v24l-5 6-5-6V54Z', f: 'M5 9l5 6v23l-5 6-5-6V15Z',
    g: 'M9 41h36l6 5-6 5H9L3 46Z'
  };
  const digits = { 0:'abcdef', 1:'bc', 2:'abdeg', 3:'abcdg', 4:'bcfg', 5:'acdfg', 6:'acdefg', 7:'abc', 8:'abcdefg', 9:'abcdfg' };
  const digitPositions = [5,70,151,216,281];
  const digitGroups = digitPositions.map(x => {
    const group = document.createElementNS('http://www.w3.org/2000/svg','g');
    group.setAttribute('transform',`translate(${x} 3)`);
    Object.entries(segments).forEach(([segment, d]) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',d); path.dataset.segment = segment; path.setAttribute('class','led-off'); group.append(path);
    });
    ledDisplay.append(group); return group;
  });
  const decimal = document.createElementNS('http://www.w3.org/2000/svg','circle');
  decimal.setAttribute('cx','139');decimal.setAttribute('cy','86');decimal.setAttribute('r','3.8');decimal.setAttribute('class','led-off');ledDisplay.append(decimal);
  function drawWeight(value) {
    if (value === previousWeight) return;
    previousWeight = value;
    const formatted = numberFormat.format(value);
    const characters = String(value).padStart(5,' ');
    digitGroups.forEach((group, index) => {
      const lit = digits[characters[index]] || '';
      [...group.children].forEach(segment => paintAttribute(segment,'class',lit.includes(segment.dataset.segment)?'led-on':'led-off'));
    });
    paintAttribute(decimal,'class',value >= 1000 ? 'led-on' : 'led-off');
    paintText(weightLabels[0],`${formatted} kg`);
    paintText(weightLabels[1],formatted);
    paintText(weightLabels[2],formatted);
  }
  function routePoint(route,progress){
    const sample=progress*120,i=Math.min(119,Math.floor(sample)),f=sample-i;
    return{x:route.samples[i].x+(route.samples[i+1].x-route.samples[i].x)*f,
      y:route.samples[i].y+(route.samples[i+1].y-route.samples[i].y)*f};
  }
  function drawArrow(t){
    if(t === lastArrowProgress)return lastArrowPoint;
    lastArrowProgress = t;
    const travel=easeRange(t,.10,.83),point=routePoint(arrowRoute,travel);
    paintAttribute(arrowTrack,'stroke-dasharray',`${travel.toFixed(5)} 2`);
    paintStyle(arrowTrack,'opacity',t>0?'1':'0');
    paintStyle(arrowTip,'opacity',travel>.002?'1':'0');
    paintAttribute(arrowTip,'transform',`translate(${point.x.toFixed(3)} ${point.y.toFixed(3)})`);
    return lastArrowPoint = point;
  }
  function drawUsb(t){
    if(t === lastUsbProgress)return lastUsbPoint;
    lastUsbProgress = t;
    const approach=1-usbInsertDistance/usbRoute.length;
    const insertion=easeRange(t,.72,.86);
    const travel=approach*easeRange(t,.06,.72)+(1-approach)*insertion;
    let point=routePoint(usbRoute,travel);
    const before=routePoint(usbRoute,Math.max(0,travel-.002));
    const after=routePoint(usbRoute,Math.min(1,travel+.002));
    let angle=Math.atan2(after.y-before.y,after.x-before.x);
    if(t>=.72){
      // Follow the socket normal exactly during insertion, without a pause or curved drift.
      point={x:usbDock.x+usbDock.dx*usbInsertDistance*insertion,y:usbDock.y+usbDock.dy*usbInsertDistance*insertion};
      angle=usbDock.angle;
    }
    const rotation=angle-usbPhotoAxis;
    const a=Math.cos(rotation)*usbPlugScale,b=Math.sin(rotation)*usbPlugScale;
    const c=(Math.cos(rotation)*usbPerspective-Math.sin(rotation))*usbPlugScale;
    const d=(Math.sin(rotation)*usbPerspective+Math.cos(rotation))*usbPlugScale;
    paintStyle(usbCable,'opacity',t>0?'1':'0');
    paintStyle(usbPlugLayer,'opacity',t>0?'1':'0');
    // The notebook's stationary socket mask occludes the entering metal.
    usbRoute.tracks.forEach(line=>paintAttribute(line,'stroke-dasharray',`${travel.toFixed(6)} 2`));
    paintAttribute(usbPlug,'transform',`matrix(${a.toFixed(6)} ${b.toFixed(6)} ${c.toFixed(6)} ${d.toFixed(6)} ${point.x.toFixed(4)} ${point.y.toFixed(4)})`);
    paintData(hero,'usbConnected',String(t>=.86));
    paintData(hero,'usbInsertion',insertion.toFixed(3));
    return lastUsbPoint = {x:point.x+61.85*a-6*c,y:point.y+61.85*b-6*d};
  }
  function followCable(signal,t,source,destination,arrivalStart=.78) {
    const leave=easeRange(t,0,.22), arrive=easeRange(t,arrivalStart,1);
    const mix=(from,to,k)=>from+(to-from)*k;
    return {
      x:mix(mix(source.x,signal.x,leave),destination.x,arrive),
      y:mix(mix(source.y,signal.y,leave),destination.y,arrive),
      zoom:mix(mix(source.zoom??1.16,1.8,leave),destination.zoom??1.16,arrive)
    };
  }
  let lastWorkflowProgress=null;
  function renderWorkflow(p,screenZoom,ticketOpacity,camera,zoom){
    // Leave hidden windows untouched until they enter the scene (or the layout changes).
    const frame=Math.max(.89,Math.min(1.83,p));
    if(frame===lastWorkflowProgress)return;
    lastWorkflowProgress=frame;
    p=frame;
    paintStyle(workflow,'opacity',String(p<.9?0:1-ticketOpacity));
    paintStyle(workflow,'visibility',p<.9||ticketOpacity===1?'hidden':'visible');
    paintStyle(heroLaptopScreen,'opacity',p<.9?'1':'0');
    paintAttribute(workflow,'aria-hidden',String(p<1.08||p>=1.82));
    if(p>=.9&&p<1.08){
      const {w,h,left,top,width,height,offsetLeft,offsetTop}=workflowGeometry;
      const destination=[[0,0],[w,0],[w,h],[0,h]];
      const quad=screenQuad.map((point,i)=>{
        const screenX=width/2+(point.x-camera.x/800*width)*zoom;
        const screenY=height/2+(point.y-camera.y/533*width*2/3)*zoom;
        const x=(screenX-left)/workflowScale-offsetLeft;
        const y=(screenY-top)/workflowScale-offsetTop;
        return [x+(destination[i][0]-x)*screenZoom,y+(destination[i][1]-y)*screenZoom];
      });
      // Project the original four screen corners onto the expanding, front-facing rectangle.
      const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=quad;
      const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3;
      const dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3;
      const determinant=dx1*dy2-dx2*dy1;
      const g=(dx3*dy2-dx2*dy3)/determinant,k=(dx1*dy3-dx3*dy1)/determinant;
      const matrix=[(x1-x0+g*x1)/w,(y1-y0+g*y1)/w,0,g/w,(x3-x0+k*x3)/h,(y3-y0+k*y3)/h,0,k/h,0,0,1,0,x0,y0,0,1];
      paintStyle(appSurface,'transform',`matrix3d(${matrix.join(',')})`);
    }else paintStyle(appSurface,'transform','none');
    const vehicleIn=easeRange(p,1.12,1.16);
    paintStyle(vehicleWindow,'opacity',String(vehicleIn*(1-easeRange(p,1.405,1.45))));
    paintStyle(vehicleWindow,'transform',`translateY(${10*(1-vehicleIn)}px) scale(${.98+.02*vehicleIn})`);
    const finalIn=easeRange(p,1.42,1.46);
    paintStyle(finalWindow,'opacity',String(finalIn));
    paintStyle(finalWindow,'transform',`translateY(${10*(1-finalIn)}px) scale(${.98+.02*finalIn})`);
    paintStyle(workspaceShade,'opacity',String(vehicleIn));
    paintStyle(rowHighlight,'opacity',String(easeRange(p,1.105,1.12)));
    paintText(typedPlate,'ABC1D23'.slice(0,Math.floor(portion(p,1.18,1.29)*7)));
    paintText(typedTrailer,'DEF4G56'.slice(0,Math.floor(portion(p,1.29,1.37)*7)));
    plateInput.classList.toggle('is-typing',p>=1.175&&p<1.29);
    trailerInput.classList.toggle('is-typing',p>=1.29&&p<1.39);
    paintStyle(foundVehicle,'opacity',String(easeRange(p,1.29,1.38)));
    confirmWeighing.classList.toggle('is-pressed',p>=1.665&&p<1.705);
    confirmWeighing.classList.toggle('is-confirmed',p>=1.71);
    const route=[
      [1.08,demoAnchors.list],[1.13,demoAnchors.list],
      [1.18,demoAnchors.plate],[1.27,demoAnchors.plate],
      [1.30,demoAnchors.trailer],[1.39,demoAnchors.trailer],
      [1.48,demoAnchors.license],[1.56,demoAnchors.license],
      [1.65,demoAnchors.confirm],[1.78,demoAnchors.confirm]
    ];
    const routeIndex=route.findIndex(([time])=>time>=p);
    const next=routeIndex<0?route.length-1:Math.max(1,routeIndex);
    const from=route[next-1],to=route[next];
    const t=easeRange(p,from[0],to[0]);
    const x=from[1].x+(to[1].x-from[1].x)*t;
    const y=from[1].y+(to[1].y-from[1].y)*t;
    paintStyle(demoPointer,'transform',`translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`);
    paintStyle(demoPointer,'opacity',String(easeRange(p,1.08,1.10)*(1-easeRange(p,1.72,1.77))));
    const click=p<1.4?portion(p,1.11,1.14):portion(p,1.665,1.715);
    paintStyle(clickRing,'opacity',String(Math.sin(click*Math.PI)*.8));
    paintStyle(clickRing,'transform',`scale(${.5+click*1.5})`);
  }
  let lastTruckProgress=null;
  function renderTruck(progress){
    const p=Math.min(progress,.27);
    if(p===lastTruckProgress)return;
    lastTruckProgress=p;
    // A cosine velocity ramp brakes to zero before the data transfer begins.
    const travelTime = portion(p+.015,0,.215);
    const brake = portion(travelTime,.65,1);
    const arrival = travelTime <= .65 ? travelTime/.825 : (.65+.35*(brake/2+Math.sin(Math.PI*brake)/(2*Math.PI)))/.825;
    const remaining=1000*(1-arrival);
    const vehicleScale=.83/(1+.00023*remaining);
    const frontX=631.12+remaining;
    const a=vehicleScale,b=vehicleScale*(-.018),k=0,d=vehicleScale;
    const frontY=668.2-.079*remaining;
    const tx=frontX-a*664-k*804,ty=frontY-b*664-d*804;
    paintStyle(truck,'transform',`matrix(${a.toFixed(7)},${b.toFixed(7)},${k.toFixed(7)},${d.toFixed(7)},${(tx*arrivalUnit).toFixed(3)},${(ty*arrivalUnit).toFixed(3)})`);
    let cabPitch=-.8*Math.sin(Math.PI*brake/2);
    if(p>=.2){const settle=portion(p,.2,.27);cabPitch=settle>=1?0:-.8*Math.exp(-5*settle)*Math.cos(2*Math.PI*1.35*settle);}
    paintStyle(cab,'transform',`rotate(${cabPitch.toFixed(4)}deg) translateY(${Math.max(0,-cabPitch)*.7}px)`);
    // Perspective-correct photo rotation on each rim. The final phase is the
    // original photograph, and angular motion decreases with the actual travel.
    const wheelAngle=(remaining+.000115*remaining*remaining)/(.83*75*.62);
    rotateRims(wheelAngle);
    paintData(hero,'rampPitch','0.000');
    paintData(hero,'wheelAngle',(wheelAngle*180/Math.PI).toFixed(2));
    paintData(hero,'frontContact',`${frontX.toFixed(2)},${frontY.toFixed(2)}`);
    paintData(hero,'cabPitch',cabPitch.toFixed(4));
    paintData(hero,'vehicleStopped',String(p>=.2));
  }
  function renderStory(progress) {
    const overall = clamp(progress);
    // Keep the ready indicator visible on a slow connection; never expose empty images.
    const timeline = Math.min(overall*STORY_LENGTH,storyMediaReady?STORY_LENGTH:.58);
    // Keep all six steps accessible when the device requests less motion.
    const p = motionPreference.matches ? (timeline<.435?.24:timeline<.755?.58:timeline<1.135?.89:timeline<1.43?1.39:timeline<1.79?1.74:1.92) : timeline;
    const firstTransfer=portion(p,.26,.45);
    const secondTransfer=portion(p,.58,.77);
    const firstSignal=drawArrow(firstTransfer);
    const secondSignal=drawUsb(secondTransfer);
    const ticketOpacity=smooth(p,1.79,1.83);
    const screenZoom=easeRange(p,.90,1.08);
    const active=p<.435?0:p<.755?1:p<1.135?2:p<1.43?3:p<1.71?4:5;
    const scaleView={x:400,y:270,zoom:.97};
    const indicatorView={x:1800,y:289.5};
    const computerView={x:3200,y:266.5};
    let camera;
    if(p<.26)camera={...scaleView};
    else if(p<=.45)camera=followCable(firstSignal,firstTransfer,scaleView,indicatorView);
    else if(p<.58)camera={...indicatorView,zoom:1.16};
    else if(p<=.77)camera=followCable(secondSignal,secondTransfer,indicatorView,computerView,.88);
    else camera={...computerView,zoom:1.16};
    if(p>.90){
      camera.x+=(workflowCamera.x-camera.x)*screenZoom;
      camera.y+=(workflowCamera.y-camera.y)*screenZoom;
      camera.zoom+=(workflowCamera.zoom-camera.zoom)*screenZoom;
    }
    // Fit the same photographed scenes into a wide, height-limited viewport.
    const zoom=camera.zoom*Math.min(1,viewportRatio/.76);
    const focusX=camera.x;
    const panY=viewportRatio*.5-camera.y/533*zoom;
    paintStyle(storyWorld,'transform',`translate3d(${(400-focusX*zoom)/4000*100}%,${panY*100}%,0) scale(${zoom})`);
    paintStyle(storyWorld,'opacity',String(1-easeRange(p,.90,1.08)));
    paintStyle(storyWorld,'visibility',p>=1.08?'hidden':'visible');
    renderWorkflow(p,screenZoom,ticketOpacity,camera,zoom);
    renderTruck(p);
    // Only the connection occupies the middle of a journey. Reveal its destination
    // after reaching the end, as the camera opens back onto the equipment.
    const stationOpacity=[
      1-easeRange(firstTransfer,.16,.36),
      easeRange(firstTransfer,.86,1)*(1-easeRange(secondTransfer,.16,.36)),
      easeRange(secondTransfer,.60,.72)
    ];
    storyScenes.forEach(scene => {
      const index=Number(scene.dataset.scene);
      if(index===5){paintStyle(scene,'opacity',String(ticketOpacity));paintStyle(scene,'transform','none');}
      else paintStyle(scene,'opacity',String(stationOpacity[index]));
      paintStyle(scene,'visibility',(index===5?ticketOpacity>0:p<1.08&&stationOpacity[index]>0)?'visible':'hidden');
      paintAttribute(scene,'aria-hidden',String(index!==active||(index===2&&p>=1.08)||(index===5&&p<1.79)));
    });
    paintStyle(computerCaption,'opacity',String(p>=.77?1-screenZoom:0));
    paintStyle(ledDisplay,'opacity',String(.20+.80*easeRange(p,.425,.45)));
    paintStyle(heroLaptopScreen,'filter',`brightness(${.70+.30*easeRange(p,.745,.77)})`);
    const ticketReveal = smooth(p,1.82,1.91);
    paintStyle(paper,'transform',`translateY(${-(1-ticketReveal)*103}%)`);
    if(ticketExpand.hidden!==(p<1.91))ticketExpand.hidden=p<1.91;
    let value=p<.45?0:p<.58?WEIGHING.initial*portion(p,.45,.58):p<.77?WEIGHING.initial:WEIGHING.initial+WEIGHING.net*portion(p,.77,.89);
    value=Math.min(WEIGHING.final,Math.round(value/20)*20);drawWeight(value);
    paintStyle(storyProgress,'transform',`scaleX(${timeline/STORY_LENGTH})`);
    paintData(hero,'storyStage',String(active));paintData(hero,'storyProgress',(timeline/STORY_LENGTH).toFixed(3));
    paintData(hero,'storyPhase',p<.9?'physical':p<1.12?'screen':p<1.43?'vehicle':p<1.71?'final':p<1.79?'confirmed':'ticket');
    const transfer=p>.26&&p<.45?'indicator':p>.58&&p<.77?'computer':'';
    paintData(hero,'storyTransition',transfer);
    if(active!==previousScene){
      const wasInitialized=previousScene!==-1;
      previousScene=active;
      stepButtons.forEach((button,index)=>{
        if(index===active)paintAttribute(button,'aria-current','step');
        else button.removeAttribute('aria-current');
      });
      const copy=sceneCopy[active];
      paintText(heroTitleLead,copy.lead);
      paintText(heroTitleAccent,copy.accent);
      paintText(heroDescription,copy.description);
      paintText(storyAnnouncement,`Etapa ${active+1} de ${sceneCopy.length}. ${copy.lead}${copy.accent} ${copy.description}`);
      if(wasInitialized && !motionPreference.matches && heroCopy.animate){
        if(heroCopy.getAnimations)heroCopy.getAnimations().forEach(animation=>animation.cancel());
        heroCopy.animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});
      }
    }
  }
  function measureStory() {
    const size=[storyViewport.clientWidth,storyViewport.clientHeight,workspace.offsetWidth,workspace.offsetHeight,stickyHero.offsetHeight,document.querySelector('.site-header').offsetHeight].join(',');
    if(size===measuredSize){requestRender();return;}
    // Mobile address-bar resizes do not interrupt a journey unless the hero actually changes size.
    cancelStepNavigation();
    measuredSize=size;
    lastWorkflowProgress=lastTruckProgress=null;
    workflowScale=Math.min(1,(storyViewport.clientWidth-12)/workspace.offsetWidth,(storyViewport.clientHeight-16)/workspace.offsetHeight);
    paintStyle(workspace,'transform',`translate(-50%,-50%) scale(${workflowScale.toFixed(5)})`);
    workflowGeometry={
      width:storyViewport.clientWidth,height:storyViewport.clientHeight,
      w:appSurface.offsetWidth,h:appSurface.offsetHeight,
      left:(storyViewport.clientWidth-workspace.offsetWidth*workflowScale)/2,
      top:(storyViewport.clientHeight-workspace.offsetHeight*workflowScale)/2,
      offsetLeft:appSurface.offsetLeft,offsetTop:appSurface.offsetTop
    };
    lastArrowProgress=lastUsbProgress=null;
    function centerInWorkspace(element){
      let x=element.offsetWidth/2,y=element.offsetHeight/2;
      for(let node=element;node&&node!==workspace;node=node.offsetParent){x+=node.offsetLeft;y+=node.offsetTop;}
      return {x,y};
    }
    demoAnchors={list:centerInWorkspace(rowHighlight),plate:centerInWorkspace(plateInput),trailer:centerInWorkspace(trailerInput),license:centerInWorkspace(workflow.querySelector('.owl-license-plate')),confirm:centerInWorkspace(confirmWeighing)};
    // Preserve the full paper proportions, including space for the printer and zoom control.
    const ticketScale=Math.max(.02,Math.min(1,(storyViewport.clientWidth-48)/594,(storyViewport.clientHeight-64)/833));
    ticketPrinter.style.setProperty('--ticket-scale',String(ticketScale));
    ticketPrinter.style.setProperty('--ticket-page-width',`${594*ticketScale+6}px`);
    ticketPrinter.style.setProperty('--ticket-page-height',`${833*ticketScale+20}px`);
    const planeHeight=storyViewport.clientWidth*2/3;
    storyWorld.style.height=`${planeHeight}px`;
    viewportRatio=storyViewport.clientHeight/planeHeight;
    arrivalUnit=storyViewport.clientWidth/1536;
    // Keep the straight arrow centered on the photographed left knob (64, 476).
    const indicatorStyle=getComputedStyle(physicalIndicator);
    const indicatorWidth=parseFloat(indicatorStyle.width),indicatorHeight=parseFloat(indicatorStyle.height);
    const indicatorX=parseFloat(getComputedStyle(physicalIndicator.parentElement).left)+parseFloat(indicatorStyle.left);
    const arrowEndX=(indicatorX+indicatorWidth*64/1536)/storyViewport.clientWidth*800;
    const arrowY=(parseFloat(indicatorStyle.top)-indicatorHeight/2+indicatorHeight*476/1024)/planeHeight*533;
    const arrowPath=`M790 ${arrowY.toFixed(4)} H${arrowEndX.toFixed(4)}`;
    if(arrowTrack.getAttribute('d')!==arrowPath){
      arrowTrack.setAttribute('d',arrowPath);
      Object.assign(arrowRoute,prepareRoute(arrowTrack,[arrowTrack]));
    }
    laptopCompositions.forEach(composition=>composition.style.setProperty('--laptop-scale',String(parseFloat(getComputedStyle(composition).width)/1536)));
    // Calibrate the cable and connector to the laptop's empty USB port.
    const hardware=getComputedStyle(laptopCompositions[0]);
    const width=parseFloat(hardware.width),height=parseFloat(hardware.height);
    // Match the flat workspace to the photographed screen's projected bounds before zooming.
    screenQuad=[[0,0],[821,0],[821,495],[0,495]].map(([x,y])=>{
      const denominator=1+.000222939937986*x-.000108093324912*y;
      const projectedX=(1.27714746692*x+.0586153780481*y+183)/denominator;
      const projectedY=(.0744080219059*x+1.04507346946*y+114)/denominator;
      return {x:3.5*storyViewport.clientWidth+parseFloat(hardware.left)+projectedX*width/1536,y:parseFloat(hardware.top)-height/2+projectedY*width/1536};
    });
    const screenWidth=Math.max(...screenQuad.map(p=>p.x))-Math.min(...screenQuad.map(p=>p.x));
    const screenX=screenQuad.reduce((sum,p)=>sum+p.x,0)/4/storyViewport.clientWidth*800;
    const screenY=screenQuad.reduce((sum,p)=>sum+p.y,0)/4/planeHeight*533;
    const sceneFit=Math.min(1,viewportRatio/.76);
    workflowCamera={x:screenX,y:screenY,zoom:appSurface.offsetWidth*workflowScale/screenWidth/sceneFit};
    const sourceX=(indicatorX+indicatorWidth*1310/1536)/storyViewport.clientWidth*800;
    const indicatorTop=parseFloat(indicatorStyle.top)-indicatorHeight/2;
    const sourceY=(indicatorTop+indicatorHeight*655/1024)/planeHeight*533;
    usbOccluder.setAttribute('transform',`translate(${indicatorX/storyViewport.clientWidth*800} ${indicatorTop/planeHeight*533}) scale(${indicatorWidth/1536/storyViewport.clientWidth*800} ${indicatorHeight/1024/planeHeight*533})`);
    const portX=2800+(parseFloat(hardware.left)+width*248/1536)/storyViewport.clientWidth*800;
    const portY=(parseFloat(hardware.top)-height/2+height*754/1024)/planeHeight*533;
    const socketUnitX=width/1536/storyViewport.clientWidth*800,socketUnitY=height/1024/planeHeight*533;
    // Photo coordinates of the upper lip and front edge: (239,738), (256,755).
    // Keep this occlusion in world space, independent of the moving plug.
    usbSocketClip.setAttribute('d',`M0 0H${portX-9*socketUnitX}V${portY-16*socketUnitY}L${portX+8*socketUnitX} ${portY+socketUnitY}V533H0Z`);
    usbPlugScale=width/storyViewport.clientWidth*800/1536*1.6;
    usbCable.style.setProperty('--usb-diameter',`${(6.15*usbPlugScale).toFixed(4)}px`);
    usbInsertDistance=23*usbPlugScale;
    const dockAngle=usbPhotoAxis,dx=Math.cos(dockAngle),dy=Math.sin(dockAngle);
    // Source photo: cable center (450,500), socket shoulder (1380,431).
    const joinX=portX-(46.5-3.45*usbPerspective)*usbPlugScale,joinY=portY+3.45*usbPlugScale;
    const approachX=joinX-usbInsertDistance*dx,approachY=joinY-usbInsertDistance*dy;
    usbDock={x:approachX,y:approachY,dx,dy,angle:dockAngle};
    const route=`M${sourceX.toFixed(4)} ${sourceY.toFixed(4)} C${(sourceX+170).toFixed(4)} ${sourceY.toFixed(4)} ${(approachX-180*dx).toFixed(4)} ${(approachY-180*dy).toFixed(4)} ${approachX.toFixed(4)} ${approachY.toFixed(4)} L${joinX.toFixed(4)} ${joinY.toFixed(4)}`;
    if(usbTracks[0].getAttribute('d')!==route){
      usbTracks.forEach(path=>path.setAttribute('d',route));
      Object.assign(usbRoute,prepareRoute(usbTracks[0],usbTracks));
    }
    const stickyHeight=stickyHero.getBoundingClientRect().height;
    // Finish the animation before sticky positioning releases the hero.
    // Briefly show the completed ticket, then release the page without an extra screen of scrolling.
    const ticketHold=Math.min(144,Math.max(96,Math.round(stickyHeight*.16)));
    hero.style.setProperty('--ticket-hold',`${ticketHold}px`);
    // Scale the full scroll distance independently of the scenes and the separate ticket hold.
    const previousExtra=parseFloat(hero.style.getPropertyValue('--workflow-extra'))||0;
    const originalRange=Math.max(1,hero.getBoundingClientRect().height-stickyHeight-ticketHold-previousExtra);
    hero.style.setProperty('--workflow-extra',`${originalRange*(STORY_LENGTH*STORY_SCROLL_SCALE-1)}px`);
    const offset = document.querySelector('.site-header').getBoundingClientRect().height;
    storyStart = hero.getBoundingClientRect().top+window.scrollY-offset;
    storyRange = Math.max(1,hero.getBoundingClientRect().height-stickyHeight-ticketHold);
    renderedProgress=null;
    requestRender();
  }
  function animateStory(time) {
    const dt=previousFrameTime?Math.max(0,time-previousFrameTime):16.67;
    previousFrameTime=time;
    const journey=stepNavigation;
    if(journey){
      if(journey.started===null)journey.started=time;
      const progress=clamp((time-journey.started)/journey.duration);
      const top=journey.from+(journey.to-journey.from)*ease(progress);
      window.scrollTo({top,behavior:'instant'});
      targetProgress=clamp((top-storyStart)/storyRange);
      // One frame drives both scrolling and the scene, without a second delayed loop.
      renderedProgress=targetProgress;
      if(progress===1){stepNavigation=null;journey.button.removeAttribute('data-destination');}
    }else if(renderedProgress===null || motionPreference.matches) renderedProgress=targetProgress;
    else renderedProgress+=(targetProgress-renderedProgress)*(1-Math.exp(-dt/95));
    const settled=Math.abs(targetProgress-renderedProgress)<.000015;
    if(settled)renderedProgress=targetProgress;
    renderStory(renderedProgress);
    if(stepNavigation || !settled)animationFrame=requestAnimationFrame(animateStory);
    else {renderPending=false;previousFrameTime=0;}
  }
  function requestRender() {
    if(!stepNavigation)targetProgress=clamp((window.scrollY-storyStart)/storyRange);
    if(targetProgress>0 && !storyMediaReady && hero.dataset.mediaState!=='retry')loadStoryMedia();
    if(renderPending || document.hidden || (!stepNavigation && targetProgress===renderedProgress))return;
    renderPending=true;
    animationFrame=requestAnimationFrame(animateStory);
  }
  function scheduleMeasure() {
    if(measurePending || document.hidden)return;
    measurePending=true;
    requestAnimationFrame(()=>{measurePending=false;measureStory();});
  }
  function configureMotion() {
    hero.classList.add('scroll-driven');
    measureStory();
  }
  function cancelStepNavigation(){
    stepRequest++;
    stepNavigation=null;
    storySteps.removeAttribute('aria-busy');
    stepButtons.forEach(button=>button.removeAttribute('data-destination'));
  }
  async function navigateToStep(index){
    cancelStepNavigation();
    const request=stepRequest,button=stepButtons[index];
    button.setAttribute('data-destination','');
    // Wait for later scenes before starting a continuous journey through them.
    if(index>1 && !storyMediaReady){
      storySteps.setAttribute('aria-busy','true');
      await loadStoryMedia();
      if(request!==stepRequest)return;
      storySteps.removeAttribute('aria-busy');
      if(!storyMediaReady){
        cancelStepNavigation();
        storyAnnouncement.textContent='Não foi possível carregar esta etapa. Tente novamente.';
        return;
      }
    }
    const from=window.scrollY;
    // The final destination is before the separate hold: keep the whole ticket pinned.
    const to=Math.max(0,storyStart+storyRange*stepPositions[index]/STORY_LENGTH);
    if(motionPreference.matches || Math.abs(to-from)<1){
      window.scrollTo({top:to,behavior:'instant'});
      cancelStepNavigation();
      requestRender();
      return;
    }
    // Give each journey 35% more time while keeping the same smooth easing.
    const duration=1.35*Math.min(3600,Math.max(650,Math.abs(to-from)*1.15));
    stepNavigation={from,to,duration,started:null,button};
    requestRender();
  }
  stepButtons.forEach((button,index)=>button.addEventListener('click',()=>navigateToStep(index)));
  // Manual input always takes over; no scroll lock and no queued destinations.
  ['wheel','touchstart','pointerdown'].forEach(event=>window.addEventListener(event,cancelStepNavigation,{passive:true}));
  window.addEventListener('keydown',event=>{
    if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape','Tab'].includes(event.key))cancelStepNavigation();
  });
  window.addEventListener('scroll',requestRender,{passive:true});
  window.addEventListener('resize',scheduleMeasure,{passive:true});
  window.addEventListener('pageshow',event=>{if(event.persisted)scheduleMeasure();});
  document.addEventListener('visibilitychange',() => {
    document.documentElement.classList.toggle('page-hidden',document.hidden);
    if(document.hidden){cancelStepNavigation();cancelAnimationFrame(animationFrame);renderPending=false;previousFrameTime=0;}
    else scheduleMeasure();
  });
  if(motionPreference.addEventListener)motionPreference.addEventListener('change',scheduleMeasure);
  else motionPreference.addListener(scheduleMeasure);
  configureMotion();
  // Let the opening image paint before transferring or decoding the later scenes.
  Promise.all([...hero.querySelectorAll('.bridge-plate,.truck-base-image')].map(image=>image.decode?image.decode().catch(()=>{}):Promise.resolve())).then(()=>{
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if('requestIdleCallback' in window)requestIdleCallback(loadStoryMedia,{timeout:1500});
      else setTimeout(loadStoryMedia,0);
    }));
  });
  window.addEventListener('online',()=>{if(!storyMediaReady)loadStoryMedia();});
  if (document.fonts) document.fonts.ready.then(scheduleMeasure);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleMeasure).observe(stickyHero);
  if ('IntersectionObserver' in window) {
    const visibilityObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      entry.target.classList.toggle('is-offscreen',!entry.isIntersecting);
      if(entry.target===hero)document.documentElement.classList.toggle('hero-in-view',entry.isIntersecting);
    }),{rootMargin:'120px'});
    visibilityObserver.observe(hero);
    visibilityObserver.observe(document.querySelector('#clientes'));
  }

  // Download the YouTube player only after an explicit play action.
  const videoTrigger=document.querySelector('.video-trigger');
  videoTrigger.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    const frame=document.createElement('iframe');
    frame.src='https://www.youtube-nocookie.com/embed/2ng8tgBNU6s?autoplay=1&rel=0&playsinline=1';
    frame.title='Automação de balanças rodoviárias na CERBRAS com SIAMAC';
    frame.width='960';frame.height='540';
    frame.allow='autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    videoTrigger.replaceWith(frame);
    frame.focus({preventScroll:true});
  });

  ticketExpand.addEventListener('click',()=>{
    const preview=ticketDialog.querySelector('.ticket-dialog-page');
    if(!preview.firstElementChild){
      preview.append(paper.querySelector('.ticket-document').cloneNode(true));
      preview.append(document.querySelector('#ticket-photo-pages').content.cloneNode(true));
      // Full-resolution photos are only requested when the visitor opens the ticket.
      preview.querySelectorAll('[data-ticket-photo]').forEach(image=>{image.src=image.dataset.ticketPhoto;});
    }
    ticketDialog.showModal();
    ticketDialog.querySelector('.ticket-dialog-scroll').scrollTo(0,0);
  });
  ticketDialog.querySelector('.ticket-dialog-close').addEventListener('click',()=>ticketDialog.close());

  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileMenu.open = false; }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => { if (mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.open = false; });

  const form = document.querySelector('#lead-form');
  const fields = {
    name: form.elements.namedItem('name'), company: form.elements.namedItem('company'),
    phone: form.elements.namedItem('phone'), email: form.elements.namedItem('email')
  };
  const messages = {
    name: 'Informe seu nome, com pelo menos 2 caracteres.',
    company: 'Informe o nome da sua empresa.',
    phone: 'Informe um telefone com DDD: 10 ou 11 dígitos.',
    email: 'Confira o endereço de e-mail informado.'
  };
  function isValid(name) {
    const value = fields[name].value.trim();
    if (name === 'name' || name === 'company') return value.length >= 2;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
      return /^([1-9]{2})\d{8,9}$/.test(digits);
    }
    return !value || fields[name].validity.valid;
  }
  function validateField(name) {
    const valid = isValid(name);
    fields[name].setAttribute('aria-invalid', String(!valid));
    document.querySelector(`#${name}-error`).textContent = valid ? '' : messages[name];
    return valid;
  }
  Object.entries(fields).forEach(([name, input]) => {
    input.addEventListener('blur', () => { if (input.value || input.hasAttribute('aria-invalid')) validateField(name); });
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(name);
      document.querySelector('#form-message').textContent = '';
      document.querySelector('#whatsapp-fallback').hidden = true;
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalidNames = Object.keys(fields).filter(name => !validateField(name));
    if (invalidNames.length) {
      document.querySelector('#form-message').textContent = 'Confira os campos destacados para continuar.';
      fields[invalidNames[0]].focus();
      return;
    }
    const text = [
      `Olá, equipe SIAMAC! Quero conhecer o ${CONTACT.product} e solicitar um teste para minha operação.`, '',
      `Nome: ${fields.name.value.trim()}`,
      `Empresa: ${fields.company.value.trim()}`,
      `WhatsApp: ${fields.phone.value.trim()}`,
      ...(fields.email.value.trim() ? [`E-mail: ${fields.email.value.trim()}`] : []), '',
      'Podemos avaliar a compatibilidade da minha balança e as condições da demonstração?'
    ].join('\n');
    const url = new URL(`https://wa.me/${CONTACT.phone}`);
    url.searchParams.set('text', text);
    const fallback = document.querySelector('#whatsapp-fallback');
    fallback.href = url.toString();
    fallback.hidden = false;
    document.querySelector('#form-message').textContent = 'Sua solicitação está preparada. No WhatsApp, revise e envie a mensagem. Se a nova aba não abriu, use o link abaixo.';
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
    // Optional hook for an analytics integration chosen by the site owner.
    // It contains no name, phone, company or email.
    document.dispatchEvent(new CustomEvent('owl:lead-intent', { detail: { source: 'demo-form', channel: 'whatsapp' } }));
  });

})();
