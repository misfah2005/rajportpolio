/* ── PROJECT DATA ── */
const projects = [
    {
        tag: "Web",
        title: "Manshoorah Restaurant",
        desc: "A restaurant landing page built with HTML, CSS, and JavaScript. It includes a responsive layout, menu section, and a live demo hosted on GitHub Pages.",
        techs: ["HTML", "CSS", "JavaScript"],
        links: [
            { label: "Live Demo", href: "https://misfah2005.github.io/manshoorah-resturant22/", primary: true },
            { label: "GitHub", href: "https://github.com/misfah2005/manshoorah-resturant22", primary: false }
        ]
    },
    {
        tag: "Python",
        title: "Project Two",
        desc: "A full description of your second project. Was it an automation script? A data pipeline? A CLI tool? Describe what it does, why you built it, and what you gained from building it.",
        techs: ["Python", "SQL"],
        links: [
            { label: "GitHub", href: "#", primary: true }
        ]
    },
    {
        tag: "Database",
        title: "Project Three",
        desc: "A full description of your third project. Maybe it was a database design exercise, a CRUD application, or an analytics project. Explain the schema, queries, and the insights you got from the data.",
        techs: ["SQL", "Python"],
        links: [
            { label: "GitHub", href: "#", primary: true }
        ]
    }
];

/* ── SCROLL PROGRESS ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docH * 100) + '%';
});

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.style.transitionDelay = (i * 0.06) + 's';
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* ── TYPING EFFECT ── */
const roles = [
    "Software Engineering Student",
    "Web Developer",
    "Python Enthusiast",
    "Problem Solver",
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function type() {
    const current = roles[ri];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ++ci);
        if (ci === current.length) { deleting = true; setTimeout(type, 1600); return; }
    } else {
        typedEl.textContent = current.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 85);
}
type();

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('theme-btn');
let light = false;
themeBtn.addEventListener('click', () => {
    light = !light;
    document.body.classList.toggle('light', light);
    themeBtn.textContent = light ? '🌙 Dark' : '☀️ Light';
});

/* ── MODAL ── */
const overlay = document.getElementById('modal-overlay');
const mClose = document.getElementById('modal-close');
const mTag = document.getElementById('m-tag');
const mTitle = document.getElementById('m-title');
const mDesc = document.getElementById('m-desc');
const mTechs = document.getElementById('m-techs');
const mLinks = document.getElementById('m-links');

document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
        const p = projects[+card.dataset.modal];
        mTag.textContent = p.tag;
        mTitle.textContent = p.title;
        mDesc.textContent = p.desc;
        mTechs.innerHTML = p.techs.map(t => `<span class="tech-pill">${t}</span>`).join('');
        mLinks.innerHTML = p.links.map(l =>
            `<a class="modal-link ${l.primary ? 'ml-primary' : 'ml-outline'}" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
        ).join('');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}
mClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });