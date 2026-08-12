const scriptPromises = new Map<string, Promise<void>>();
const injectedStyles = new Set<string>();

export function loadScript(src: string): Promise<void> {
  const cached = scriptPromises.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
}

export function loadStylesheet(href: string): void {
  if (
    injectedStyles.has(href) ||
    document.querySelector(`link[href="${href}"]`)
  ) {
    injectedStyles.add(href);
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
  injectedStyles.add(href);
}
