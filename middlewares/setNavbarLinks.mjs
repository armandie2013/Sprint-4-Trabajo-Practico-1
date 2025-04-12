export default function setNavbarLinks(req, res, next) {
    res.locals.navbarLinks = [
      { href: "/api/desa/heroes/index", icon: "/icons/home.svg", text: "Inicio" },
      { href: "/api/desa/heroes/dashboard", icon: "/icons/hero.svg", text: "Dashboard" },
      { href: "/api/desa/heroes/crear", icon: "/icons/add.svg", text: "Crear Héroe" },
    ];
    next();
  }