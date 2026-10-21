"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Arrow, ButtonLink, Wordmark } from "@/components/ui";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);
  const previousPath = useRef(pathname);
  const solid = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) return;

    const sentinel = document.querySelector("[data-header-sentinel]");
    if (!sentinel || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry?.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome, pathname]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (menuOpen) {
      restoreFocusRef.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- el menú debe cerrarse cuando cambia la ruta por navegación del historial.
      setMenuOpen(false);
    }
  }, [pathname, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const trigger = triggerRef.current;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const inertTargets = [
      document.getElementById("contenido"),
      document.querySelector(".site-header"),
      document.querySelector(".site-footer"),
    ].filter((node): node is HTMLElement => Boolean(node));

    restoreFocusRef.current = true;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    inertTargets.forEach((node) => node.setAttribute("inert", ""));

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusable = Array.from(overlay.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (node) => node.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      inertTargets.forEach((node) => node.removeAttribute("inert"));
      if (restoreFocusRef.current) {
        (previousFocus ?? trigger)?.focus();
      }
    };
  }, [menuOpen]);

  const openMenu = () => {
    restoreFocusRef.current = true;
    setMenuOpen(true);
  };

  const closeMenu = (restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setMenuOpen(false);
  };

  const handleMenuLink = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    closeMenu(false);
  };

  return (
    <>
      <header className="site-header" data-solid={solid} data-menu-open={menuOpen}>
        <div className="site-header__inner">
          <Wordmark className="site-header__wordmark" />

          <nav className="site-nav" aria-label="Navegación principal">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("site-nav__link", isActive(pathname, item.href) && "is-active")}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <span className="language-tag" lang="es" title="Contenido disponible en español">
              ES
            </span>
            <ButtonLink href="/contacto" variant="outline" className="header-cta">
              Solicitar consulta
            </ButtonLink>
            <button
              ref={triggerRef}
              type="button"
              className="menu-trigger"
              aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={openMenu}
            >
              <span aria-hidden="true">Menú</span>
              <span className="menu-trigger__icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={overlayRef}
              id="site-menu"
              className="menu-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Navegación principal"
            >
              <div className="menu-overlay__top">
                <Wordmark
                  className="menu-overlay__wordmark"
                  onNavigate={() => closeMenu(false)}
                />
                <button
                  ref={closeRef}
                  type="button"
                  className="menu-close"
                  aria-label="Cerrar menú de navegación"
                  onClick={() => closeMenu(true)}
                >
                  <span aria-hidden="true">Cerrar</span>
                  <span className="menu-close__icon" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>
              </div>

              <div className="menu-overlay__body">
                <nav className="menu-nav" aria-label="Navegación móvil">
                  <ol className="menu-list">
                    {site.nav.map((item, index) => (
                      <li key={item.href} className="menu-list__item" style={{ "--item": index } as CSSProperties}>
                        <Link
                          href={item.href}
                          className={cn("menu-list__link", isActive(pathname, item.href) && "is-active")}
                          onClick={handleMenuLink}
                          aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        >
                          <span className="menu-list__index" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="menu-list__label">{item.label}</span>
                          <Arrow className="menu-list__arrow" />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>

                <aside className="menu-aside" aria-label="Información de contacto">
                  <p className="menu-aside__kicker">Estrategia jurídica · {site.location}</p>
                  <p className="menu-aside__quote">{site.tagline}</p>
                  <ButtonLink
                    href="/consulta-guiada"
                    variant="outline"
                    className="menu-aside__cta"
                    onClick={() => closeMenu(false)}
                  >
                    Consulta guiada
                  </ButtonLink>
                  <div className="menu-aside__contact">
                    <p className="menu-aside__label">Contacto</p>
                    <p>{site.email}</p>
                    <p>{site.phone}</p>
                    <p className="menu-aside__demo">Datos de demostración</p>
                  </div>
                  <div className="menu-aside__legal">
                    <Link href="/legal/privacidad" onClick={() => closeMenu(false)}>
                      Privacidad
                    </Link>
                    <Link href="/legal/aviso-legal" onClick={() => closeMenu(false)}>
                      Aviso legal
                    </Link>
                  </div>
                </aside>
              </div>

              <div className="menu-overlay__foot">
                <span>{site.name} · {site.descriptor}</span>
                <span>ES</span>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
