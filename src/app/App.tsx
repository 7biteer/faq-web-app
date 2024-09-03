import { AppRouter } from "../routes";
import StoreProviders from "../stores/StoreProviders";
import ThemeCustomization from "../theme/ThemeCustomization";

function App() {
  return (
    <>
      <StoreProviders>
        <ThemeCustomization>
          <AppRouter />
        </ThemeCustomization>
      </StoreProviders>
    </>
  );
}

export default App;
