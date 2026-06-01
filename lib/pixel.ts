// Client-side only — only call from event handlers or useEffect, never on the server.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function fbqTrack(event: string, params?: Record<string, unknown>): void {
  window.fbq?.('track', event, params)
}
