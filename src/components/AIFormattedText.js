import { useState, useEffect } from "react";

export function useTypewriterEffect(htmlText, speed = 1) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!htmlText) {
            setDisplayedText("");
            return;
        }

        let i = 0;
        setDisplayedText("");

        const interval = setInterval(() => {
            setDisplayedText(htmlText.substring(0, i)); // Gradually reveal text
            i++;
            if (i >= htmlText.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [htmlText, speed]);

    return displayedText;
}

// ✅ Ensure Hook is Called Outside Condition
export function AIFormattedText({ text }) {
    // Ensure an empty string instead of null/undefined
    const safeText = text || "";

    // Convert **bold** to <b> tags & preserve line breaks
    const formattedText = safeText
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Convert Markdown bold to HTML <b>
        .replace(/\n/g, "<br>"); // Convert new lines to HTML <br>

    // ✅ Hook is always called, even if text is empty
    const animatedText = useTypewriterEffect(formattedText, 30);

    return (
        <span 
            className="text-left block" // ✅ Ensures left alignment
            style={{ textAlign: "left", display: "block" }} // Inline fallback
            dangerouslySetInnerHTML={{ __html: animatedText }}
        />
    );
}
