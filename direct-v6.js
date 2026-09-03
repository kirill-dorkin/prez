(async()=>{
  const base='https://raw.githubusercontent.com/kirill-dorkin/prez/lesson-04-html-plan/';
  const [htmlResp,cssResp,fixResp]=await Promise.all([
    fetch(base+'index.html?v=6'),
    fetch(base+'styles.css?v=6'),
    fetch(base+'v3-fix.css?v=6')
  ]);
  if(!htmlResp.ok||!cssResp.ok||!fixResp.ok) throw new Error('Не удалось загрузить презентацию');
  let html=await htmlResp.text();
  const css=await cssResp.text();
  const fix=await fixResp.text();
  html=html
    .replace(/<link[^>]+href=["']\.\/styles\.css["'][^>]*>/i,'')
    .replace(/<script[^>]+src=["']\.\/app\.js["'][^>]*><\/script>/i,'');
  document.open();
  document.write(html);
  document.close();
  const style=document.createElement('style');
  style.textContent=css+'\n'+fix;
  document.head.appendChild(style);
  const patch=document.createElement('script');
  patch.src=base+'patch-v4.js?v=6';
  patch.onload=()=>{
    const runtime=document.createElement('script');
    runtime.src=base+'runtime-v5.js?v=6';
    document.body.appendChild(runtime);
  };
  document.body.appendChild(patch);
})().catch(error=>{
  document.body.innerHTML='<main style="font:16px system-ui;padding:32px"><h1 style="font-size:24px">Ошибка загрузки презентации</h1><pre>'+String(error)+'</pre></main>';
});
