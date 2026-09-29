import { Mail, FileText } from "lucide-react";

export const contacts = [
  {
    isCustomLogo: true,
    logoPath: "/logos/linkedin-logo.svg",
    label: "LinkedIn",
    url: "https://linkedin.com/in/reysheildoromal",
    color: "bg-blue-800",
  },
  {
    isCustomLogo: true,
    logoPath: "/logos/github-logo.svg",
    label: "GitHub",
    url: "https://github.com/wiishiwaashi",
    color: "bg-gray-800",
  },
  {
    isCustomLogo: false,
    icon: Mail,
    label: "Email",
    url: "mailto:ishi@example.com",
    color: "bg-red-800",
  },
  {
    isCustomLogo: false,
    icon: FileText,
    label: "Resume",
    url: "/Doromal_GeneralResume.pdf",
    color: "bg-green-800",
  },
];
