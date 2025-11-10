import React from "react";
import { Modal, Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Input } from "../input/Input";
import { DateInput } from "../input/DateInput";
import { TimeInput } from "../input/TimeInput";
import { colors } from "../../theme/colors";

export const AddTask = ({ visible, onClose, form, onChange, onSave }) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      {/* overlay clicable */}
      <Pressable style={s.overlay} onPress={onClose}>
        {/* contenido: no propaga el click */}
        <Pressable style={s.modal} onPress={() => {}}>
          <Text style={s.label}>Nombre</Text>
          <View style={s.field}>
            <Input
              value={form.name}
              onChangeText={(v) => onChange("name", v)}
              isIcon={false}
              placeholder="Nombre"
              style={s.inputFull}
            />
          </View>

          <Text style={s.label}>Fecha</Text>
          <View style={[s.field, s.clip]}>
            <DateInput
              value={form.date}
              onChange={(v) => onChange("date", v)}
              style={s.inputFull}
              inputStyle={{ paddingRight: 36 }}
            />
          </View>

          <Text style={s.label}>Hora</Text>
          <View style={[s.field, s.clip]}>
            <TimeInput
              value={form.time}
              onChange={(v) => onChange("time", v)}
              style={s.inputFull}
              inputStyle={{ paddingRight: 36 }}
            />
          </View>

          <Text style={s.label}>Mensaje</Text>
          <View style={s.field}>
            <Input
              value={form.message}
              onChangeText={(v) => onChange("message", v)}
              isIcon={false}
              placeholder="Mensaje"
              multiline
              style={s.inputFull}
            />
          </View>

          <View style={s.modalActions}>
            <Pressable onPress={onSave} style={s.primaryBtn}>
              <Text style={s.primaryText}>Guardar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,.35)", justifyContent: "center", padding: 20 },
  modal: { backgroundColor: colors.bg, borderRadius: 16, padding: 16, width: "90%", maxWidth: 900, alignSelf: "center" },
  label: { color: "#0f172a", fontWeight: "600", marginTop: 1, fontSize: 12 },

  // uniformidad de ancho
  field: { width: "100%", alignSelf: "stretch", marginBottom: 12 },
  inputFull: { width: "100%" },

  // evita que adornos/íconos externos sobresalgan en web
  clip: {
    width: "100%",
    alignSelf: "stretch",
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: 10,
    ...Platform.select({ web: { display: "block" } }),
  },

  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 12 },

  // botón primario (igual que en tu pantalla)
  primaryBtn: { backgroundColor: colors.black, borderRadius: 10, paddingVertical: 16, width: "100%", alignItems: "center" },
  primaryText: { color: colors.white, fontWeight: "700" },
});

export default AddTask;
