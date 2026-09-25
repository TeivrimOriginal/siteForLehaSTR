import { useCallback, useEffect, useRef, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

export function useOnlineStatus() {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  return online;
}

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function useInstallApp() {
  const promptRef = useRef<InstallPrompt | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [installHint, setInstallHint] = useState(false);
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches);

  useEffect(() => {
    const capture = (event: Event) => {
      event.preventDefault();
      promptRef.current = event as InstallPrompt;
      setCanInstall(true);
    };
    const installedHandler = () => {
      setInstalled(true);
      setCanInstall(false);
    };
    window.addEventListener('beforeinstallprompt', capture);
    window.addEventListener('appinstalled', installedHandler);
    return () => {
      window.removeEventListener('beforeinstallprompt', capture);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const install = useCallback(async () => {
    if (!promptRef.current) {
      setInstallHint(true);
      return false;
    }
    await promptRef.current.prompt();
    const choice = await promptRef.current.userChoice;
    if (choice.outcome === 'accepted') {
      setCanInstall(false);
      setInstallHint(false);
    }
    return choice.outcome === 'accepted';
  }, []);

  return { canInstall, installHint, installed, install };
}

export function useShareLink() {
  const [shared, setShared] = useState(false);
  const share = useCallback(async () => {
    const data = {
      title: 'LehaSTR — стратегии, брейнроут, Алабуга',
      text: 'Канал о юморе, стратегиях и аниме.',
      url: window.location.origin + import.meta.env.BASE_URL,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.url);
      } else {
        const input = document.createElement('textarea');
        input.value = data.url;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      // Пользователь отменил системное окно «Поделиться».
    }
  }, []);
  return { shared, share };
}
