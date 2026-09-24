import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleDot,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Layers3,
  MapPin,
  Menu,
  MonitorPlay,
  Play,
  Radio,
  Send,
  Target,
  Twitch,
  Users,
  Wrench,
  X,
  Youtube,
  Zap,
} from 'lucide-react';

const socials = [
  { label: 'YouTube', handle: '@Leha_STR', href: 'https://www.youtube.com/@Leha_STR', icon: Youtube, note: 'Основные выпуски' },
  { label: 'Twitch', handle: 'lehastroff', href: 'https://www.twitch.tv/lehastroff', icon: Twitch, note: 'Прямые эфиры' },
  { label: 'Telegram', handle: '@LehaSTR0', href: 'https://t.me/LehaSTR0', icon: Send, note: 'Новости и моменты' },
];

const videos = [
  { id: 'oBYJaDag7VQ', title: 'Я запретил войну в Europa Universalis 5', caption: 'Новый грандиозный поход без единой единицы', image: '/assets/video-europa.jpg', tag: 'YOUTUBE · EU5' },
  { id: 'Gc2mKjtLXlE', title: 'Гей-парк в Jurassic World Evolution', caption: 'Короткий момент с канала «Моменты LehaSTR»', image: '/assets/moment-jurassic.jpg', tag: 'МОМЕНТЫ · JWE' },
  { id: 'YjAIdOqOhK4', title: 'Идеальное прохождение Kenshi', caption: 'Леха показывает свой план прохождения', image: '/assets/moment-kenshi.jpg', tag: 'МОМЕНТЫ · KENSHI' },
  { id: 'ZWxDbambNGY', title: 'Мохаве больше не будет прежней', caption: 'Хардкорный отыгрыш за Сирию в Hearts of Iron IV', image: '/assets/video-hoi4.jpg', tag: 'YOUTUBE · HOI4' },
];

const games = [
  { id: 'eu5', short: 'EU5', name: 'Europa Universalis V', tagline: 'Империи, политика, технологии и последствия решений.', description: 'Партии, дипломатия и управление государством. Интересно не только победить, но и понять, как государство доведено до такого состояния.', detail: 'Политика · Экономика · Дипломатия' },
  { id: 'eu4', short: 'EU4', name: 'Europa Universalis IV', tagline: 'Большие карты, где у каждой идеи есть цена.', description: 'Строить государство годами, менять регионы и наблюдать, как из набора решений складывается история.', detail: 'Империи · Развитие · Альтернативы' },
  { id: 'kenshi', short: 'KS', name: 'Kenshi', tagline: 'Жестокий мир и полная свобода выбора.', description: 'Начать почти с нуля и выбрать свой путь: от торговли и разведки до армии и собственного поселения.', detail: 'Выживание · Свобода · Без скрипта' },
  { id: 'victoria', short: 'V3', name: 'Victoria 3', tagline: 'Экономика, общество и спор о будущем.', description: 'Сложная экономика, реформы и конфликт интересов разных групп населения.', detail: 'Экономика · Реформы · Общество' },
  { id: 'hoi4', short: 'HOI4', name: 'Hearts of Iron IV', tagline: 'Индустриальная война и альтернативная история.', description: 'Стратегический слой, производство, технологии и большие идеи, переписанные вручную.', detail: 'Война · Технологии · Альтернативы' },
];

const directions = [
  'Информационные технологии и программирование',
  'Робототехника и автоматизация',
  'Электроника и микроэлектроника',
  'Мехатроника и автоматизация производства',
  'Компьютерное моделирование и 3D-графика',
  'Экономика и управление',
  'Право и юриспруденция',
];

const reasons = [
  { icon: Wrench, title: 'Практика в реальной среде', text: 'Современное оборудование и инструменты, которые после выпуска встретят в индустрии.' },
  { icon: Layers3, title: 'Дуальное обучение', text: 'Учебные задачи связаны с производственной площадкой и реальным контекстом работы.' },
  { icon: Target, title: 'Ранняя специализация', text: 'От программирования и роботов до экономики и права — можно выбрать конкретный путь.' },
  { icon: Users, title: 'Команда и комьюнити', text: 'Общие проекты и много практики: здесь нельзя просто тихо пройти программу, не участвуя в процессе.' },
];

const steps = [
  { title: 'Выбери направление', text: 'Сравни специальности и учебные планы, а не только названия профессий.' },
  { title: 'Проверь условия', text: 'Уточни формат, расписание, оплату и требования у официального сайта.' },
  { title: 'Собери документы', text: 'Следи за сроками приёмной кампании и подавай заявление через официальные каналы.' },
  { title: 'Приезжай и пробуй', text: 'Сначала посмотри на программу изнутри и честно оцени нагрузку.' },
];

function Brand() {
  return <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">L</span><span className="brand-text">LEHA<span>STR</span></span></a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);
  const [activeGame, setActiveGame] = useState(games[0].id);
  const [activeDirection, setActiveDirection] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tripDone, setTripDone] = useState(0);

  const selectedGame = useMemo(() => games.find((game) => game.id === activeGame) ?? games[0], [activeGame]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeVideo || menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeVideo, menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyTelegram = async () => {
    try {
      await navigator.clipboard.writeText('https://t.me/LehaSTR0');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open('https://t.me/LehaSTR0', '_blank', 'noreferrer');
    }
  };

  const navItems = [
    ['#videos', 'Видео'],
    ['#games', 'Игры'],
    ['#alabuga', 'Алабуга Политех'],
    ['#socials', 'Соцсети'],
  ];

  return (
    <div className="site-shell" id="top">
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map(([href, label]) => <button key={href} onClick={() => scrollTo(href)}>{label}</button>)}
        </nav>
        <a className="header-socials" href="#socials">Соцсети <ArrowDown size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><Menu size={24} /></button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top"><Brand /><button onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X size={25} /></button></div>
          <nav>{navItems.map(([href, label], index) => <button key={href} onClick={() => scrollTo(href)}><span>0{index + 1}</span>{label}</button>)}</nav>
          <div className="mobile-socials">
            {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={18} />{label}</a>)}
          </div>
        </div>
      )}

      <main>
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> LehaSTR · @Leha_STR</div>
            <h1>СТРАТЕГИИ.<br /><span>ИСТОРИИ.</span><br />ПОЛНЫЙ ХАОС.</h1>
            <p className="hero-lead">LehaSTR — игровой канал про большие планы, альтернативную историю и моменты, которые невозможно спланировать.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setActiveVideo(videos[0])}><Play size={18} fill="currentColor" /> Смотреть выпуск</button>
              <a className="outline-button" href="#alabuga">Про Алабугу <ArrowDown size={18} /></a>
            </div>
            <div className="hero-metrics"><span><b>5</b> игр в фокусе</span><i /><span><b>YouTube</b> выпуски</span><i /><span><b>Twitch</b> эфиры</span></div>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <div className="portrait-top"><span>LEHASTR</span><span>RU</span></div>
              <img src="/assets/leha-avatar.jpg" alt="Аватар LehaSTR" />
              <div className="portrait-caption"><span>LEHA</span><strong>STR</strong></div>
              <div className="portrait-status"><CircleDot size={14} /> КАНАЛ О СЛОЖНЫХ ИГРАХ</div>
            </div>
            <div className="floating-chip chip-games"><Gamepad2 size={18} /><span>ИГРЫ</span><b>05</b></div>
            <div className="floating-chip chip-alabuga"><GraduationCap size={19} /><span>АЛАБУГА</span><b>ПОЛИТЕХ</b></div>
          </div>
        </section>

        <div className="ticker"><div className="ticker-track"><span>EUROPA UNIVERSALIS</span><i>✦</i><span>KENSHI</span><i>✦</i><span>VICTORIA 3</span><i>✦</i><span>HOI4</span><i>✦</i><span>АЛАБУГА ПОЛИТЕХ</span><i>✦</i><span>EUROPA UNIVERSALIS</span><i>✦</i><span>KENSHI</span><i>✦</i><span>VICTORIA 3</span><i>✦</i><span>HOI4</span><i>✦</i><span>АЛАБУГА ПОЛИТЕХ</span><i>✦</i></div></div>

        <section className="section intro-section">
          <div className="section-kicker"><span>01</span> О проекте</div>
          <div className="intro-grid">
            <h2>ЗДЕСЬ НЕ ОБЪЯСНЯЮТ,<br />КАК <em>ПОБЕДИТЬ.</em></h2>
            <div className="intro-copy"><p>Канал о стратегиях, экономике, политике и альтернативной истории. Здесь можно увидеть, как устроены большие игры и что происходит, когда план доходит до конца.</p><p>В центре проекта — <strong>Europa Universalis, Kenshi, Victoria 3 и Hearts of Iron IV</strong>. Отдельная большая тема — <strong>«Алабуга Политех»</strong>: практическое образование и начало карьеры в Елабуге.</p></div>
          </div>
        </section>

        <section className="section videos-section" id="videos">
          <div className="section-heading"><div><div className="section-kicker"><span>02</span> Видео и моменты</div><h2>ПОСЛЕДНИЕ<br /><span>ВЫПУСКИ.</span></h2></div><div className="video-heading-links"><a className="text-link" href="https://www.youtube.com/@Leha_STR/videos" target="_blank" rel="noreferrer">Все выпуски <ArrowUpRight size={18} /></a><a className="text-link" href="https://www.youtube.com/channel/UC2qDQ6o1ZWATo1Sr_7lzCcg" target="_blank" rel="noreferrer">Моменты <ArrowUpRight size={18} /></a></div></div>
          <div className="video-grid">
            {videos.map((video, index) => <article className="video-card" key={video.id}>
              <button className="video-image" onClick={() => setActiveVideo(video)}><img src={video.image} alt="" /><span className="video-tag">{video.tag}</span><span className="video-index">0{index + 1}</span><span className="play-button" aria-hidden="true"><Play size={25} fill="currentColor" /></span><span className="sr-only">Смотреть: {video.title}</span></button>
              <div className="video-meta"><h3>{video.title}</h3><p>{video.caption}</p></div>
            </article>)}
          </div>
        </section>

        <section className="section games-section" id="games">
          <div className="section-kicker"><span>03</span> Игры</div>
          <div className="games-heading"><h2>ПЯТЬ ИГР.<br /><em>ПЯТЬ РАЗНЫХ</em><br />СИСТЕМ.</h2><p>Выбирай игру и смотри, за счёт чего она работает. Никаких декоративных карточек — только реальные механики и последствия.</p></div>
          <div className="game-explorer">
            <div className="game-tabs" role="tablist" aria-label="Любимые игры">{games.map((game) => <button key={game.id} className={activeGame === game.id ? 'active' : ''} onClick={() => setActiveGame(game.id)} role="tab" aria-selected={activeGame === game.id}><span>{game.short}</span><b>{game.name}</b><ArrowRight size={17} /></button>)}</div>
            <div className="game-panel" key={selectedGame.id}><div className="game-panel-mark">{selectedGame.short}</div><div className="game-panel-copy"><span>В ФОКУСЕ</span><h3>{selectedGame.name}</h3><p className="game-tagline">{selectedGame.tagline}</p><p>{selectedGame.description}</p><small>{selectedGame.detail}</small></div><Gamepad2 className="game-watermark" size={190} strokeWidth={.5} /></div>
          </div>
        </section>

        <section className="alabuga-section" id="alabuga">
          <div className="alabuga-intro section-shell">
            <div className="section-kicker"><span>04</span> Алабуга Политех</div>
            <div className="alabuga-title-row"><h2>ОБРАЗОВАНИЕ,<br />КОТОРОЕ<br /><em>ПРОВЕРЯЕТСЯ</em><br />ДЕЛОМ.</h2><p>«Алабуга Политех» — образовательный центр в Елабуге, где теория соединяется с практикой на современном оборудовании и в условиях, приближённых к индустрии.</p></div>
            <div className="alabuga-quick-facts"><div><MapPin size={22} /><span>Елабуга, Татарстан</span><small>ОЭЗ «Алабуга»</small></div><div><Zap size={22} /><span>Практика с первых дней</span><small>на реальном оборудовании</small></div><div><GraduationCap size={22} /><span>Ориентация на профессию</span><small>корпоративное обучение</small></div></div>
          </div>

          <div className="alabuga-feature"><div className="alabuga-image"><img src="/assets/alabuga-main.jpg" alt="Интерьер Алабуга Политех" /><div className="image-caption"><span>АЛАБУГА / POLITECH</span><span>ЕЛАБУГА</span></div></div><div className="alabuga-feature-copy"><span className="feature-label">01 / ЧТО ЭТО</span><h3>Место, где теория<br /><em>сразу</em> получает<br />практический смысл.</h3><p>Важны не только программа на бумаге, но и среда: лаборатории, инфраструктура, проектная работа и связь с производством. Так проще понять, зачем ты получаешь профессию.</p><a className="text-link" href="https://polytech.alabuga.ru/" target="_blank" rel="noreferrer">Официальный сайт <ExternalLink size={17} /></a></div></div>

          <div className="directions section-shell">
            <div className="section-kicker"><span>05</span> С чего начать</div>
            <div className="directions-layout"><div className="directions-intro"><h2>НЕ НАЗЫВАНИЕ,<br />А <em>ТВОЁ</em><br />НАПРАВЛЕНИЕ.</h2><p>На официальном сайте можно изучить направления и учебные планы. Начни с того, что тебе действительно интересно делать руками или головой.</p></div><div className="directions-list">{directions.map((direction, index) => <button key={direction} className={activeDirection === index ? 'active' : ''} onClick={() => setActiveDirection(index)}><span>0{index + 1}</span><strong>{direction}</strong><ChevronDown size={18} /></button>)}<div className="directions-detail"><BookOpen size={23} /><p>{activeDirection < 5 ? 'Здесь важны основы, логика и готовность разбираться в системе. Практика помогает понять, где теория работает, а где нужно искать другое решение.' : activeDirection === 5 ? 'Интересно тем, кто любит считать, сравнивать и видеть, как решения влияют на людей и экономику.' : 'Для тех, кто готов работать с системами, фактами и живыми кейсами, а не только с теорией.'}</p></div></div></div>
          </div>

          <div className="reasons-section section-shell"><div className="section-kicker"><span>06</span> Почему туда стоит ехать</div><h2>ЕСЛИ ХОЧЕШЬ<br /><em>ПОПРОБОВАТЬ,</em><br />А НЕ ТОЛЬКО ПРОЧИТАТЬ.</h2><div className="reason-grid">{reasons.map(({ icon: Icon, title, text }, index) => <article key={title}><span className="reason-number">0{index + 1}</span><div className="reason-icon"><Icon size={26} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div>

          <div className="trip-section section-shell"><div className="trip-copy"><div className="section-kicker"><span>07</span> Практический план</div><h2>СОБРАТЬСЯ<br />И <em>ПОЕХАТЬ.</em></h2><p>Не поездка за впечатлениями, а способ проверить, подходит ли тебе формат. Перед поездкой лучше собрать факты и не принимать решение по красивому баннеру.</p><a className="primary-button" href="https://polytech.alabuga.ru/directions/" target="_blank" rel="noreferrer">Изучить направления <ArrowUpRight size={18} /></a></div><div className="steps-card">{steps.map((step, index) => <button key={step.title} onClick={() => setTripDone((current) => current === index ? -1 : index)} className={tripDone === index ? 'done' : ''}><span className="step-number">0{index + 1}</span><span className="step-content"><strong>{step.title}</strong><small>{step.text}</small></span><span className="step-check">{tripDone === index ? <Check size={16} /> : <CircleDot size={15} />}</span></button>)}<div className="steps-progress"><span>ОТМЕЧЕНО: {tripDone + 1}/4</span><div><i style={{ width: `${tripDone >= 0 ? ((tripDone + 1) / 4) * 100 : 0}%` }} /></div></div></div></div>

          <div className="alabuga-photos section-shell"><div className="photo-large"><img src="/assets/alabuga-room.jpg" alt="Комната в общежитии Алабуга Политех" /><span>ЖИЗНЬ В КОМПЛЕКСЕ</span></div><div className="photo-small"><img src="/assets/alabuga-stairs.jpg" alt="Архитектура кампуса Алабуга Политех" /><span>СРЕДА ДЛЯ РАБОТЫ</span></div></div>
        </section>

        <section className="section socials-section" id="socials">
          <div className="socials-heading"><div className="section-kicker"><span>08</span> Соцсети LehaSTR</div><h2>ВСЕ КАНАЛЫ<br /><em>В ОДНОМ МЕСТЕ.</em></h2><p>Подписывайся на длинные выпуски, заходи на стримы и следи за короткими моментами в Telegram.</p></div>
          <div className="socials-grid">
            {socials.map(({ label, handle, href, icon: Icon, note }) => <a className="social-card" key={label} href={href} target="_blank" rel="noreferrer"><div className="social-card-top"><span className="social-big-icon"><Icon size={28} /></span><ArrowUpRight size={22} /></div><div><h3>{label}</h3><strong>{handle}</strong><p>{note}</p></div><span className="social-cta">Открыть <ArrowRight size={16} /></span></a>)}
          </div>
        </section>

        <section className="section final-cta">
          <div className="section-kicker"><span>09</span> Ещё один выпуск</div><div className="final-cta-inner"><div><h2>ВЫБЕРИ<br /><em>СЛЕДУЮЩУЮ</em><br />ТЕМУ.</h2><p>Europa Universalis, Kenshi, Victoria 3, HOI4 или «Алабуга Политех» — можно начать с любой.</p></div><div className="final-buttons"><button onClick={() => setActiveVideo(videos[0])}><Play size={19} fill="currentColor" /> YouTube</button><a href="https://www.twitch.tv/lehastroff" target="_blank" rel="noreferrer"><Twitch size={19} /> Twitch</a><a href="https://t.me/LehaSTR0" target="_blank" rel="noreferrer"><Send size={19} /> Telegram</a></div></div>
        </section>
      </main>

      <footer><Brand /><p>© 2026 LehaSTR. Без лишнего шума.</p><div><a href="https://www.youtube.com/@Leha_STR" target="_blank" rel="noreferrer">YouTube</a><a href="https://www.twitch.tv/lehastroff" target="_blank" rel="noreferrer">Twitch</a><a href="https://t.me/LehaSTR0" target="_blank" rel="noreferrer">Telegram</a></div></footer>
      {showTop && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Наверх"><ArrowUpRight size={20} /></button>}
      {activeVideo && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={activeVideo.title} onMouseDown={(e) => e.target === e.currentTarget && setActiveVideo(null)}><div className="video-modal"><button className="modal-close" onClick={() => setActiveVideo(null)} aria-label="Закрыть"><X size={23} /></button><div className="embed-wrap"><iframe src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`} title={activeVideo.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div><div className="modal-copy"><span>{activeVideo.tag}</span><h3>{activeVideo.title}</h3></div></div></div>}
    </div>
  );
}

export default App;
