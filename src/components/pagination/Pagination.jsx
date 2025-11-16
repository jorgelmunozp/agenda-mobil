import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';

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
  },
  pageBtn: {
    width: 52,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageInfo: {
    flex: 0.75,
    textAlign: 'center',
    color: colors.white,
    fontSize: 11,
    lineHeight: 20,
  },
});

export default Pagination;
