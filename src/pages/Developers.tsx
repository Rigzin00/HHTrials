import { Code2, ExternalLink, Github, Layers3, ShieldCheck } from 'lucide-react';

const principles = [
  {
    icon: Layers3,
    title: 'Reliable Architecture',
    description:
      'We build with modular patterns and maintainable structure so features can evolve without instability.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality First',
    description:
      'Every release is guided by careful implementation, code review discipline, and user-focused performance.',
  },
  {
    icon: Code2,
    title: 'Practical Engineering',
    description:
      'We prioritize clean execution and meaningful outcomes over complexity, keeping the product dependable.',
  },
];

const developers = [
  {
    name: 'Rigzin Angtak',
    role: 'Code Developer',
    username: '@Rigzin00',
    github: 'https://github.com/Rigzin00',
    focus: 'Product direction, full-stack implementation, and delivery planning.',
  },
  {
    name: 'Pranav',
    role: 'Code Developer',
    username: '@trulyPranav',
    github: 'https://github.com/trulyPranav',
    focus: 'Frontend quality, interaction flow, and scalable component development.',
  },
  {
    name: 'Anees Muhammeed',
    role: 'Code Developer',
    username: '@aneesmuhammeed',
    github: 'https://github.com/aneesmuhammeed',
    focus: 'Backend integration, system reliability, and platform consistency.',
  },
];

export default function Developers() {
  return (
    <main className="flex-grow pt-[72px] bg-[#F7F6F2]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <section className="px-6 md:px-10 lg:px-16 py-14 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(120deg, #2B1E17 0%, #3A2A21 55%, #4C3B2F 100%)',
              boxShadow: '0 14px 40px rgba(43, 30, 23, 0.2)',
            }}
          >
            <div className="px-6 md:px-10 lg:px-14 py-12 md:py-14">
              <p className="tracking-[0.2em] uppercase text-xs" style={{ color: 'rgba(255, 255, 255, 0.78)' }}>
                Engineering Team
              </p>
              <h1
                className="font-berlin mt-3"
                style={{ color: '#FFF8EE', fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.1 }}
              >
                Meet The Developers
              </h1>
              <p
                className="mt-4 max-w-3xl"
                style={{ color: '#F3E8DA', fontSize: 'clamp(14px, 2vw, 17px)', lineHeight: 1.7 }}
              >
                This page highlights the engineers behind Heritage Himalaya Trails. Our development approach is
                centered on reliability, performance, and a thoughtful digital experience aligned with the brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
            <article
              key={item.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DFD4' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid #E7DCCD' }}
              >
                <Icon className="w-5 h-5" style={{ color: '#2B1E17' }} />
              </div>
              <h2 className="font-berlin" style={{ color: '#2B1E17', fontSize: '22px' }}>
                {item.title}
              </h2>
              <p className="mt-3" style={{ color: '#6B5E55', lineHeight: 1.7, fontSize: '14px' }}>
                {item.description}
              </p>
            </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 pb-16 lg:pb-24">
        <div
          className="max-w-6xl mx-auto rounded-2xl p-6 md:p-8 lg:p-10"
          style={{ backgroundColor: '#FFFDF9', border: '1px solid #E8DFD4' }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="font-berlin" style={{ color: '#2B1E17', fontSize: 'clamp(24px, 4vw, 36px)' }}>
              Development Team
            </h2>
            <p style={{ color: '#6B5E55', fontSize: '14px' }}>Official code developers of this website</p>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {developers.map((developer) => (
              <article
                key={developer.github}
                className="rounded-xl p-5"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid #E5DACC' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 style={{ color: '#2B1E17', fontSize: '18px', fontWeight: 600 }}>{developer.name}</h3>
                    <p style={{ color: '#6B5E55', fontSize: '13px', marginTop: '2px' }}>{developer.role}</p>
                  </div>
                  <Github className="w-5 h-5" style={{ color: '#2B1E17' }} />
                </div>

                <p className="mt-3" style={{ color: '#6B5E55', fontSize: '14px', lineHeight: 1.7 }}>
                  {developer.focus}
                </p>

                <a
                  href={developer.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2"
                  style={{ color: '#2B1E17', fontSize: '14px', fontWeight: 600 }}
                >
                  {developer.username}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
