import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "tt-cookie-notice";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY) !== "dismissed") setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs rounded-2xl border border-border bg-card p-4 text-xs shadow-soft">
      <p className="text-muted-foreground">
        We use a couple of cookies to remember your preferences. Nothing fancy.
      </p>
      <div className="mt-3 flex justify-end">
        <Button
          size="sm"
          className="rounded-full"
          onClick={() => {
            localStorage.setItem(KEY, "dismissed");
            setVisible(false);
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
}