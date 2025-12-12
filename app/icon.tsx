import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
	width: 32,
	height: 32,
};

export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				fontSize: 24,
				background: "transparent",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{ color: "#ea580c" }}
			>
				<title>Cookie Icon</title>
				<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
				<path d="M8.5 8.5v.01" />
				<path d="M16 15.5v.01" />
				<path d="M12 12v.01" />
				<path d="M11 17v.01" />
				<path d="M7 14v.01" />
			</svg>
		</div>,
		{
			...size,
		},
	);
}
