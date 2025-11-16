import { colors } from './colors';
import { sp } from './screen';

export const styles = {
  box: { flex: 1, backgroundColor: colors.primary },
  view: { alignItems: 'flex-start', paddingTop: sp(20), paddingBottom: sp(80) },
  container: { width: '100%', maxWidth: sp(1400), paddingHorizontal: sp(20) },
  header: { height: sp(130), width: '100%', backgroundColor: colors.primary },
  title: sp(24),
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
