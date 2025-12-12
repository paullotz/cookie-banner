"use client";

import { useState, useEffect, FC } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type CookieBannerSize = "sm" | "default" | "lg";

type Props = {
  size?: CookieBannerSize;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
};

const encodeBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    return btoa(data);
  }
  return data;
};

export const CookieBanner: FC<Props> = ({
  size = "default",
  onAccept,
  onDecline,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setIsClosing(true);
    localStorage.setItem("cookie-consent", encodeBase64("all"));
    onAccept?.();
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDeclineAll = () => {
    setIsClosing(true);
    localStorage.setItem("cookie-consent", encodeBase64("necessary"));
    onDecline?.();
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleSavePreferences = () => {
    setIsClosing(true);
    localStorage.setItem(
      "cookie-consent",
      encodeBase64(JSON.stringify(preferences)),
    );
    onAccept?.();
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  const sizeClasses = {
    sm: "max-w-sm p-4 gap-3",
    default: "max-w-md p-5 gap-4",
    lg: "max-w-2xl p-6 gap-5",
  };

  const textSizes = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base",
  };

  const headingSizes = {
    sm: "text-sm font-semibold",
    default: "text-base font-semibold",
    lg: "text-lg font-semibold",
  };

  const buttonSizes = {
    sm: "h-8 text-xs",
    default: "h-9 text-sm",
    lg: "h-10 text-base",
  };

  return (
    <Card
      className={cn(
        "fixed bottom-4 left-1/2 z-50 shadow-2xl border-border/50 flex flex-col w-[calc(100%-2rem)]",
        sizeClasses[size],
        isClosing
          ? "translate-y-[120%] -translate-x-1/2 opacity-0 transition-all duration-300 ease-in"
          : "translate-y-0 -translate-x-1/2 opacity-100 transition-all duration-500 ease-out",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Cookie
            className={cn("shrink-0", size === "lg" ? "h-6 w-6" : "h-5 w-5")}
          />
          <h3 className={cn(headingSizes[size], "text-foreground")}>
            Cookie Preferences
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 hover:bg-accent",
            size === "sm" ? "h-7 w-7" : "h-8 w-8",
          )}
          onClick={handleDeclineAll}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!showSettings ? (
        <>
          <p
            className={cn(
              textSizes[size],
              "text-muted-foreground leading-relaxed",
            )}
          >
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking "Accept
            All", you consent to our use of cookies.{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>

          <div
            className={cn(
              "flex gap-2",
              size === "sm" ? "flex-col" : "flex-wrap",
            )}
          >
            <Button
              onClick={handleAcceptAll}
              className={cn(buttonSizes[size], "flex-1 min-w-[120px]")}
            >
              Accept All
            </Button>
            <Button
              onClick={handleDeclineAll}
              variant="outline"
              className={cn(buttonSizes[size], "flex-1 min-w-[120px]")}
            >
              Decline All
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="ghost"
              className={cn(buttonSizes[size], "gap-2")}
            >
              <Settings className="h-4 w-4" />
              Customize
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p
                  className={cn(textSizes[size], "font-medium text-foreground")}
                >
                  Necessary Cookies
                </p>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    size === "lg" && "text-sm",
                  )}
                >
                  Required for the website to function
                </p>
              </div>
              <div className="shrink-0 px-2 py-1 bg-muted rounded text-xs font-medium">
                Always On
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p
                  className={cn(textSizes[size], "font-medium text-foreground")}
                >
                  Analytics Cookies
                </p>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    size === "lg" && "text-sm",
                  )}
                >
                  Help us improve our website
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p
                  className={cn(textSizes[size], "font-medium text-foreground")}
                >
                  Marketing Cookies
                </p>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    size === "lg" && "text-sm",
                  )}
                >
                  Used for personalized advertising
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <div className={cn("flex gap-2", size === "sm" ? "flex-col" : "")}>
            <Button
              onClick={handleSavePreferences}
              className={cn(buttonSizes[size], "flex-1")}
            >
              Save Preferences
            </Button>
            <Button
              onClick={() => setShowSettings(false)}
              variant="outline"
              className={cn(buttonSizes[size], "flex-1")}
            >
              Back
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
