import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import Button from "../Button/Button";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      ariaLabel={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? (
        <div className="flex items-center">
          <Sun className="w-4 h-4 text-gray-800 dark:text-gray-200" />
        </div>
      ) : (
        <div className="flex items-center">
          <Moon className="w-4 h-4 text-gray-800 dark:text-gray-200" />
        </div>
      )}
    </Button>
  );
};

export default ThemeToggle;
