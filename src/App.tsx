import { type FormEvent, useEffect, useRef, useState } from 'react';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  ArrowRight,
  Beef,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Flame,
  Instagram,
  Mail,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Star,
  Utensils,
  User,
  X,
} from 'lucide-react';
import {
  Button,
  Card,
  CssBaseline,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const whatsappUrl =
  'https://wa.me/553192779826?text=Oi%2C%20quero%20conhecer%20a%20Let%27s%20Brasa.';

const brand = {
  name: "Let's Brasa",
  short: "Let's",
  accent: 'Brasa',
  curator: 'Dennis Meat',
  burger: 'Meat Bullguer',
};

const phoneValidation = {
  inputMode: 'numeric' as const,
  minLength: 11,
  maxLength: 11,
  pattern: '\\d{11}',
  title: 'Digite exatamente 11 numeros, incluindo DDD.',
};

function onlyElevenDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 11);
}

function handleValidatedSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!event.currentTarget.reportValidity()) {
    return;
  }
}

const slides = [
  {
    title: "Let's Brasa.",
    subtitle: 'Um ecossistema de brasa, cortes, hamburgueria e conteudo guiado por quem vive churrasco.',
    image:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1800&q=85',
  },
  {
    title: 'Marcas conectadas.',
    subtitle: 'Conteudo, cortes e hamburgueria nascem do mesmo fogo, com linguagem propria e identidade integrada.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
  },
  {
    title: 'Meat Bullguer acende.',
    subtitle: 'A hamburgueria do ecossistema leva blend, fogo e molhos autorais para uma experiencia mais urbana.',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=85',
  },
];

const menuItems = [
  ["Picanha Let's Brasa", 'Corte nobre selado na brasa, sal parrilla e manteiga da casa.', 'R$ 89'],
  ['Costela 8h', 'Defumada lentamente, finalizada com molho reduzido e farofa crocante.', 'R$ 76'],
  ["Brisket Let's Brasa", 'Fatia suculenta, bark escuro e barbecue de goiabada levemente picante.', 'R$ 68'],
  ['Espeto Misto', 'Carne, linguica artesanal, frango e queijo coalho no ponto da brasa.', 'R$ 42'],
  ['Meat Bullguer Smash', 'Blend da casa, queijo, cebola tostada e maionese de alho assado.', 'R$ 38'],
  ['Bullguer Brasa Duplo', 'Dois blends, cheddar, bacon tostado e molho defumado da hamburgueria.', 'R$ 46'],
  ['Combo Familia', 'Cortes variados, arroz, vinagrete, farofa, pao de alho e mandioca.', 'R$ 159'],
];

const ecosystemItems = [
  {
    name: brand.name,
    role: 'Casa mae',
    description: 'A base de churrasco, eventos, cortes especiais e experiencias ao redor da brasa.',
  },
  {
    name: 'Conteudo de brasa',
    role: 'Curadoria',
    description: 'Bastidores, tecnicas e historias aparecem como apoio silencioso para fortalecer as marcas.',
  },
  {
    name: brand.burger,
    role: 'Hamburgueria',
    description: 'A frente urbana do ecossistema, com burgers de fogo alto, molhos e combos autorais.',
  },
];

const posts = [
  {
    title: 'Como escolher o ponto da carne sem perder suculencia',
    date: '18 abr',
    text: 'Um guia rapido para entender descanso, selagem e temperatura antes de cortar.',
  },
  {
    title: 'O segredo da costela macia comeca antes da fumaca',
    date: '09 abr',
    text: 'Tempo, gordura e paciencia fazem a diferenca entre assado comum e assinatura da casa.',
  },
  {
    title: 'Acompanhamentos que seguram o churrasco',
    date: '28 mar',
    text: 'Farofa, vinagrete e pao de alho tambem tem tecnica, textura e intencao.',
  },
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c49343',
      contrastText: '#130b07',
    },
    secondary: {
      main: '#8f2f24',
    },
    background: {
      default: '#0d0b09',
      paper: '#17110d',
    },
    text: {
      primary: '#f6efe5',
      secondary: '#c9b8a4',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: {
      fontWeight: 850,
      textTransform: 'none',
    },
  },
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Ir para a home" onClick={() => setMenuOpen(false)}>
        <span className="brand-fire">{brand.short}</span>
        <strong className="brand-ground">{brand.accent}</strong>
      </NavLink>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Abrir navegacao"
      >
        {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
      </button>

      <nav className={menuOpen ? 'open' : ''} aria-label="Navegacao principal">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/menu" onClick={() => setMenuOpen(false)}>
          Menu
        </NavLink>
        <NavLink to="/blog" onClick={() => setMenuOpen(false)}>
          Blog
        </NavLink>
        <a href="#pedido" onClick={() => setMenuOpen(false)}>
          Pedido
        </a>
        <a className="nav-cta" href="#pedido" onClick={() => setMenuOpen(false)}>
          Orçamento
        </a>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <>
      <section className="hero" aria-label={brand.name}>
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          speed={2000}
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: false }}
          navigation={{ prevEl: '.carousel-prev', nextEl: '.carousel-next' }}
          pagination={{ clickable: true }}
        >
          {slides.map((item) => (
            <SwiperSlide key={item.title}>
              <img src={item.image} alt="" className="hero-image" />
              <div className="hero-shade" />
              <div className="hero-content">
                <p className="eyebrow">Ecossistema de brasa / conteudo / marcas</p>
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>
                <div className="hero-actions">
                  <Button
                    className="primary-button"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    endIcon={<MessageCircle size={18} />}
                  >
                    Falar no WhatsApp
                  </Button>
                  <Button className="secondary-button" href={`${import.meta.env.BASE_URL}menu`} endIcon={<ArrowRight size={18} />}>
                    Ver menu
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="carousel-controls" aria-label="Controles do carrossel">
          <button className="carousel-prev" aria-label="Imagem anterior">
            <ChevronLeft size={22} />
          </button>
          <span>Arraste</span>
          <button className="carousel-next" aria-label="Proxima imagem">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      <section className="signature-strip">
        <article>
          <Flame size={24} />
          <span>Brasa controlada</span>
        </article>
        <article>
          <Beef size={24} />
          <span>Cortes selecionados</span>
        </article>
        <article>
          <Utensils size={24} />
          <span>Porcoes para compartilhar</span>
        </article>
      </section>

      <motion.section className="section-grid" {...fadeUp}>
        <div className="section-copy">
          <p className="eyebrow">A casa</p>
          <h2>Uma marca principal para organizar tudo que nasce da brasa.</h2>
          <p>
            A {brand.name} funciona como casa mae: churrasco, eventos, conteudo, produtos e
            experiencias. A marca organiza cada frente do projeto para que a brasa, a hamburgueria e
            os cortes especiais tenham presenca propria dentro do mesmo universo.
          </p>
        </div>
        <div className="feature-panel">
          <span>Visao da marca</span>
          <strong>Brasa como plataforma</strong>
          <p>Cortes, burgers, acompanhamentos e conhecimento trabalhando dentro do mesmo universo.</p>
        </div>
      </motion.section>

      <motion.section className="ecosystem-section" {...fadeUp}>
        <div className="section-heading">
          <p className="eyebrow">Ecossistema</p>
          <h2>Uma arquitetura pronta para novas marcas.</h2>
        </div>
        <div className="ecosystem-grid">
          {ecosystemItems.map((item) => (
            <Card component="article" className="ecosystem-card" key={item.name}>
              <span>{item.role}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section className="story-section contrast-red" {...fadeUp}>
        <div className="story-media story-media-blogger" aria-label="Blogista segurando corte de carne na brasa" />
        <div className="story-copy">
          <p className="eyebrow">Do blog</p>
          <h2>O blog apresenta a cultura por tras das marcas.</h2>
          <p>
            A historia com a brasa comecou em encontros simples, daqueles em que o fogo virava
            motivo para reunir gente e conversar por horas. Foi nesse tempo de teste, erro e ponto
            certo que nasceu a vontade de viver churrasco como oficio.
          </p>
          <p>
            Cada corte ensinou alguma coisa: respeitar a gordura, esperar o descanso, ouvir o som da
            grelha e entender que churrasco bom nao e pressa. O conteudo apoia a Let's Brasa e a
            Meat Bullguer sem competir com elas.
          </p>
          <Button className="secondary-button" href={`${import.meta.env.BASE_URL}blog`} endIcon={<ArrowRight size={18} />}>
            Ler no blog
          </Button>
        </div>
      </motion.section>

      <motion.section className="knowledge-section" {...fadeUp}>
        <div className="section-heading">
          <p className="eyebrow">Conhecimento de cortes</p>
          <h2>O corte certo muda o jeito de servir.</h2>
        </div>
        <div className="knowledge-grid">
          <Card component="article" className="knowledge-card">
            <Beef size={22} />
            <h3>Picanha e cortes altos</h3>
            <p>
              Ideais para selagem forte, descanso curto e fatias suculentas. A gordura protege a
              carne e entrega sabor sem exagero.
            </p>
          </Card>
          <Card component="article" className="knowledge-card highlighted">
            <Flame size={22} />
            <h3>Costela e brisket</h3>
            <p>
              Pedem fogo indireto, tempo e fumaca controlada. O resultado vem da paciencia, nao da
              chama alta.
            </p>
          </Card>
          <Card component="article" className="knowledge-card">
            <Utensils size={22} />
            <h3>Linguicas e espetos</h3>
            <p>
              Entram para abrir o apetite, equilibrar a mesa e criar variedade entre cortes nobres e
              porcoes para dividir.
            </p>
          </Card>
        </div>
      </motion.section>

      <motion.section className="story-section contrast-amber reverse" {...fadeUp}>
        <div className="story-media story-media-side" />
        <div className="story-copy">
          <p className="eyebrow">Acompanhamentos</p>
          <h2>O acompanhamento tambem precisa ter brasa.</h2>
          <p>
            Um bom churrasco nao vive so do corte principal. Pao de alho, farofa, vinagrete e
            mandioca seguram textura, acidez e crocancia para a carne brilhar mais.
          </p>
          <p>
            O choripan entra como exemplo perfeito: linguica bem dourada, pao tostado, molho fresco
            e gordura no ponto. E simples, direto e tem cara de churrasco servido na mao, perto do
            fogo.
          </p>
        </div>
      </motion.section>

      <section className="favorites">
        <div className="section-heading">
          <p className="eyebrow">Mais pedidos</p>
          <h2>Cortes que chamam mesa cheia</h2>
        </div>
        <div className="favorite-grid">
          {menuItems.slice(0, 3).map(([name, description, price], index) => (
            <motion.div key={name} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }}>
              <Card component="article" className="dish-card">
                <Star size={18} />
                <h3>{name}</h3>
                <p>{description}</p>
                <strong>{price}</strong>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <OrderSection />
    </>
  );
}

function MenuPage() {
  return (
    <section className="page-shell">
      <div className="section-heading">
        <p className="eyebrow">Cardapio</p>
        <h1>Menu do Ecossistema</h1>
      </div>
      <div className="menu-list">
        {menuItems.map(([name, description, price]) => (
          <Card component="article" className="menu-row" key={name}>
            <div>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
            <strong>{price}</strong>
          </Card>
        ))}
      </div>
    </section>
  );
}

function BlogPage() {
  return (
    <section className="page-shell">
      <div className="section-heading">
        <p className="eyebrow">Conteudo</p>
        <h1>Blog da Brasa</h1>
      </div>
      <div className="blog-grid">
        {posts.map((post) => (
          <Card component="article" className="post-card" key={post.title}>
            <CalendarDays size={20} />
            <span>{post.date}</span>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <Button className="secondary-button" endIcon={<ArrowRight size={16} />}>
              Ler artigo
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section id="inscricao" className="signup">
      <div>
        <p className="eyebrow">Lista do ecossistema</p>
        <h2>Receba novidades da Let's Brasa, Meat Bullguer e conteudos da brasa.</h2>
      </div>
      <form onSubmit={handleValidatedSubmit}>
        <TextField
          className="signup-input"
          type="email"
          placeholder="seu@email.com"
          aria-label="Email"
          variant="outlined"
          size="small"
          fullWidth
          required
          slotProps={{
            htmlInput: {
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
              title: 'Digite um email valido com @ e dominio.',
            },
          }}
        />
        <Button type="submit" className="primary-button" endIcon={<Mail size={18} />}>
          Inscrever
        </Button>
      </form>
    </section>
  );
}

function OrderSection() {
  const [phone, setPhone] = useState('');

  return (
    <motion.section id="pedido" className="order-section" {...fadeUp}>
      <div className="order-copy">
        <p className="eyebrow">Experiencia</p>
        <h2>Monte seu cardapio e viva uma experiencia de brasa.</h2>
        <p>
          Conte a ocasiao, o numero de pessoas e o estilo da mesa. A equipe retorna pelo WhatsApp
          com uma sugestao sob medida para {brand.name}, {brand.burger} ou uma experiencia completa.
        </p>
      </div>
      <Card component="form" className="order-form" onSubmit={handleValidatedSubmit}>
        <TextField label="Nome" placeholder="Seu nome" variant="outlined" fullWidth required />
        <TextField
          label="Telefone"
          placeholder="11999999999"
          variant="outlined"
          fullWidth
          required
          type="tel"
          value={phone}
          slotProps={{
            htmlInput: phoneValidation,
          }}
          onChange={(event) => {
            setPhone(onlyElevenDigits(event.target.value));
          }}
        />
        <TextField
          label="Tipo de experiencia"
          placeholder="Churrasco, Meat Bullguer, evento ou cardapio sob medida"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Detalhes"
          placeholder="Conte quantas pessoas, cortes desejados, acompanhamentos e horario ideal"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
        />
        <div className="order-actions">
          <span>
            <ClipboardList size={18} /> Confirmacao pelo WhatsApp
          </span>
          <Button type="submit" className="primary-button" endIcon={<MessageCircle size={18} />}>
            Montar experiencia
          </Button>
        </div>
      </Card>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-logo">
          <span className="brand-fire">{brand.short}</span>
          <strong className="brand-ground">{brand.accent}</strong>
        </div>
        <p>
          Ecossistema de brasa com churrasco, hamburgueria, conteudo e marcas conectadas por uma
          mesma cultura de fogo.
        </p>
      </div>
      <div className="socials">
        <a href="https://www.instagram.com/dennismeat/" target="_blank" rel="noreferrer">
          <Instagram size={18} /> Instagram
        </a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> WhatsApp
        </a>
        <a href="tel:+5500000000000">
          <Phone size={18} /> Contato
        </a>
        <a href="#inscricao">
          <User size={18} /> Lista VIP
        </a>
      </div>
    </footer>
  );
}

function SpecialPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const popupRef = useRef<HTMLElement | null>(null);
  const [bottomOffset, setBottomOffset] = useState(96);
  const [canShowOnMobile, setCanShowOnMobile] = useState(false);

  useEffect(() => {
    function updatePopupOffset() {
      const footer = document.querySelector('footer');
      const header = document.querySelector('.site-header');
      const popup = popupRef.current;
      const mobile = window.matchMedia('(max-width: 820px)').matches;

      setCanShowOnMobile(!mobile || window.scrollY > (header?.clientHeight ?? 76));

      if (!footer || !popup) {
        return;
      }

      const baseBottom = mobile ? 91 : 96;
      const footerTop = footer.getBoundingClientRect().top;
      const gap = 16;
      const popupBottom = window.innerHeight - baseBottom;
      const nextBottom = footerTop <= popupBottom + gap
        ? Math.max(baseBottom, window.innerHeight - footerTop + gap)
        : baseBottom;

      setBottomOffset(nextBottom);
    }

    updatePopupOffset();
    window.addEventListener('scroll', updatePopupOffset, { passive: true });
    window.addEventListener('resize', updatePopupOffset);

    return () => {
      window.removeEventListener('scroll', updatePopupOffset);
      window.removeEventListener('resize', updatePopupOffset);
    };
  }, []);

  if (!open || !canShowOnMobile) {
    return null;
  }

  return (
    <motion.aside
      ref={popupRef}
      className="special-popup"
      aria-label="Prato do dia"
      style={{ bottom: `${bottomOffset}px` }}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24 }}
    >
      <button onClick={onClose} aria-label="Fechar prato do dia">
        <X size={18} />
      </button>
      <span>Destaque do ecossistema</span>
      <img
        className="special-image"
        src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=720&q=85"
        alt="Brisket fatiado servido na brasa"
      />
      <strong>Brisket Let's Brasa</strong>
      <p>Um destaque de brasa lenta dentro do ecossistema Let's Brasa.</p>
      <a href={whatsappUrl} target="_blank" rel="noreferrer">
        Reservar agora
      </a>
    </motion.aside>
  );
}

function AppShell() {
  const [showSpecial, setShowSpecial] = useState(true);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <Signup />
      </main>
      <Footer />
      <SpecialPopup open={showSpecial} onClose={() => setShowSpecial(false)} />
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chamar no WhatsApp">
        <MessageCircle size={28} />
      </a>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={import.meta.env.BASE_URL}>
        <AppShell />
      </Router>
    </ThemeProvider>
  );
}

export default App;
