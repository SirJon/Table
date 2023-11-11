import type { FC } from "react";
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import List from "../List/List";
import "./App.scss";

const App: FC = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <List />
    </Theme>
  );
};

export default App;
