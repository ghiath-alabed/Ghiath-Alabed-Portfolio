import swarmImg from './assets/swarm.png';
import swarmImg2 from './assets/swarm2.png';
import swarmImg3 from './assets/swarm3.png';
import swarmImg4 from './assets/swarm4.png';
import swarmImg5 from './assets/swarm5.png';
import stickImg from './assets/stick.png';
import stickImg2 from './assets/stick2.png';
import stickImg3 from './assets/stick3.png';
import stickImg4 from './assets/stick4.png';
import stickImg5 from './assets/stick5.png';
import lazyImg from './assets/lazy.png';
import lazyImg2 from './assets/lazy2.png';
import lazyImg3 from './assets/lazy3.png';
import lazyVideo from './assets/Lazy Ball tutorial.mp4';
import freelancyoImg1 from './assets/1.png';
import freelancyoImg2 from './assets/2.png';
import freelancyoImg3 from './assets/3.png';
import freelancyoImg4 from './assets/4.png';
import Sidequest1 from './assets/Sidequest1.png';

export const ALL_PROJECTS = [
  {
    slug: 'freeLancyo',
    title: 'FreeLancyo',
    titleHighlight: 'Lancyo',
    category: 'Website',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    desc: 'A dedicated workspace designed to help freelancers manage their business without the clutter — track projects and generate professional contracts effortlessly.',
    longDesc: `Freelancyo is a dedicated workspace designed to help freelancers manage their business without the clutter. While most tools are overwhelmingly complex, Freelancyo focuses on a smooth, unified workflow. It allows freelancers to easily track projects and generate professional contracts — either from ready-made templates or by building custom ones from scratch.\n\nCurrently in active development, with many more features on the roadmap to make independent work effortless.`,
    features: [
      'Streamlined Project Management: An uncluttered dashboard to track ongoing work and client projects effortlessly.',
      'Smart Contracting: Users can generate professional agreements using ready-made templates or build highly customizable contracts from scratch.',
    ],
    images: [freelancyoImg1, freelancyoImg2, freelancyoImg3, freelancyoImg4],
    youtube: null,
    github: null,
    liveUrl: 'https://freelancyo.com/',
    status: 'In Development',
  },
  {
    slug: 'lazy-ball',
    title: 'Lazy Ball',
    category: 'Game Development',
    videoDelay: 8,
    tags: ['Unity', 'C#'],
    desc: "A reflex-speed game with 3 modes: endless, normal, and puzzle. Draw the ball's path to reach the goal.",
    longDesc: `Lazy Ball is a creative reflex game where players draw the ball's path instead of controlling it directly. Guide the ball through obstacles by sketching lines and curves, reaching the goal before time runs out or the ball falls.\n\nThree game modes keep the experience fresh: Endless Mode ramps up difficulty infinitely; Normal Mode offers handcrafted levels with clear objectives; Puzzle Mode introduces logic-based challenges where the path must be precisely planned before the ball moves.`,
    features: [
      'Unique draw-the-path control scheme',
      'Endless, Normal, and Puzzle modes',
      'Physics-based ball movement',
      'Progressive difficulty scaling',
      'Clean minimalist visual design',
    ],
    video: lazyVideo,
    images: [lazyImg, lazyImg2, lazyImg3],
    youtube: null,
    github: null,
    liveUrl: 'https://lazyball.online/',
    status: 'Completed',
  },
  {
    slug: 'stick-torture',
    title: 'Stick Torture',
    category: 'Game Development',
    tags: ['Unity', 'C#', 'Aseprite'],
    desc: 'A 2D platformer with trap mechanisms, escape levels, side-scroller combat, and boss fights.',
    longDesc: `Stick Torture is a 2D action-platformer crafted in Unity. Players control a stick figure navigating deadly trap-filled stages, precise side-scroller combat segments, and climactic boss battles. Every level introduces new mechanics — from timed spike fields and rotating blades to enemy patrols and projectile patterns.\n\nAll pixel-art assets and animations were hand-crafted in Aseprite, giving the game a polished yet brutal feel. The combination of tight controls and creative level design makes each playthrough both punishing and rewarding.`,
    features: [
      'Multi-stage trap-based escape levels',
      'Side-scroller combat with combos and dodges',
      'Unique boss fights per world',
      'Hand-crafted pixel art in Aseprite',
      'Checkpoint system with lives mechanic',
    ],
    images: [stickImg, stickImg2, stickImg3, stickImg4, stickImg5],
    youtube: null,
    github: null,
    liveUrl: null,
    status: 'Completed',
  },
  {
    slug: 'Sidequest',
    title: 'Sidequest',
    category: 'Mobile App',
    tags: ['React Native', 'JavaScript', 'Expo'],
    desc: 'A cross-platform mobile task manager with categories, priorities, due dates, and offline support.',
    longDesc: `Task Manager is a cross-platform mobile application built with React Native and Expo. It lets users organise their tasks into custom categories, assign priority levels, and set due dates with local notifications.\n\nThe app stores all data locally using AsyncStorage, so it works fully offline. A clean dark-mode UI keeps the experience focused and clutter-free. Tasks can be filtered by category or priority, and completed tasks are archived for future reference.`,
    features: [
      'Create, edit, and delete tasks with priorities',
      'Custom categories with colour labels',
      'Due date reminders via local notifications',
      'Full offline support with AsyncStorage',
      'Filter and search across all tasks',
      'Dark-mode first UI',
    ],
    images: [Sidequest1],
    youtube: null,
    github: null,
    liveUrl: null,
    status: 'In Development',
  },
  {
    slug: 'swarm',
    title: 'Swarm',
    category: 'Game Development',
    tags: ['C#', 'Unity'],
    desc: 'A Roguelike game testing patience and skills. Players lose all progress on death and face boss fights.',
    longDesc: `Swarm is a challenging Roguelike game built in Unity using C#. The core philosophy is unforgiving progression — every run is unique, and death means starting over from scratch. Players navigate procedurally generated dungeons, encounter increasingly dangerous enemy swarms, and face powerful boss fights that push their skills to the limit.\n\nThe game features a deep item and upgrade system, letting players customise their build on each run. Permanent death keeps the tension high, while unlockable meta-progression rewards long-term play.`,
    features: [
      'Roguelike permadeath — all progress lost on death',
      'Procedurally generated levels for unique runs',
      'Multiple boss fights with distinct attack patterns',
      'Item and upgrade system with synergies',
      'Pixel-art visuals and full custom soundtrack',
    ],
    images: [swarmImg, swarmImg2, swarmImg3, swarmImg4, swarmImg5],
    youtube: null,
    github: null,
    liveUrl: null,
    status: 'In Development',
  }
];
