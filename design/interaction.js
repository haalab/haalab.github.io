/* Shared HAA material interactions. No content is generated or rewritten here. */
(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function boot() {
    opticalNavigation();
    menuAccessibility();
    faqAccessibility();
    publicationFeedback();
    publicationToolbar();
    const hero = document.querySelector('.profile-hero-field, .notebook-hero');
    if (hero) materialField(hero);
    if (!motion.matches) {
      const title = document.querySelector('[data-layout="core"] h1');
      if (title && typeof title.animate === 'function') {
        title.animate([{transform:'translateY(10px)',opacity:.7},{transform:'translateY(0)',opacity:1}],{duration:720,easing:'cubic-bezier(.2,.7,.2,1)'});
      }
    }
  }

  function opticalNavigation() {
    const group = document.querySelector('.nav-links');
    const surface = document.querySelector('.nav-container');
    if (!group || !surface) return;
    const links = [...group.querySelectorAll('a.nav-link')];
    const here = location.pathname.replace(/\/$/, '/index.html');
    const active = links.find(a => new URL(a.href).pathname.replace(/\/$/,'/index.html') === here) || links.find(a => a.classList.contains('active'));
    if (active) {
      active.classList.add('active'); active.setAttribute('aria-current','page');
    }
    const pill = document.createElement('span');
    pill.className = 'nav-active-pill'; pill.setAttribute('aria-hidden','true'); group.prepend(pill);
    function move(target) {
      if (!target || target.classList.contains('nav-cta') || !group.clientWidth) { pill.style.opacity='0'; return; }
      const rect=target.getBoundingClientRect(), parent=group.getBoundingClientRect();
      pill.style.width=`${rect.width}px`;
      pill.style.transform=`translateX(${rect.left-parent.left}px)`;
      pill.style.opacity='1';
    }
    const restore=()=>move(active);
    links.forEach(link=>{
      link.addEventListener('pointerenter',()=>move(link));
      link.addEventListener('focus',()=>move(link));
      link.addEventListener('blur',restore);
    });
    group.addEventListener('pointerleave',restore);
    new ResizeObserver(restore).observe(group);
    if(document.fonts) document.fonts.ready.then(restore);
    restore();
    if(finePointer.matches && !motion.matches) {
      surface.addEventListener('pointermove',event=>{
        const r=surface.getBoundingClientRect();
        surface.style.setProperty('--glass-x',`${clamp((event.clientX-r.left)/r.width,0,1)*100}%`);
      },{passive:true});
    }
    makeOpticalEdge();
  }

  function makeOpticalEdge() {
    if (!CSS.supports('backdrop-filter','url("#haa-nav-glass")')) return;
    // Edge normal map: the centre is neutral, so only the bevel refracts.
    const map=document.createElement('canvas'); map.width=480; map.height=64;
    const context=map.getContext('2d'); if(!context) return;
    const pixels=context.createImageData(map.width,map.height);
    const sdf=(x,y)=>{
      const qx=Math.abs(x-map.width/2)-(map.width/2-18), qy=Math.abs(y-map.height/2)-(map.height/2-18);
      return Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-18;
    };
    for(let y=0;y<map.height;y++) for(let x=0;x<map.width;x++) {
      const d=sdf(x,y), dx=sdf(x+.5,y)-sdf(x-.5,y), dy=sdf(x,y+.5)-sdf(x,y-.5);
      const length=Math.hypot(dx,dy)||1;
      const edge=Math.exp(-Math.pow((d+3)/5.5,2));
      const index=(y*map.width+x)*4;
      pixels.data[index]=128+dx/length*edge*65;
      pixels.data[index+1]=128+dy/length*edge*65;
      pixels.data[index+2]=128; pixels.data[index+3]=255;
    }
    context.putImageData(pixels,0,0);
    const namespace='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(namespace,'svg');
    svg.setAttribute('class','glass-filter-defs'); svg.setAttribute('aria-hidden','true');
    svg.innerHTML='<defs><filter id="haa-nav-glass" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="normals"/><feDisplacementMap in="SourceGraphic" in2="normals" scale="14" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
    svg.querySelector('feImage').setAttribute('href',map.toDataURL('image/png'));
    document.body.prepend(svg);
    document.body.style.setProperty('--nav-optics',`url("${location.href.split('#')[0]}#haa-nav-glass")`);
    document.body.classList.add('optical-edges');
  }

  function menuAccessibility() {
    const button=document.getElementById('mobile-menu-btn'), menu=document.getElementById('mobile-menu');
    if(!button||!menu) return;
    button.setAttribute('aria-controls',menu.id);
    const sync=()=>button.setAttribute('aria-expanded',String(menu.classList.contains('open')));
    button.addEventListener('click',()=>queueMicrotask(sync));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&menu.classList.contains('open')) {menu.classList.remove('open');sync();button.focus();}
    });
    new MutationObserver(sync).observe(menu,{attributes:true,attributeFilter:['class']});
    sync();
  }

  function publicationFeedback() {
    const types=document.getElementById('filter-types');
    const sync=()=>document.querySelectorAll('.chip').forEach(chip=>chip.setAttribute('aria-pressed',String(chip.classList.contains('on'))));
    if(types) new MutationObserver(sync).observe(types,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    sync();
    document.querySelectorAll('.filter-row').forEach(row=>row.addEventListener('click',event=>{
      queueMicrotask(sync);
      const chip=event.target.closest('.chip');
      if(chip&&!motion.matches&&chip.animate) chip.animate([{transform:'scale(.96)'},{transform:'scale(1.02)'},{transform:'scale(1)'}],{duration:300,easing:'cubic-bezier(.2,.7,.2,1)'});
    }));
  }

  function publicationToolbar() {
    const toolbar = document.querySelector('.site-lab .pub-toolbar');
    const input = toolbar?.querySelector('input[type="search"]');
    const rows = toolbar ? [...toolbar.querySelectorAll('.filter-row')] : [];
    if (!input || !rows.length) return;

    // A stable origin keeps the sticky threshold independent of the toolbar height.
    const origin = document.createElement('div');
    origin.setAttribute('aria-hidden', 'true');
    toolbar.before(origin);
    let hovering = false, compact = false, printing = false, frame = 0;

    function update() {
      frame = 0;
      const style = getComputedStyle(toolbar);
      const pinned = style.position === 'sticky' &&
        origin.getBoundingClientRect().top < parseFloat(style.top);
      const focused = toolbar.contains(document.activeElement);
      const next = pinned && !hovering && !focused && !printing;
      if (next === compact) return;

      if (next) {
        const height = toolbar.offsetHeight;
        rows.forEach(row => { row.hidden = true; });
        // Reserve the removed height so the publication being read stays in place.
        toolbar.style.setProperty('--pub-filter-space', `${height - toolbar.offsetHeight}px`);
      } else {
        rows.forEach(row => { row.hidden = false; });
        toolbar.style.removeProperty('--pub-filter-space');
      }
      compact = next;
      toolbar.classList.toggle('is-compact', compact);
    }

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    input.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
        hovering = true;
        update();
      }
    });
    toolbar.addEventListener('pointerleave', () => { hovering = false; update(); });
    toolbar.addEventListener('focusin', update);
    toolbar.addEventListener('focusout', () => queueMicrotask(update));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', () => {
      // Re-measure the reserved height after responsive wrapping changes.
      rows.forEach(row => { row.hidden = false; });
      toolbar.classList.remove('is-compact');
      toolbar.style.removeProperty('--pub-filter-space');
      compact = false;
      schedule();
    }, { passive: true });
    window.addEventListener('beforeprint', () => { printing = true; update(); });
    window.addEventListener('afterprint', () => { printing = false; update(); });
    if (document.fonts) document.fonts.ready.then(schedule);
    update();
  }

  function faqAccessibility() {
    document.querySelectorAll('.faq-item').forEach((item,index)=>{
      const question=item.querySelector('.faq-q'),answer=item.querySelector('.faq-a');
      if(!question||!answer)return;
      if(!answer.id)answer.id=`faq-answer-${index+1}`;
      question.setAttribute('aria-controls',answer.id);
      const sync=()=>question.setAttribute('aria-expanded',String(item.classList.contains('open')));
      new MutationObserver(sync).observe(item,{attributes:true,attributeFilter:['class']});
      sync();
    });
  }

  function materialField(hero) {
    const canvas=document.createElement('canvas');
    canvas.className='material-canvas'; canvas.setAttribute('aria-hidden','true');
    hero.prepend(canvas);
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
    if(!gl) {canvas.remove();hero.dataset.material='css';return;}
    const vertex='attribute vec2 a_position; varying vec2 v_uv; void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}';
    const fragment=`
      precision mediump float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform float u_enter;
      uniform float u_lab;
      vec3 field(vec2 uv) {
        vec3 paper=vec3(.98039,.96471,.93333);
        float a=exp(-pow((uv.x-.83-.15*sin(uv.y*3.4))/.27,2.));
        float b=exp(-pow((uv.x-.99+.22*cos(uv.y*2.35))/.26,2.));
        float windowY=smoothstep(-.2,.12,uv.y)*(1.-smoothstep(.95,1.5,uv.y));
        float strength=mix(1.,.85,u_lab);
        vec3 hand=mix(vec3(.92,.718,.439),vec3(.941,.651,.235),u_lab);
        vec3 col=mix(paper,hand,a*.29*windowY*strength);
        vec3 orange=mix(vec3(.91,.625,.345),vec3(.851,.435,.118),u_lab);
        col=mix(col,orange,b*.16*strength);
        float seam=exp(-pow((uv.x-.89-.09*cos(uv.y*3.4))/.008,2.));
        col=mix(col,vec3(1.,.986,.946),seam*.24*windowY*strength);
        return col;
      }
      float roundedBox(vec2 p,vec2 size,float radius) {
        vec2 q=abs(p)-size+radius;
        return min(max(q.x,q.y),0.)+length(max(q,0.))-radius;
      }
      mat2 rotation(float a) {float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
      void main() {
        vec2 uv=v_uv; uv.y=1.-uv.y;
        float aspect=u_resolution.x/u_resolution.y;
        vec2 p=(uv-.5)*vec2(aspect,1.);
        vec2 centre=vec2(mix(.34,.35,u_lab)*aspect,mix(-.01,.02,u_lab));
        centre+=u_pointer*vec2(.010,.007)+(1.-u_enter)*vec2(.025,.018);
        mat2 turn=rotation(mix(-.30,-.12,u_lab)+u_pointer.x*.018);
        vec2 q=turn*(p-centre);
        vec2 size=vec2(mix(.30,.23,u_lab)*aspect,mix(.47,.31,u_lab));
        float radius=mix(.19,.155,u_lab);
        float d=roundedBox(q,size,radius);
        float e=.002;
        vec2 normal=normalize(vec2(roundedBox(q+vec2(e,0.),size,radius)-roundedBox(q-vec2(e,0.),size,radius),roundedBox(q+vec2(0.,e),size,radius)-roundedBox(q-vec2(0.,e),size,radius))+vec2(.00001));
        normal=vec2(turn[0][0]*normal.x+turn[0][1]*normal.y,turn[1][0]*normal.x+turn[1][1]*normal.y);
        float depth=max(-d,0.);
        float bevel=exp(-depth*24.);
        vec2 shift=(normal*.052*bevel+(p-centre)*.026)/vec2(aspect,1.);
        vec2 colourShift=normal*.0045*bevel/vec2(aspect,1.);
        vec3 refracted=vec3(field(uv-shift-colourShift).r,field(uv-shift).g,field(uv-shift+colourShift).b);
        vec3 base=field(uv);
        float shadow=exp(-max(d,0.)*80.)*smoothstep(-.003,.014,d)*.065;
        base*=1.-shadow;
        float rim=exp(-abs(d+.001)*390.);
        float edgeGlow=pow(max(dot(normal,normalize(vec2(-.65+u_pointer.x*.2,-.85))),0.),3.);
        vec3 glass=mix(refracted,vec3(1.,.991,.963),.075);
        glass+=rim*(.17+.32*edgeGlow);
        glass=mix(glass,vec3(.96,.976,1.),rim*(1.-edgeGlow)*.10);
        float inside=1.-smoothstep(-.0015,.0015,d);
        vec3 col=mix(base,glass,inside*.96);
        col=mix(col,vec3(1.,.99,.96),rim*edgeGlow*.33);
        gl_FragColor=vec4(col,1.);
      }`;
    function compile(type,source) {
      const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {gl.deleteShader(shader);return null;}
      return shader;
    }
    const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
    if(!vs||!fs) {canvas.remove();hero.dataset.material='css';return;}
    const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) {canvas.remove();hero.dataset.material='css';return;}
    gl.useProgram(program);
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const attribute=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);
    const resolution=gl.getUniformLocation(program,'u_resolution'),pointer=gl.getUniformLocation(program,'u_pointer'),enter=gl.getUniformLocation(program,'u_enter'),lab=gl.getUniformLocation(program,'u_lab');
    gl.uniform1f(lab,hero.classList.contains('notebook-hero')?1:0);
    const current={x:0,y:0},target={x:0,y:0};
    let task=0,visible=true,lost=false,start=performance.now();
    const stop=()=>{if(task)cancelAnimationFrame(task);task=0;};
    const request=()=>{if(!task&&visible&&!document.hidden&&!lost)task=requestAnimationFrame(draw);};
    function resize() {
      const r=hero.getBoundingClientRect();
      const density=Math.min(devicePixelRatio||1,1.4,Math.sqrt(1400000/Math.max(1,r.width*r.height)));
      canvas.width=Math.max(1,Math.round(r.width*density));canvas.height=Math.max(1,Math.round(r.height*density));
      gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);request();
    }
    function draw(now) {
      task=0;if(!visible||document.hidden||lost)return;
      current.x+=(target.x-current.x)*.11;current.y+=(target.y-current.y)*.11;
      const progress=motion.matches?1:clamp((now-start)/4500,0,1);
      const eased=1-Math.pow(1-progress,3);
      gl.uniform2f(pointer,current.x,current.y);gl.uniform1f(enter,eased);
      gl.drawArrays(gl.TRIANGLES,0,6);
      hero.classList.add('material-ready');hero.dataset.material='webgl';
      if(!motion.matches&&(progress<1||Math.abs(target.x-current.x)+Math.abs(target.y-current.y)>.002))request();
    }
    if(finePointer.matches) {
      hero.addEventListener('pointermove',event=>{
        if(motion.matches)return;
        const r=hero.getBoundingClientRect();
        target.x=clamp((event.clientX-r.left)/r.width*2-1,-1,1);
        target.y=clamp((event.clientY-r.top)/r.height*2-1,-1,1);request();
      },{passive:true});
      hero.addEventListener('pointerleave',()=>{target.x=0;target.y=0;request();});
    }
    new ResizeObserver(resize).observe(hero);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)request();else stop();}).observe(hero);
    document.addEventListener('visibilitychange',()=>document.hidden?stop():request());
    motion.addEventListener('change',()=>{target.x=target.y=current.x=current.y=0;start=motion.matches?0:performance.now();request();});
    canvas.addEventListener('webglcontextlost',()=>{lost=true;stop();hero.classList.remove('material-ready');hero.dataset.material='css';});
    resize();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
