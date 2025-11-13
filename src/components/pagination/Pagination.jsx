import { View, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../../src/theme/colors';

export const Pagination = ({ page, lastPage, onPrev, onNext }) => {
  return (
    <View style={s.pagination}>
      <Pressable onPress={onPrev} disabled={page === 1} style={[s.pageBtn, page === 1 && s.pageBtnDisabled]}>
        <Text style={s.pageBtnText}>← Anterior</Text>
      </Pressable>

      <Text style={s.pageInfo}>
        Página {page} de {lastPage}
      </Text>

      <Pressable onPress={onNext} disabled={page === lastPage} style={[s.pageBtn, page === lastPage && s.pageBtnDisabled]}>
        <Text style={s.pageBtnText}>Siguiente →</Text>
      </Pressable>
    </View>
  );
};

const s = StyleSheet.create({
  pagination: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  pageBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.button,
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageBtnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 12,
  },
  pageInfo: {
    color: colors.text,
    fontSize: 12,
  },
});

export default Pagination;
