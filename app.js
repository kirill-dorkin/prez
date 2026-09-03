(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

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
        label: 'index.html · без структуры',
        code: `<body>\n    <h1>Мой сайт</h1>\n    <a href="#">Обо мне</a>\n    <a href="#">Контакты</a>\n\n    <h2>Обо мне</h2>\n    <p>Меня зовут...</p>\n\n    <p>Мой первый сайт</p>\n</body>`
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
