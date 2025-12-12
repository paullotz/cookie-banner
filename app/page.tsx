"use client";

import { CookieBanner } from "@/components/blocks/cookie-banner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Copy, Check, Cookie } from "lucide-react";

export default function Home() {
	const [size, setSize] = useState<"sm" | "default" | "lg">("default");
	const [key, setKey] = useState(0);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const resetConsent = () => {
		localStorage.removeItem("cookie-consent");
		setKey((prev) => prev + 1);
	};

	const handleSizeChange = (newSize: "sm" | "default" | "lg") => {
		setSize(newSize);
		resetConsent();
	};

	const copyToClipboard = async (text: string, index: number) => {
		await navigator.clipboard.writeText(text);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	const codeExamples = [
		{
			title: "Installation",
			description: "Install required shadcn/ui components",
			code: `npx shadcn@latest add https://cookie-banner-chi.vercel.app/r/cookie-banner.json`,
			language: "bash",
		},
		{
			title: "Basic Usage",
			description: "Import and use the cookie banner component",
			code: `import { CookieBanner } from "@/components/blocks/cookie-banner"

export default function Layout() {
  return (
    <>
      {/* Your app content */}
      <CookieBanner />
    </>
  )
}`,
			language: "tsx",
		},
		{
			title: "With Size Variants",
			description: "Use different size variants (sm, default, lg)",
			code: `<CookieBanner size="lg" />`,
			language: "tsx",
		},
		{
			title: "With Callbacks",
			description: "Handle accept and decline events",
			code: `<CookieBanner
  onAccept={() => {
    console.log("Cookies accepted")
    // Initialize analytics
  }}
  onDecline={() => {
    console.log("Cookies declined")
    // Disable tracking
  }}
/>`,
			language: "tsx",
		},
	];

	return (
		<main className="min-h-screen bg-zinc-950 text-zinc-50">
			<div className="border-b border-zinc-800">
				<div className="container mx-auto px-4 py-16 md:py-24">
					<div className="text-center space-y-6 max-w-3xl mx-auto">
						<div className="flex justify-center mb-8">
							<div className="relative">
								<div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
								<Cookie className="h-32 w-32 text-orange-500 animate-[spin_10s_linear_infinite] relative z-10" />
							</div>
						</div>
						<h1 className="text-4xl md:text-6xl font-bold text-balance">
							GDPR Cookie Banner
						</h1>
						<p className="text-lg md:text-xl text-zinc-400 text-pretty leading-relaxed">
							A beautiful, fully customizable cookie consent banner with smooth
							animations, dark mode support, and GDPR compliance. Built with
							shadcn/ui and Tailwind CSS.
						</p>
						<div className="flex gap-3 flex-wrap justify-center pt-4 text-black">
							<Button
								onClick={() => handleSizeChange("sm")}
								variant={size === "sm" ? "default" : "outline"}
								size="lg"
							>
								Small
							</Button>
							<Button
								onClick={() => handleSizeChange("default")}
								variant={size === "default" ? "default" : "outline"}
								size="lg"
							>
								Default
							</Button>
							<Button
								onClick={() => handleSizeChange("lg")}
								variant={size === "lg" ? "default" : "outline"}
								size="lg"
							>
								Large
							</Button>
							<Button
								onClick={resetConsent}
								variant="outline"
								size="lg"
								className="ml-4 bg-transparent text-white hover:text-black"
							>
								Reset Consent
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-16">
				<div className="max-w-4xl mx-auto space-y-8">
					<div>
						<h2 className="text-3xl font-bold mb-2 text-zinc-50">
							Getting Started
						</h2>
						<p className="text-zinc-400 text-pretty leading-relaxed">
							Follow these steps to integrate the cookie banner into your
							Next.js project
						</p>
					</div>

					<Separator className="bg-zinc-800" />

					{codeExamples.map((example, index) => (
						<Card key={index} className="bg-zinc-900 border-zinc-800">
							<CardHeader>
								<div className="flex items-start justify-between">
									<div>
										<CardTitle className="text-zinc-50">
											{example.title}
										</CardTitle>
										<CardDescription className="text-zinc-400 mt-2">
											{example.description}
										</CardDescription>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => copyToClipboard(example.code, index)}
										className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
									>
										{copiedIndex === index ? (
											<Check className="h-4 w-4" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
									<code className="text-sm text-zinc-300 font-mono">
										{example.code}
									</code>
								</pre>
							</CardContent>
						</Card>
					))}
					<Card className="bg-zinc-900 border-zinc-800">
						<CardHeader>
							<CardTitle className="text-zinc-50">Component Props</CardTitle>
							<CardDescription className="text-zinc-400">
								Available props for the CookieBanner component
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="border-l-2 border-zinc-700 pl-4">
									<code className="text-sm font-mono text-emerald-400">
										size
									</code>
									<p className="text-zinc-400 mt-1">
										<span className="text-zinc-500">Type:</span> "sm" |
										"default" | "lg"
									</p>
									<p className="text-zinc-400 mt-1">
										<span className="text-zinc-500">Default:</span> "default"
									</p>
									<p className="text-zinc-400 mt-1">
										Controls the size of the cookie banner
									</p>
								</div>
								<Separator className="bg-zinc-800" />
								<div className="border-l-2 border-zinc-700 pl-4">
									<code className="text-sm font-mono text-emerald-400">
										onAccept
									</code>
									<p className="text-zinc-400 mt-1">
										<span className="text-zinc-500">Type:</span> () =&gt; void
									</p>
									<p className="text-zinc-400 mt-1">
										<span className="text-zinc-500">Optional</span>
									</p>
									<p className="text-zinc-400 mt-1">
										Callback when user accepts cookies
									</p>
								</div>
								<Separator className="bg-zinc-800" />
								<div className="border-l-2 border-zinc-700 pl-4">
									<code className="text-sm font-mono text-emerald-400">
										onDecline
									</code>
									<p className="text-zinc-400 mt-1">
										<span className="text-zinc-500">Type:</span> () =&gt; void
									</p>
									<p className="text-zinc-400 mt-1">
										<span className="text-zinc-500">Optional</span>
									</p>
									<p className="text-zinc-400 mt-1">
										Callback when user declines cookies
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-zinc-900 border-zinc-800">
						<CardHeader>
							<CardTitle className="text-zinc-50">Features</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 text-zinc-400">
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>
										Three size variants (small, default, large) for different
										layouts
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>Smooth entrance and exit animations</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>Full dark mode and light mode support</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>Mobile responsive design</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>
										Granular cookie preferences (necessary, analytics,
										marketing)
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>Base64 encoded localStorage persistence</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>GDPR compliant consent management</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-500 mt-1">✓</span>
									<span>Built with shadcn/ui and Tailwind CSS</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>

			<CookieBanner
				key={key}
				size={size}
				onAccept={() => console.log("Cookies accepted")}
				onDecline={() => console.log("Cookies declined")}
			/>
		</main>
	);
}
