import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { InputBar } from "./components/input-bar";
import { KeyboardLayerProvider } from "./providers/keyboard-layer";

function App() {
  return (
    <KeyboardLayerProvider>
      <box alignItems="center" justifyContent="center" backgroundColor="#0D0D12" width={"100%"} height={"100%"} gap={2}>
        <Header />
        <box justifyContent="center" alignItems="center" width={"100%"} maxWidth={100}>
          <InputBar onSubmit={() => { }} />
        </box>
      </box>
    </KeyboardLayerProvider>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
