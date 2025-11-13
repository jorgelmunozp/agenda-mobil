import { sp } from '../dimensions';
import { colors } from './colors';

export const styles = {
  view: { alignItems: 'flex-start', paddingTop: sp(4), paddingBottom: sp(42) },
  box: { flex: 1, backgroundColor: colors.primary },
  container: { width: '100%', maxWidth: sp(1400), paddingHorizontal: sp(20) },
  title: sp(32),
  subtitle: sp(18),
  inputH: sp(80),
  icon: sp(38),
  btnH: sp(80),
  radius: sp(20),
  gapXL: sp(42),
  gapLg: sp(20),
  gap: sp(12),
  actions: { marginTop: sp(24), gap: sp(12) },
};