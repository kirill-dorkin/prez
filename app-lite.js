(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
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

  const hashIndex = () => {
    const m = location.hash.match(/^#slide-(\d+)$/);
    if (!m) return null;
    const i = Number(m[1]) - 1;
    return i >= 0 && i < slides.length ? i : null;
  };

  const setCue = () => {
    if (!teacherCue) return;
    teacherCue.textContent = cueVisible ? (slides[current]?.dataset.cue || 'Подсказки для этого экрана нет.') : '';
    teacherCue.classList.toggle('is-visible', cueVisible);
  };

  function show(index, push = true) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => {
      const active = i === target;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    current = target;
    const incoming = slides[current];
    const chapter = incoming.dataset.chapter || 'start';
    if (lesson) lesson.dataset.chapter = chapter;
    if (chapterLabel) chapterLabel.textContent = chapterNames[chapter] || 'Урок';
    if (counter) counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (progress) progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === slides.length - 1;
    if (announcer) announcer.textContent = `Слайд ${current + 1} из ${slides.length}. ${incoming.dataset.title || ''}`;
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
    const i = hashIndex();
    if (i !== null) show(i, false);
  });

  document.addEventListener('keydown', (event) => {
    if (dialog?.open && event.key !== 'Escape') return;
    if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      show(current + 1);
    } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      show(current - 1);
    } else if (event.key.toLowerCase() === 'f') {
      fullscreenBtn?.click();
    } else if (event.key.toLowerCase() === 't') {
      cueVisible = !cueVisible;
      setCue();
    } else if (event.key === '?') {
      dialog?.showModal();
    }
  });

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0]?.clientX || 0;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const x = e.changedTouches[0]?.clientX || 0;
    const dx = x - touchStartX;
    if (Math.abs(dx) < 55) return;
    show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  $$('[data-timer]').forEach(timer => {
    const display = $('[data-timer-display]', timer);
    const button = $('[data-timer-toggle]', timer);
    let left = Number(timer.dataset.timer || 0);
    let id = null;
    const render = () => {
      const min = Math.floor(left / 60);
      const sec = left % 60;
      if (display) display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };
    render();
    button?.addEventListener('click', () => {
      if (id) {
        clearInterval(id);
        id = null;
        button.textContent = 'Продолжить';
        return;
      }
      button.textContent = 'Пауза';
      id = setInterval(() => {
        left = Math.max(0, left - 1);
        render();
        if (!left) {
          clearInterval(id);
          id = null;
          button.textContent = 'Готово';
        }
      }, 1000);
    });
  });

  show(hashIndex() ?? 0, false);
})();
