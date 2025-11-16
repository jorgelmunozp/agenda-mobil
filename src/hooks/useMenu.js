import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import { Platform, BackHandler } from 'react-native';
import { usePathname } from 'expo-router';

// ---- store global ----
let _open = false;
const _subs = new Set();
const _emit = () => { for (const s of _subs) s(); };
const _subscribe = (cb) => { _subs.add(cb); return () => _subs.delete(cb); };
const _get = () => _open;
const _set = (v) => { const nv = typeof v === 'function' ? v(_open) : !!v; if (nv !== _open) { _open = nv; _emit(); } };
const _toggle = () => _set(o => !o);

export const useMenu = () => {
  const open = useSyncExternalStore(_subscribe, _get, _get);

  const openMenu   = useCallback(() => _set(true), []);
  const closeMenu  = useCallback(() => _set(false), []);
  const toggleMenu = useCallback(() => _toggle(), []);
  const setOpen    = useCallback((v) => _set(v), []);

  // Cerrar al cambiar de ruta (Expo Router)
  const pathname = usePathname?.() ?? null;
  useEffect(() => { if (pathname != null) closeMenu(); }, [pathname, closeMenu]);

  // WEB: cerrar con ESC (protegido por plataforma y existencia de window)
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onKey = (e) => { if (e?.key === 'Escape') closeMenu(); };
    const w = typeof window !== 'undefined' ? window : undefined;
    w?.addEventListener?.('keydown', onKey);
    return () => w?.removeEventListener?.('keydown', onKey);
  }, [closeMenu]);

  // ANDROID: cerrar con hardware back si el menú está abierto
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (_get()) { _set(false); return true; } // consume el back
      return false; // deja que navegue atrás normal
    });
    return () => sub.remove();
  }, []);

  return useMemo(() => ({ open, openMenu, closeMenu, toggleMenu, setOpen }),
                 [open, openMenu, closeMenu, toggleMenu, setOpen]);
};
