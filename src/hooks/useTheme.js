import { useEffect, useState } from "react";

export default function useTheme() {

    const [mode, setMode] = useState(
        localStorage.getItem("theme") || "dark"
    );


    useEffect(() => {

        document.body.className = mode;

        localStorage.setItem(
            "theme",
            mode
        );

    }, [mode]);


    const toggleMode = () => {

        setMode(prev =>
            prev === "dark"
                ? "light"
                : "dark"
        );

    };


    return {
        mode,
        setMode,
        toggleMode,
        isDark: mode === "dark"
    };
}