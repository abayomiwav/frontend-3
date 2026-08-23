import Link from 'next/link';
import { LogoWordmark } from '@/components/logo-mark';
import { DiscordIcon, GithubIcon, XIcon } from '@/components/social-icons';
import { Container } from '@/components/ui/container';
import { footerNav, siteConfig } from '@/lib/data';

const socialIcons = {
  GitHub: GithubIcon,
  X: XIcon,
  Discord: DiscordIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <Container className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
          <LogoWordmark />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline} A logistics platform built on Stellar.
          </p>
          <div className="flex gap-3 pt-1">
            {[
              { label: 'GitHub', href: siteConfig.github },
              { label: 'X', href: siteConfig.x },
              { label: 'Discord', href: siteConfig.discord },
            ].map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {Object.entries(footerNav).map(([section, links]) => (
          <div key={section} className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold">{section}</h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} StellarExpress. Built on Stellar.</p>
          <p>Not a courier. Not custodial. Just the escrow, on-chain.</p>
        </Container>
      </div>
    </footer>
  );
}
