import { contact } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { Facebook, Github, Instagram, Youtube } from "@/components/icons";

const socials = [
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "YouTube", href: contact.youtube, icon: Youtube },
  { label: "Instagram", href: contact.instagram, icon: Instagram },
  { label: "Facebook", href: contact.facebook, icon: Facebook },
];

export function Contact() {
  return (
    <section id="contact" className="section relative" aria-label="Contact">
      <div className="container-site">
        <Reveal variant="lg">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface px-6 py-16 shadow-card sm:px-12 md:py-20">
            <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-accent-soft blur-3xl" aria-hidden />
            <div className="grid-backdrop" aria-hidden />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="section-kicker">Get In Touch</p>
              <h2 className="section-title mt-4">Connect With Me</h2>
              <p className="prose-lede mt-5 mx-auto">
                Feel free to reach out for collaborations or just a friendly hello!
              </p>
            </div>

            <div className="relative mx-auto mt-10 max-w-2xl">
              <ContactForm />
            </div>

            <div className="relative mx-auto mt-12 max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-border" aria-hidden />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-faint">
                  or find me elsewhere
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden />
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-fg-subtle transition-colors duration-[var(--duration-base)] hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
