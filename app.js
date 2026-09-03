(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];


  // Lesson 4 v2: explain <div>, show nesting as code, simplify the final slide.
  function applyLessonV2() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/gh/kirill-dorkin/prez@lesson-04-html-plan/v2.css';
    document.head.append(css);

    const sameSlide = document.querySelector('[data-slide-id="same-look"]');
    if (sameSlide) {
      sameSlide.dataset.cue = '5 минут. Покажите, что страница на div и страница с семантикой выглядят одинаково. Спросите: какой код проще понять без пояснений? Это мост к следующему экрану про div.';
      const copy = sameSlide.querySelector('.same-copy');
      if (copy) copy.innerHTML = '<h2>С <code>&lt;div&gt;</code> и с семантикой<br>сайт выглядит одинаково</h2><p>Разница не во внешнем виде. Разница в том, насколько легко понять код.</p><div class="same-switch"><button class="secondary is-active" type="button" data-same-mode="plain">На &lt;div&gt;</button><button class="secondary" type="button" data-same-mode="semantic">Семантика</button></div>';
      const label = sameSlide.querySelector('[data-same-label]');
      if (label) label.textContent = 'index.html · всё на div';
      const code = sameSlide.querySelector('[data-same-code]');
      if (code) code.textContent = `<body>
    <div>
        <h1>Мой сайт</h1>
        <div>
            <a href="#">Обо мне</a>
            <a href="#">Контакты</a>
        </div>
    </div>

    <div>
        <h2>Обо мне</h2>
        <p>Меня зовут...</p>
    </div>

    <div><p>Мой первый сайт</p></div>
</body>`;
    }

    const bodyMap = document.querySelector('[data-slide-id="body-map"]');
    if (bodyMap && !document.querySelector('[data-slide-id="div-semantic"]')) {
      const divSlide = document.createElement('section');
      divSlide.className = 'slide kind-div-semantic';
      divSlide.setAttribute('aria-hidden', 'true');
      divSlide.dataset.slideId = 'div-semantic';
      divSlide.dataset.chapter = 'meaning';
      divSlide.dataset.title = 'Зачем нужна семантика';
      divSlide.dataset.cue = '6 минут. Сначала покажите код слева и спросите: «Что находится в первом div? А во втором?» Затем сравните с кодом справа. Главная мысль: div — нейтральный контейнер, семантический тег сразу объясняет роль блока. Div не плохой и не запрещён.';
      divSlide.innerHTML = `<span class="slide-number">06</span>
      <span class="eyebrow">Перед семантикой · знакомимся с &lt;div&gt;</span>
      <div class="div-semantic-layout">
        <div class="div-semantic-copy">
          <small>ОДИН И ТОТ ЖЕ КОНТЕЙНЕР</small>
          <h2><code>&lt;div&gt;</code> умеет группировать,<br>но не объясняет <em>что внутри</em></h2>
          <p><code>&lt;div&gt;</code> — нейтральная коробка. В неё можно положить заголовок, ссылки, текст или целый кусок страницы.</p>
          <div class="div-rule"><b>Семантика</b><span>это когда название тега сразу говорит, какую роль играет блок.</span></div>
        </div>
        <div class="div-code-compare" aria-label="Сравнение div и семантических тегов">
          <div class="compare-code-card muted-code">
            <div class="compare-code-head"><span>БЕЗ СМЫСЛА В НАЗВАНИИ</span><code>&lt;div&gt;</code></div>
            <pre><code>&lt;body&gt;
    <mark>&lt;div&gt;</mark> ... <mark>&lt;/div&gt;</mark>   <i>← что это?</i>
    <mark>&lt;div&gt;</mark> ... <mark>&lt;/div&gt;</mark>   <i>← а это?</i>
    <mark>&lt;div&gt;</mark> ... <mark>&lt;/div&gt;</mark>   <i>← и это?</i>
&lt;/body&gt;</code></pre>
          </div>
          <div class="semantic-arrow">→</div>
          <div class="compare-code-card semantic-code">
            <div class="compare-code-head"><span>СМЫСЛ В НАЗВАНИИ</span><b>семантика</b></div>
            <pre><code>&lt;body&gt;
    <mark>&lt;header&gt;</mark> ... <mark>&lt;/header&gt;</mark>   <i>← верх</i>
    <mark>&lt;main&gt;</mark> ... <mark>&lt;/main&gt;</mark>       <i>← главное</i>
    <mark>&lt;footer&gt;</mark> ... <mark>&lt;/footer&gt;</mark>   <i>← низ</i>
&lt;/body&gt;</code></pre>
          </div>
          <div class="div-note"><code>&lt;div&gt;</code><span>не исчезает. Используем его, когда нужен контейнер, но подходящего смыслового тега нет.</span></div>
        </div>
      </div>`;
      bodyMap.before(divSlide);
    }

    if (bodyMap) {
      bodyMap.className = 'slide kind-nesting kind-code-map';
      bodyMap.dataset.chapter = 'structure';
      bodyMap.dataset.title = 'Где живут новые теги';
      bodyMap.dataset.cue = '7 минут. Читайте код сверху вниз. Сначала покажите head и title, затем body. Главный вопрос группе: «Где должны находиться header, main и footer?» Ответ: внутри body.';
      bodyMap.innerHTML = `<span class="slide-number">07</span>
      <span class="eyebrow">Вложенность · смотрим прямо в код</span>
      <div class="code-map-layout">
        <div class="code-map-copy">
          <small>ГЛАВНОЕ ПРАВИЛО</small>
          <h2>Семантические теги<br>живут внутри <code>&lt;body&gt;</code></h2>
          <p>Каркас документа не меняется. Мы просто делаем содержимое <code>&lt;body&gt;</code> понятнее.</p>
          <div class="code-map-rules">
            <div><code>&lt;head&gt;</code><span>служебная часть страницы</span></div>
            <div><code>&lt;title&gt;</code><span>название вкладки браузера</span></div>
            <div class="strong"><code>&lt;body&gt;</code><span>всё, что видит пользователь</span></div>
          </div>
        </div>
        <div class="document-code-card">
          <div class="document-code-head"><b>index.html</b><span>читаем сверху вниз</span></div>
          <pre><code><span class="dim">&lt;!DOCTYPE html&gt;</span>
&lt;html&gt;

    <mark class="head-mark">&lt;head&gt;</mark>
        <mark class="title-mark">&lt;title&gt;Мой сайт&lt;/title&gt;</mark>   <i>← название вкладки</i>
    <mark class="head-mark">&lt;/head&gt;</mark>

    <mark class="body-mark">&lt;body&gt;</mark>                      <i>← всё видимое начинается здесь</i>

        <mark>&lt;header&gt;</mark> ... <mark>&lt;/header&gt;</mark>     <i>← верх страницы</i>

        <mark>&lt;main&gt;</mark>
            <mark class="soft">&lt;section&gt;</mark> ... <mark class="soft">&lt;/section&gt;</mark> <i>← один раздел</i>
        <mark>&lt;/main&gt;</mark>                       <i>← главное содержимое</i>

        <mark>&lt;footer&gt;</mark> ... <mark>&lt;/footer&gt;</mark>     <i>← низ страницы</i>

    <mark class="body-mark">&lt;/body&gt;</mark>
&lt;/html&gt;</code></pre>
          <div class="document-code-bottom"><b>Запоминаем:</b><span><code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code> и <code>&lt;footer&gt;</code> находятся внутри <code>&lt;body&gt;</code>.</span></div>
        </div>
      </div>`;
    }

    const finalSlide = document.querySelector('[data-slide-id="final"]');
    if (finalSlide) {
      finalSlide.className = 'slide kind-final-simple';
      finalSlide.dataset.chapter = 'finish';
      finalSlide.dataset.title = 'Итог урока';
      finalSlide.dataset.cue = '4-5 минут. Не проверяйте всё повторно. Попросите одного ученика объяснить разницу между div и семантическим тегом, а второго — назвать порядок header → main → footer. Затем сделайте мостик к CSS.';
      finalSlide.innerHTML = `<span class="slide-number">16</span>
      <span class="eyebrow">Итог · одна схема вместо списка тегов</span>
      <div class="final-simple-layout">
        <div class="final-simple-copy">
          <small>ГЛАВНАЯ МЫСЛЬ</small>
          <h2>HTML — это<br><mark>смысл + структура</mark></h2>
          <p>Мы не просто пишем теги. Мы объясняем браузеру и разработчику, где какая часть страницы.</p>
          <div class="final-mini-rules">
            <span><code>&lt;div&gt;</code> — нейтральный контейнер</span>
            <span>семантический тег — контейнер с понятным смыслом</span>
          </div>
        </div>
        <div class="final-code-card">
          <div class="final-code-head"><b>Теперь страницу читаем так</b><span>сверху вниз</span></div>
          <pre><code>&lt;body&gt;
    <mark>&lt;header&gt;</mark>
        &lt;nav&gt;...&lt;/nav&gt;
    <mark>&lt;/header&gt;</mark>

    <mark>&lt;main&gt;</mark>
        <mark class="soft">&lt;section&gt;</mark>...<mark class="soft">&lt;/section&gt;</mark>
        <mark class="soft">&lt;section&gt;</mark>...<mark class="soft">&lt;/section&gt;</mark>
    <mark>&lt;/main&gt;</mark>

    <mark>&lt;footer&gt;</mark>...<mark>&lt;/footer&gt;</mark>
&lt;/body&gt;</code></pre>
          <div class="final-next"><small>СЛЕДУЮЩИЙ УРОК</small><b>Каркас готов → подключаем CSS и меняем внешний вид.</b></div>
        </div>
      </div>`;
    }

    document.querySelectorAll('.slide').forEach((slide, index) => {
      slide.dataset.slide = String(index + 1);
      const number = slide.querySelector('.slide-number');
      if (number) number.textContent = String(index + 1).padStart(2, '0');
    });
  }

  applyLessonV2();

  // Deck navigation
  const slides = $$('.slide');
  const lesson = $('#lesson');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const progress = $('#progress');
  const counter = $('#counter');
  const chapterLabel = $('#chapterLabel');
  const fullscreenBtn = $('#fullscreenBtn');
  const helpBtn = $('#shortcutHelp');
  const dialog = $('#shortcutDialog');
  const dialogClose = $('#closeShortcutDialog');
  const announcer = $('#slideAnnouncer');
  const teacherCue = $('#teacherCue');
  const chapterNames = {
    start: 'Старт',
    review: 'Вспоминаем',
    meaning: 'Смысл страницы',
    structure: 'Структура HTML',
    build: 'Собираем',
    check: 'Проверяем',
    practice: 'Практика',
    finish: 'Итог'
  };
  let current = 0;
  let cueVisible = false;
  let touchStartX = 0;

  function hashIndex() {
    const match = location.hash.match(/^#slide-(\d+)$/);
    if (!match) return null;
    const index = Number(match[1]) - 1;
    return index >= 0 && index < slides.length ? index : null;
  }

  function setCue() {
    if (cueVisible) teacherCue.textContent = slides[current]?.dataset.cue || 'Подсказки для этого экрана нет.';
  }

  function show(index, push = true) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === target);
      slide.setAttribute('aria-hidden', i === target ? 'false' : 'true');
    });
    current = target;
    const incoming = slides[current];
    lesson.dataset.chapter = incoming.dataset.chapter || 'start';
    chapterLabel.textContent = chapterNames[lesson.dataset.chapter] || 'Урок';
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
    announcer.textContent = `Слайд ${current + 1} из ${slides.length}. ${incoming.dataset.title || ''}`;
    setCue();
    const hash = `#slide-${current + 1}`;
    if (location.hash !== hash) {
      if (push) history.pushState(null, '', hash);
      else history.replaceState(null, '', hash);
    }
  }

  prevBtn?.addEventListener('click', () => show(current - 1));
  nextBtn?.addEventListener('click', () => show(current + 1));
  helpBtn?.addEventListener('click', () => dialog?.showModal());
  dialogClose?.addEventListener('click', () => dialog?.close());
  fullscreenBtn?.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {}
  });
  window.addEventListener('popstate', () => {
    const index = hashIndex();
    if (index !== null) show(index, false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.target?.closest?.('input,textarea,select,dialog')) return;
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      show(current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current - 1);
    } else if (event.key.toLowerCase() === 'f') {
      fullscreenBtn?.click();
    } else if (event.key.toLowerCase() === 't') {
      cueVisible = !cueVisible;
      teacherCue.classList.toggle('is-visible', cueVisible);
      setCue();
    } else if (event.key === '?' || (event.key === '/' && event.shiftKey)) {
      dialog?.showModal();
    } else if (event.key === 'Escape' && dialog?.open) {
      dialog.close();
    }
  });
  document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });
  document.addEventListener('touchend', (event) => {
    const dx = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(dx) > 60) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Recap
  const recap = $('[data-recap]');
  if (recap) {
    const items = [
      {
        topic: 'Картинка',
        question: 'Как браузер понимает, какую картинку нужно показать?',
        answer: 'В теге <img> мы указываем путь к файлу в атрибуте src. alt кратко описывает изображение.'
      },
      {
        topic: 'Ссылка',
        question: 'Что хранится внутри href у тега <a>?',
        answer: 'href говорит ссылке, куда нужно перейти после нажатия.'
      },
      {
        topic: 'Список',
        question: 'Чем <ul>, <ol> и <li> отличаются друг от друга?',
        answer: '<ul> создаёт список без нумерации, <ol> с нумерацией, а <li> обозначает один пункт внутри списка.'
      },
      {
        topic: 'Атрибут',
        question: 'Где здесь дополнительная информация о теге: <img src="photo.jpg" alt="Моё фото">?',
        answer: 'src и alt находятся внутри открывающего тега. Это атрибуты: они дают тегу дополнительную информацию.'
      }
    ];
    let index = 0;
    let revealed = false;
    const indexEl = $('[data-recap-index]', recap);
    const topicEl = $('[data-recap-topic]', recap);
    const questionEl = $('[data-recap-question]', recap);
    const answerEl = $('[data-recap-answer]', recap);
    const revealBtn = $('[data-recap-reveal]', recap);
    const next = $('[data-recap-next]', recap);
    const tabs = $$('[data-recap-tab]', recap);

    function paintRecap() {
      const item = items[index];
      indexEl.textContent = index + 1;
      topicEl.textContent = item.topic;
      questionEl.textContent = item.question;
      answerEl.textContent = item.answer;
      recap.dataset.answer = revealed ? 'shown' : 'hidden';
      revealBtn.textContent = revealed ? 'Скрыть ответ' : 'Показать короткий ответ';
      next.textContent = index === items.length - 1 ? 'Сначала' : 'Следующий вопрос →';
      tabs.forEach((tab, i) => tab.classList.toggle('is-active', i === index));
    }

    revealBtn?.addEventListener('click', () => {
      revealed = !revealed;
      paintRecap();
    });
    next?.addEventListener('click', () => {
      index = (index + 1) % items.length;
      revealed = false;
      paintRecap();
    });
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      index = Number(tab.dataset.recapTab) || 0;
      revealed = false;
      paintRecap();
    }));
    paintRecap();
  }

  // Page zones
  const zones = $('[data-zones]');
  if (zones) {
    const states = ['plain', 'header', 'nav', 'main', 'section', 'footer'];
    const info = {
      plain: ['Сайт целиком', 'пока ничего не называем', 'Показать верх страницы'],
      header: ['Верх страницы', 'логотип, название, полезные элементы', 'Показать меню'],
      nav: ['Меню', 'главные ссылки для переходов', 'Показать основную часть'],
      main: ['Основная часть', 'главное содержимое этой страницы', 'Показать один раздел'],
      section: ['Отдельный раздел', 'одна тема внутри основной части', 'Показать низ страницы'],
      footer: ['Низ страницы', 'контакты и дополнительная информация', 'Вернуть сайт целиком']
    };
    let index = 0;
    const title = $('[data-zone-title]', zones);
    const note = $('[data-zone-note]', zones);
    const button = $('[data-zone-next]', zones);

    function paintZones() {
      const state = states[index];
      zones.dataset.zone = state;
      title.textContent = info[state][0];
      note.textContent = info[state][1];
      button.textContent = info[state][2];
    }

    button?.addEventListener('click', () => {
      index = (index + 1) % states.length;
      paintZones();
    });
    paintZones();
  }

  // Same visual result, different structure
  const same = $('[data-same]');
  if (same) {
    const modes = {
      plain: {
        label: 'index.html · всё на div',
        code: `<body>
    <div>
        <h1>Мой сайт</h1>
        <div>
            <a href="#">Обо мне</a>
            <a href="#">Контакты</a>
        </div>
    </div>

    <div>
        <h2>Обо мне</h2>
        <p>Меня зовут...</p>
    </div>

    <div><p>Мой первый сайт</p></div>
</body>`
      },
      semantic: {
        label: 'index.html · со смыслом',
        code: `<body>\n    <header>\n        <h1>Мой сайт</h1>\n        <nav>\n            <a href="#">Обо мне</a>\n            <a href="#">Контакты</a>\n        </nav>\n    </header>\n\n    <main>\n        <section>\n            <h2>Обо мне</h2>\n            <p>Меня зовут...</p>\n        </section>\n    </main>\n\n    <footer>\n        <p>Мой первый сайт</p>\n    </footer>\n</body>`
      }
    };
    const code = $('[data-same-code]', same);
    const label = $('[data-same-label]', same);
    const buttons = $$('[data-same-mode]', same);

    function setSame(mode) {
      label.textContent = modes[mode].label;
      code.textContent = modes[mode].code;
      buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.sameMode === mode));
    }
    buttons.forEach((button) => button.addEventListener('click', () => setSame(button.dataset.sameMode)));
    setSame('plain');
  }

  // Builder
  const builder = $('[data-builder]');
  if (builder) {
    const steps = [
      {
        label: 'Начинаем с body',
        next: 'Добавить header →',
        code: `<body>\n\n\n</body>`,
        preview: `<div class="build-empty">Пока внутри body ничего нет</div>`
      },
      {
        label: 'Добавили верх страницы',
        next: 'Добавить nav →',
        code: `<body>\n    <header>\n        <h1>Мой сайт</h1>\n    </header>\n</body>`,
        preview: `<header class="bp-header bp-highlight"><b>МОЙ САЙТ</b></header>`
      },
      {
        label: 'Собрали главные ссылки',
        next: 'Добавить main →',
        code: `<body>\n    <header>\n        <h1>Мой сайт</h1>\n        <nav>\n            <a href="#">Обо мне</a>\n            <a href="#">Контакты</a>\n        </nav>\n    </header>\n</body>`,
        preview: `<header class="bp-header"><b>МОЙ САЙТ</b><nav class="bp-nav bp-highlight"><span>Обо мне</span><span>Контакты</span></nav></header>`
      },
      {
        label: 'Добавили основную часть',
        next: 'Добавить sections →',
        code: `<body>\n    <header>\n        <h1>Мой сайт</h1>\n        <nav>...</nav>\n    </header>\n\n    <main>\n\n    </main>\n</body>`,
        preview: `<header class="bp-header"><b>МОЙ САЙТ</b><nav class="bp-nav"><span>Обо мне</span><span>Контакты</span></nav></header><main class="bp-main bp-highlight"><div class="build-empty">main ждёт содержимое</div></main>`
      },
      {
        label: 'Разделили главное на темы',
        next: 'Добавить footer →',
        code: `<body>\n    <header>\n        <h1>Мой сайт</h1>\n        <nav>...</nav>\n    </header>\n\n    <main>\n        <section>\n            <h2>Обо мне</h2>\n            <p>Меня зовут...</p>\n        </section>\n\n        <section>\n            <h2>Увлечения</h2>\n            <ul>...</ul>\n        </section>\n    </main>\n</body>`,
        preview: `<header class="bp-header"><b>МОЙ САЙТ</b><nav class="bp-nav"><span>Обо мне</span><span>Контакты</span></nav></header><main class="bp-main"><section class="bp-section bp-highlight"><h3>Обо мне</h3><p>Меня зовут...</p></section><section class="bp-section bp-highlight"><h3>Увлечения</h3><ul><li>Спорт</li><li>Музыка</li></ul></section></main>`
      },
      {
        label: 'Каркас страницы готов',
        next: 'Сначала',
        code: `<body>\n    <header>\n        <h1>Мой сайт</h1>\n        <nav>...</nav>\n    </header>\n\n    <main>\n        <section>...</section>\n        <section>...</section>\n    </main>\n\n    <footer>\n        <p>Мой первый сайт</p>\n    </footer>\n</body>`,
        preview: `<header class="bp-header"><b>МОЙ САЙТ</b><nav class="bp-nav"><span>Обо мне</span><span>Контакты</span></nav></header><main class="bp-main"><section class="bp-section"><h3>Обо мне</h3><p>Меня зовут...</p></section><section class="bp-section"><h3>Увлечения</h3><ul><li>Спорт</li><li>Музыка</li></ul></section></main><footer class="bp-footer bp-highlight"><b>Мой первый сайт</b><span>Контакты</span></footer>`
      }
    ];
    let index = 0;
    const indexEl = $('[data-build-index]', builder);
    const labelEl = $('[data-build-label]', builder);
    const codeEl = $('[data-build-code]', builder);
    const previewEl = $('[data-build-preview]', builder);
    const prev = $('[data-build-prev]', builder);
    const next = $('[data-build-next]', builder);

    function paintBuild() {
      const step = steps[index];
      indexEl.textContent = index + 1;
      labelEl.textContent = step.label;
      codeEl.textContent = step.code;
      previewEl.innerHTML = step.preview;
      prev.disabled = index === 0;
      next.textContent = step.next;
    }
    prev?.addEventListener('click', () => {
      if (index > 0) index -= 1;
      paintBuild();
    });
    next?.addEventListener('click', () => {
      index = index === steps.length - 1 ? 0 : index + 1;
      paintBuild();
    });
    paintBuild();
  }

  // Quiz
  const quiz = $('[data-quiz]');
  if (quiz) {
    const questions = [
      {
        question: 'Где разместить главные ссылки сайта?',
        visual: ['↗', 'Обо мне · Увлечения · Контакты', 'главные переходы по сайту'],
        correct: 'nav',
        options: [
          ['head', '<head>', 'служебная часть'],
          ['nav', '<nav>', 'главные ссылки'],
          ['footer', '<footer>', 'низ страницы'],
          ['p', '<p>', 'обычный текст']
        ],
        good: 'Да. <nav> собирает основные навигационные ссылки.'
      },
      {
        question: 'Где находится главное содержимое страницы?',
        visual: ['▣', 'Обо мне · Увлечения · Галерея', 'то, ради чего открыли страницу'],
        correct: 'main',
        options: [
          ['main', '<main>', 'главное содержимое'],
          ['title', '<title>', 'название вкладки'],
          ['nav', '<nav>', 'навигация'],
          ['footer', '<footer>', 'нижняя часть']
        ],
        good: 'Верно. Для нашей страницы основное содержимое находится в <main>.'
      },
      {
        question: 'Как обозначить отдельную тему «Обо мне» внутри main?',
        visual: ['□', 'Обо мне', 'отдельная смысловая часть'],
        correct: 'section',
        options: [
          ['body', '<body>', 'всё видимое'],
          ['section', '<section>', 'один смысловой раздел'],
          ['head', '<head>', 'служебная часть'],
          ['nav', '<nav>', 'навигация']
        ],
        good: 'Да. <section> подходит для отдельного смыслового раздела.'
      },
      {
        question: 'Куда поместить название страницы во вкладке браузера?',
        visual: ['▤', 'Мой сайт', 'текст на вкладке браузера'],
        correct: 'title',
        options: [
          ['h1', '<h1>', 'главный заголовок на странице'],
          ['footer', '<footer>', 'низ страницы'],
          ['title', '<title>', 'название вкладки внутри head'],
          ['section', '<section>', 'раздел страницы']
        ],
        good: 'Верно. <title> остаётся внутри <head>, а не внутри body.'
      },
      {
        question: 'Где логично разместить контакты в самом низу страницы?',
        visual: ['↓', 'Телефон · ссылка · автор', 'нижняя часть страницы'],
        correct: 'footer',
        options: [
          ['header', '<header>', 'верх страницы'],
          ['main', '<main>', 'главное содержимое'],
          ['footer', '<footer>', 'низ страницы'],
          ['title', '<title>', 'название вкладки']
        ],
        good: 'Да. Для нашей страницы нижняя часть будет <footer>.'
      }
    ];
    let index = 0;
    let locked = false;
    const questionEl = $('[data-quiz-question]', quiz);
    const indexEl = $('[data-quiz-index]', quiz);
    const visual = $('[data-quiz-visual]', quiz);
    const options = $('[data-quiz-options]', quiz);
    const feedback = $('[data-quiz-feedback]', quiz);

    function paintQuiz() {
      locked = false;
      const q = questions[index];
      questionEl.textContent = q.question;
      indexEl.textContent = index + 1;
      $('.quiz-icon', visual).textContent = q.visual[0];
      $('b', visual).textContent = q.visual[1];
      $('span', visual).textContent = q.visual[2];
      options.innerHTML = '';
      q.options.forEach(([id, tag, note]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.answer = id;
        const code = document.createElement('code');
        code.textContent = tag;
        const span = document.createElement('span');
        span.textContent = note;
        button.append(code, span);
        button.addEventListener('click', () => choose(button));
        options.append(button);
      });
      feedback.className = 'quiz-feedback';
      feedback.textContent = 'Сначала выберите ответ.';
    }

    function choose(button) {
      if (locked) return;
      locked = true;
      const q = questions[index];
      const selected = button.dataset.answer;
      $$('button', options).forEach((btn) => {
        if (btn.dataset.answer === q.correct) btn.classList.add('is-correct');
      });
      if (selected === q.correct) {
        feedback.className = 'quiz-feedback is-good';
        feedback.textContent = `${q.good} Нажмите ещё раз на правильный ответ для следующего вопроса.`;
      } else {
        button.classList.add('is-wrong');
        feedback.className = 'quiz-feedback is-bad';
        feedback.textContent = `Не совсем. Посмотрите на смысл каждого варианта. Правильный ответ подсвечен. Нажмите его, чтобы продолжить.`;
      }
      const correctButton = $$('button', options).find((btn) => btn.dataset.answer === q.correct);
      correctButton?.addEventListener('click', () => {
        index = (index + 1) % questions.length;
        paintQuiz();
      }, { once: true });
    }
    paintQuiz();
  }

  // Practice timer
  const timer = $('[data-timer]');
  if (timer) {
    const display = $('[data-timer-display]', timer);
    const toggle = $('[data-timer-toggle]', timer);
    const total = 25 * 60;
    let remaining = total;
    let interval = null;

    function format(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
    function paintTimer() {
      display.textContent = format(remaining);
      toggle.textContent = interval ? 'Пауза' : remaining === total ? 'Старт' : remaining === 0 ? 'Сначала' : 'Продолжить';
    }
    function stop() {
      if (interval) clearInterval(interval);
      interval = null;
      paintTimer();
    }
    toggle?.addEventListener('click', () => {
      if (interval) {
        stop();
        return;
      }
      if (remaining === 0) remaining = total;
      interval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          remaining = 0;
          stop();
          return;
        }
        paintTimer();
      }, 1000);
      paintTimer();
    });
    paintTimer();
  }

  const initial = hashIndex();
  show(initial ?? 0, false);
})();
