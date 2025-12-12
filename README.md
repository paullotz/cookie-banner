# Cookie Banner

A GDPR-compliant cookie consent component built with Shadcn UI and Tailwind CSS. Features granular consent settings (Necessary, Analytics, Marketing), localStorage persistence, and multiple sizing options.

## Installation

Run the following command to add the component to your project:

```bash
npx shadcn@latest add https://cookie-banner-chi.vercel.app/r/cookie-banner.json
````

## Usage

Import the component and place it in your root layout or specific pages.

```tsx
import { CookieBanner } from "@/components/blocks/cookie-banner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | string literal | "default" | Controls the size and padding of the banner. |
| `onAccept` | `() => void` | `undefined` | Callback fired when the user accepts all cookies or saves preferences. |
| `onDecline` | `() => void` | `undefined` | Callback fired when the user declines non-essential cookies. |
| `className` | `string` | `undefined` | Additional CSS classes to apply to the container. |

## Examples

### Custom Size

```tsx
<CookieBanner size="lg" />
```

### Event Handling

Use callbacks to initialize analytics or pixel scripts only after consent is given.

```tsx
<CookieBanner
  onAccept={() => {
    // Initialize Google Analytics or GTM here
    console.log("Cookies accepted");
  }}
  onDecline={() => {
    // Ensure tracking scripts are disabled
    console.log("Cookies declined");
  }}
/>
```

## Storage

This component uses `localStorage` key `cookie-consent` to persist user preferences. The value is a Base64 encoded string containing the preference object:

```json
{
  "necessary": true,
  "analytics": false,
  "marketing": false
}
```
