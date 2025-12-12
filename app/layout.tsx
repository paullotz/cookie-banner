import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GDPR Cookie Banner",
	description:
		"A beautiful, fully customizable cookie consent banner with smooth animations, dark mode support, and GDPR compliance. Built with shadcn/ui and Tailwind CSS.",
	authors: [{ name: "Paul Lotz" }],
	keywords: [
		"cookie banner",
		"gdpr consent",
		"shadcn ui",
		"next.js",
		"react",
		"tailwind css",
		"cookie consent",
	],
	openGraph: {
		title: "GDPR Cookie Banner",
		description:
			"A beautiful, fully customizable cookie consent banner built with shadcn/ui.",
		type: "website",
		url: "https://cookie-banner-chi.vercel.app",
		siteName: "Cookie Banner Showcase",
	},
	twitter: {
		card: "summary_large_image",
		title: "GDPR Cookie Banner",
		description:
			"A beautiful, fully customizable cookie consent banner built with shadcn/ui.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
