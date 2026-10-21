import Link from "next/link";
import { practices } from "@/content/practices";
import { categories } from "@/content/perspectives";
import { site } from "@/content/site";
import { ButtonLink, Rule, Wordmark } from "@/components/ui";

const legalLinks = [
  { href: "/legal/privacidad", label: "Política de privacidad" },
  { href: "/legal/tratamiento-de-datos", label: "Tratamiento de datos" },
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/creditos", label: "Créditos" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" id="pie">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Wordmark className="site-footer__wordmark" />
          <p className="site-footer__statement">
            La ley establece el marco.
            <br />
            <em>La estrategia define el resultado.</em>
          </p>
          <p className="site-footer__demo">
            <span aria-hidden="true" className="status-dot" />
            {site.demoLabel}. {site.demoNotice}
          </p>
        </div>

        <div className="site-footer__columns">
          <nav className="footer-col" aria-label="Firma">
            <p className="footer-col__title">Firma</p>
            <Link href="/la-firma">La firma</Link>
            <Link href="/la-firma#metodologia">Metodología</Link>
            <Link href="/la-firma#equipo">Equipo</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>

          <nav className="footer-col" aria-label="Áreas de práctica">
            <p className="footer-col__title">Práctica</p>
            {practices.map((practice) => (
              <Link key={practice.slug} href={`/areas-de-practica/${practice.slug}`}>
                {practice.shortTitle}
              </Link>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Perspectivas">
            <p className="footer-col__title">Perspectivas</p>
            <Link href="/perspectivas">Todas las publicaciones</Link>
            {categories.slice(0, 4).map((category) => (
              <Link key={category.slug} href={`/perspectivas/categoria/${category.slug}`}>
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="footer-col footer-col--contact">
            <p className="footer-col__title">Contacto</p>
            <p>{site.location}</p>
            <p>{site.email}</p>
            <p>{site.phone}</p>
            <p className="footer-col__muted">Datos de demostración</p>
            <ButtonLink href="/contacto" variant="quiet" className="footer-col__cta">
              Solicitar una consulta
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="site-footer__monument" aria-hidden="true">
        <span>{site.name}</span>
        <Rule />
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {site.name}. Proyecto conceptual sin actividad profesional.
        </p>
        <nav aria-label="Información legal" className="site-footer__legal">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="site-footer__signature">Geometría editorial · {site.descriptor}</p>
      </div>
    </footer>
  );
}
