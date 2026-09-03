(async()=>{
  const response=await fetch('https://raw.githubusercontent.com/kirill-dorkin/prez/lesson-04-html-plan/app.js?runtime=5');
  if(!response.ok) throw new Error('runtime load failed: '+response.status);
  let code=await response.text();
  code=code.replace(/\n\s*\/\/ Lesson 4 v2:[\s\S]*?\n\s*applyLessonV2\(\);/,'');
  (0,eval)(code);
})().catch(error=>{
  console.error(error);
  const feedback=document.querySelector('[data-runtime-error]');
  if(feedback) feedback.textContent='Ошибка запуска интерактивной части: '+String(error);
});
