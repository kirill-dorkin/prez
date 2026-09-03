(() => {
  const bodyMap = document.querySelector('[data-slide-id="body-map"]');
  const divSlide = document.querySelector('[data-slide-id="same-look"]');
  const mapping = document.querySelector('[data-slide-id="mapping"]');
  const finalSlide = document.querySelector('[data-slide-id="final"]');

  if (bodyMap) {
    bodyMap.className = 'slide kind-doc-v3';
    bodyMap.dataset.chapter = 'structure';
    bodyMap.dataset.title = 'Сначала понимаем каркас документа';
    bodyMap.dataset.cue = '6 минут. Сначала каркас: html — вся страница, head — служебная часть, title — название вкладки, body — всё видимое. Только после этого вводим семантику.';
    bodyMap.innerHTML = `
      <span class="slide-number">04</span>
      <span class="eyebrow">Логика документа · идём сверху вниз</span>
      <div class="v3-doc-layout">
        <div class="v3-code">
          <div class="v3-code-head"><b>index.html</b><span>самый базовый каркас</span></div>
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Мой сайт&lt;/title&gt;
  &lt;/head&gt;

  &lt;body&gt;
    ... всё, что видно на странице ...
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        <div class="v3-copy">
          <h2>Сначала понимаем,<br>где что вообще живёт</h2>
          <div class="v3-rules">
            <div class="v3-rule"><code>&lt;html&gt;</code><span>вся HTML-страница целиком</span></div>
            <div class="v3-rule"><code>&lt;head&gt;</code><span>служебная часть страницы</span></div>
            <div class="v3-rule"><code>&lt;title&gt;</code><span>название вкладки браузера</span></div>
            <div class="v3-rule"><code>&lt;body&gt;</code><span>всё, что человек видит на странице</span></div>
          </div>
          <div class="v3-note">Сначала каркас документа. Потом раскладываем содержимое внутри <code>&lt;body&gt;</code>.</div>
        </div>
      </div>`;
  }

  if (divSlide) {
    divSlide.className = 'slide kind-div-v3';
    divSlide.dataset.chapter = 'meaning';
    divSlide.dataset.title = 'Что такое div';
    divSlide.dataset.cue = '5 минут. div — обычная нейтральная коробка. Он объединяет элементы, но по его названию нельзя понять роль блока.';
    divSlide.innerHTML = `
      <span class="slide-number">05</span>
      <span class="eyebrow">Сначала · обычный контейнер</span>
      <div class="v3-doc-layout">
        <div class="v3-copy">
          <h2><code>&lt;div&gt;</code> — просто<br>коробка для элементов</h2>
          <p>В <code>&lt;div&gt;</code> можно положить текст, ссылки, картинки или другие теги и объединить их в один блок.</p>
          <div class="v3-rules">
            <div class="v3-rule"><b>Что умеет?</b><span>Объединяет элементы в один контейнер.</span></div>
            <div class="v3-rule"><b>Что не умеет?</b><span>Сам по себе не объясняет, какую роль играет блок.</span></div>
          </div>
          <div class="v3-note">По слову <code>&lt;div&gt;</code> нельзя понять: это верх страницы, главное содержимое или низ.</div>
        </div>
        <div class="v3-code">
          <div class="v3-code-head"><b>Так тоже можно</b><span>но смысл не виден</span></div>
          <pre><code>&lt;body&gt;
  &lt;div&gt;верх страницы&lt;/div&gt;

  &lt;div&gt;
    основное содержимое
  &lt;/div&gt;

  &lt;div&gt;низ страницы&lt;/div&gt;
&lt;/body&gt;</code></pre>
        </div>
      </div>`;
  }

  let semantic = document.querySelector('[data-slide-id="semantic-why"]');
  if (!semantic && mapping) {
    semantic = document.createElement('section');
    semantic.className = 'slide kind-div-v3';
    semantic.setAttribute('aria-hidden', 'true');
    semantic.dataset.slideId = 'semantic-why';
    semantic.dataset.chapter = 'meaning';
    semantic.dataset.title = 'Зачем нужна семантика';
    semantic.dataset.cue = '5 минут. Сравните два куска кода. Внешне результат может быть одинаковым, но семантические теги сразу показывают роль каждого блока.';
    semantic.innerHTML = `
      <span class="slide-number">06</span>
      <span class="eyebrow">Теперь понятно · зачем семантика</span>
      <div class="v3-doc-layout">
        <div class="v3-copy">
          <h2>Семантика — это<br>понятный смысл в коде</h2>
          <p>Новые теги не делают страницу красивее. Они помогают сразу понять, какую роль играет часть страницы.</p>
          <div class="v3-rules">
            <div class="v3-rule"><b>Есть понятная роль?</b><span>Используем <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code> или <code>&lt;footer&gt;</code>.</span></div>
            <div class="v3-rule"><b>Нужен просто блок?</b><span>Используем <code>&lt;div&gt;</code>.</span></div>
          </div>
          <div class="v3-note"><code>&lt;div&gt;</code> не плохой и не запрещён. Семантика нужна там, где у блока есть понятная роль.</div>
        </div>
        <div class="v3-compare">
          <div class="v3-code">
            <div class="v3-code-head"><b>Только div</b><span>роль не видна</span></div>
            <pre><code>&lt;body&gt;
  &lt;div&gt;...&lt;/div&gt;
  &lt;div&gt;...&lt;/div&gt;
  &lt;div&gt;...&lt;/div&gt;
&lt;/body&gt;</code></pre>
          </div>
          <div class="v3-code">
            <div class="v3-code-head"><b>Семантика</b><span>роль видна сразу</span></div>
            <pre><code>&lt;body&gt;
  &lt;header&gt;...&lt;/header&gt;
  &lt;main&gt;...&lt;/main&gt;
  &lt;footer&gt;...&lt;/footer&gt;
&lt;/body&gt;</code></pre>
          </div>
        </div>
      </div>`;
  }

  if (mapping && bodyMap && divSlide && semantic) {
    const parent = mapping.parentNode;
    parent.insertBefore(bodyMap, mapping);
    parent.insertBefore(divSlide, mapping);
    parent.insertBefore(semantic, mapping);
  }

  if (mapping) {
    mapping.dataset.cue = '5 минут. Теперь теги не выглядят случайным списком: ученики уже поняли, зачем нужны смысловые названия. Просто переводим обычные слова в HTML.';
  }

  if (finalSlide) {
    finalSlide.className = 'slide kind-final-v3';
    finalSlide.dataset.chapter = 'finish';
    finalSlide.dataset.title = 'Итог урока';
    finalSlide.dataset.cue = '3-4 минуты. Финал без повторения всего списка тегов: каркас, семантика, div. Потом мостик к CSS.';
    finalSlide.innerHTML = `
      <span class="slide-number">16</span>
      <span class="eyebrow">Итог · три вещи, которые надо унести</span>
      <div class="v3-final-layout">
        <div class="v3-copy">
          <small style="color:#6c4cff;font-weight:900;letter-spacing:.16em">ГЛАВНАЯ МЫСЛЬ</small>
          <h2>HTML задаёт<br>структуру и смысл</h2>
          <div class="v3-takeaways">
            <div class="v3-takeaway"><b>1. Каркас</b><span><code>&lt;html&gt;</code> → <code>&lt;head&gt;</code> и <code>&lt;body&gt;</code></span></div>
            <div class="v3-takeaway"><b>2. Семантика</b><span><code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code> объясняют роль блока.</span></div>
            <div class="v3-takeaway"><b>3. div</b><span>нейтральный контейнер, когда специального смыслового тега не нужно.</span></div>
          </div>
          <div class="v3-next">Следующий урок: CSS — меняем внешний вид страницы.</div>
        </div>
        <div class="v3-code">
          <div class="v3-code-head"><b>Мини-шпаргалка</b><span>всё видимое внутри body</span></div>
          <pre><code>&lt;body&gt;
  &lt;header&gt;...&lt;/header&gt;
  &lt;main&gt;
    &lt;section&gt;...&lt;/section&gt;
  &lt;/main&gt;
  &lt;footer&gt;...&lt;/footer&gt;
&lt;/body&gt;</code></pre>
        </div>
      </div>`;
  }

  document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.dataset.slide = String(index + 1);
    const number = slide.querySelector('.slide-number');
    if (number) number.textContent = String(index + 1).padStart(2, '0');
  });
})();
