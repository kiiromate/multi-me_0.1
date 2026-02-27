import { CONTACT_INFO } from "@/lib/constants/contact";

/**
 * Generates a VCard format string containing the centralized contact info.
 */
export function generateVCardString(): string {
    return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${CONTACT_INFO.name.split(" ").slice(-1)[0]};${CONTACT_INFO.name.split(" ").slice(0, -1).join(" ")};;;`,
        `FN:${CONTACT_INFO.name}`,
        `TITLE:${CONTACT_INFO.title}`,
        `EMAIL;type=INTERNET;type=WORK;type=pref:${CONTACT_INFO.email}`,
        `TEL;type=CELL;type=VOICE;type=pref:+${CONTACT_INFO.whatsapp.number}`,
        `URL:${CONTACT_INFO.socials.linkedin}`,
        `URL:${CONTACT_INFO.socials.x}`,
        `URL:${CONTACT_INFO.socials.github}`,
        "END:VCARD",
    ].join("\r\n");
}

/**
 * Initiates a client-side download of the vCard file.
 */
export function downloadVCard() {
    const vcardString = generateVCardString();
    const blob = new Blob([vcardString], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Jonathan_Kaze_Keza.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);
}
