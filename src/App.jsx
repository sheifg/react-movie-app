import { Navbar } from "./components";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
  return (
    // dark: it is a conditional class(tailwind pseudo class). It will only apply if the dark mode is enable
    <div className="dark:bg-gray-dark-main min-h-screen">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
