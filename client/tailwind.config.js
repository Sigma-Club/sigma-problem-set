module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", ],
    theme: {
        extend: {
            screens: {
                sm: "640px",
                // => @media (min-width: 640px) { ... }

                md: "1250px",
                // => @media (min-width: 768px) { ... }

                lg: "1250px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }

                "2xl": "1536px",
                // => @media (min-width: 1536px) { ... }
            },
            colors: {
                "primary-bg": "#f5f5f5",
                head: "#36454F",
            },
            fontFamily: {
                defont: ["Secular One", "sans-serif"],
                defonts: ["Space Grotesk", "sans-serif"],
            },
        },
    },
};

/* font-family: "Righteous", cursive;
   font-family: "Space Grotesk", sans-serif; */