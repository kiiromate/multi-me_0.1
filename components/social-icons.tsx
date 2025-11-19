import { Github, Linkedin, Mail, Twitter } from "lucide-react"

interface SocialLink {
  platform: string
  url: string
}

interface SocialIconsProps {
  className?: string
  size?: "sm" | "md" | "lg"
  socialLinks?: SocialLink[]
}

const defaultSocialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/kazekeza",
    icon: Github,
    label: "View my GitHub profile",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/kazekeza",
    icon: Linkedin,
    label: "Connect with me on LinkedIn",
  },
  {
    name: "Email",
    href: "mailto:hello@kazekeza.dev",
    icon: Mail,
    label: "Send me an email",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/kazekeza",
    icon: Twitter,
    label: "Follow me on Twitter",
  },
]

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  twitter: Twitter,
  mail: Mail,
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

const containerSizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
}

export function SocialIcons({ className = "", size = "md", socialLinks }: SocialIconsProps) {
  // Convert Sanity social links to component format or use defaults
  const links = socialLinks
    ? socialLinks.map((link) => {
        const platformLower = link.platform.toLowerCase()
        const Icon = iconMap[platformLower] || Github
        return {
          name: link.platform,
          href: link.url,
          icon: Icon,
          label: `Visit my ${link.platform} profile`,
        }
      })
    : defaultSocialLinks

  return (
    <div className={`flex items-center gap-2 ${className}`} role="list">
      {links.map((social) => {
        const Icon = social.icon
        const isEmail = social.name.toLowerCase() === "email" || social.name.toLowerCase() === "mail"

        return (
          <a
            key={social.name}
            href={social.href}
            target={!isEmail ? "_blank" : undefined}
            rel={!isEmail ? "noopener noreferrer" : undefined}
            className={`
              ${containerSizeClasses[size]}
              flex items-center justify-center
              text-text-secondary hover:text-accent-honey
              transition-all duration-200 ease-out
              rounded-lg hover:bg-accent-honey/10
              focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary
              group
            `}
            aria-label={social.label}
            role="listitem"
          >
            <Icon
              className={`${sizeClasses[size]} transition-transform duration-200 group-hover:scale-110`}
              aria-hidden="true"
            />
          </a>
        )
      })}
    </div>
  )
}
