(() => {
  'use strict';
  const target=document.getElementById('youtube-player');
  const status=document.getElementById('player-status');
  const clock=document.getElementById('current-time');
  const fallback=document.getElementById('youtube-fallback');
  let player=null,ready=false,pending=null;
  const stamp=s=>Math.floor(s/60).toString().padStart(2,'0')+':'+Math.floor(s%60).toString().padStart(2,'0');
  const jump=seconds=>{player.seekTo(seconds,true);player.playVideo();status.textContent='Reproduciendo desde '+stamp(seconds);};
  window.onYouTubeIframeAPIReady=()=>{
    player=new YT.Player(target,{host:'https://www.youtube-nocookie.com',videoId:target.dataset.videoId,playerVars:{playsinline:1,rel:0,origin:location.origin,cc_lang_pref:'es'},events:{
      onReady:()=>{ready=true;status.textContent='Vídeo preparado. Elige un momento o pulsa reproducir.';if(pending!==null){jump(pending);pending=null;}},
      onStateChange:e=>{if(e.data===YT.PlayerState.PLAYING)status.textContent='Reproduciendo';else if(e.data===YT.PlayerState.ENDED)status.textContent='Vídeo terminado';},
      onError:()=>{status.textContent='No se ha podido cargar el vídeo aquí. Puedes abrirlo en YouTube.';}
    }});
  };
  document.querySelectorAll('[data-seek]').forEach(button=>button.addEventListener('click',()=>{
    const seconds=Number(button.dataset.seek);fallback.href='https://www.youtube.com/watch?v='+target.dataset.videoId+'&t='+Math.floor(seconds)+'s';
    if(ready)jump(seconds);else{pending=seconds;status.textContent='Preparando el vídeo en '+stamp(seconds)+'…';}
    document.querySelector('.video-frame').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'center'});
  }));
  const timer=setInterval(()=>{if(ready){const current=player.getCurrentTime();clock.textContent=stamp(current);clock.dataset.seconds=current.toFixed(2);}},500);
  window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
})();