const btn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu a");

if (btn && menu) {
    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (menu.classList.contains("is-open")) {
                menu.classList.remove("is-open");
                btn.setAttribute("aria-expanded", "false");
            }
        });
    });
}

const topo = document.querySelector(".topo");

links.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (targetId && targetId.startsWith("#")) {
            const section = document.querySelector(targetId);
            if (!section) return;

            event.preventDefault();

            const alturaTopo = topo ? topo.offsetHeight : 0;

            const y =
                section.getBoundingClientRect().top +
                window.scrollY -
                alturaTopo -
                5; // pequena folga

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }
    });
});

const sections = document.querySelectorAll("div[id]");
const setActive = (id) => {
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
};

if (sections.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
                });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
}