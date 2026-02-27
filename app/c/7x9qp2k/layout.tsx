import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jonathan B. Kaze Keza - Virtual Card",
    description: "Connect with Jonathan B. Kaze Keza",
    robots: {
        index: false,
        follow: false,
    },
};

export default function VirtualCardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
