import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../src/theme/colors';

export const Pagination = ({ page, lastPage, onPrev, onNext }) => {
  const canPrev = page > 1;
  const canNext = page < lastPage;

  return (
    <View style={s.pagination}>
      <Pressable onPress={onPrev} disabled={!canPrev} style={[s.pageBtn, !canPrev && s.pageBtnDisabled]}>
        <Feather name="arrow-left" size={20} color={colors.white} />
      </Pressable>

      <Text style={s.pageInfo} numberOfLines={1} ellipsizeMode="clip">
        Página {page} de {lastPage}
      </Text>

      <Pressable onPress={onNext} disabled={!canNext} style={[s.pageBtn, !canNext && s.pageBtnDisabled]}>
        <Feather name="arrow-right" size={20} color={colors.white} />
      </Pressable>
    </View>
  );
};

const s = StyleSheet.create({
  pagination: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 12,
  },
  pageBtn: {
    width: 52,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageInfo: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Pagination;
