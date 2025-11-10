import { Input } from "../input/Input";

export const SearchInput = ({ value, onChangeText }) => (
  <Input value={value} onChangeText={onChangeText}
    isIcon icon="search" placeholder="Buscar tarea..."
    autoCorrect={false} autoCapitalize="none"
  />
);
