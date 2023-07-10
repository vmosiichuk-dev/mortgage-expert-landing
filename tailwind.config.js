/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.css"
  ],
  theme: {
    screens: {
      xs: "355px",
      sm: "640px",
      xl: "1300px",
      "2xl": "1550px"
    },
    extend: {
      colors: {
        "ang-light": "hsl(338, 60%, 30%)",
        "ang-dark": "hsl(338, 60%, 25%)",
        "ang-border": "hsla(338, 30%, 25%, .35)",
        "ang-accent": "hsla(330, 40%, 35%, .5)",
        result: "hsla(200, 100%, 20%, .5)"
      },
      backgroundImage: {
        header: "linear-gradient(0deg, hsl(0deg 0% 100% / 85%), hsl(0 0% 100% / 1))",     
      },
      boxShadow: {
        header: "0 1px 1px 0 hsl(0, 0%, 100%)",
        link: "hsla(280, 75%, 25%, .15) 1px 1px 3px",
        "link-hover": "hsla(280, 75%, 12%, .35) -1px 1px 1px 0px inset, hsla(280, 75%, 12%, .35) -4px 10px 20px -15px inset",
        btn: "hsla(280, 75%, 25%, .15) 1px 1px 3px",
        "btn-hover": "hsla(0, 75%, 8%, .35) -4px 10px 20px -15px inset",
        neo: "hsla(280, 10%, 45%, .15) 30px 30px 60px, hsla(280, 35%, 80%, .15) -30px -30px 60px",
        inner: "hsla(0, 0%, 100%, .35) 0px 1px 1px 0px inset, hsla(280, 75%, 12%, .35) 0px 20px 100px -20px, hsla(280, 75%, 12%, .35) 0px 20px 60px -30px",
        outer: "hsla(0, 75%, 8%, .35) -1px 1px 1px 0px, hsla(280, 80%, 12%, .6) -4px 10px 20px -15px inset, hsla(280, 75%, 12%, .35) 1px 2px 60px -10px",
        stats: "hsla(0, 75%, 8%, .35) 0px 0px 10px 0px inset, hsla(0, 0%, 100%, .35) 0px 20px 100px -20px inset"
      },   
      spacing: {
        0.75: ".1875rem",
        1.25: ".3125rem",
        4.5: "1.125rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        17: "4.25rem",
        18: "4.5rem",
        18.5: "4.625rem",
        19: "4.75rem",
        22: "5.5rem",
        24.75: "6.1875rem",
        26: "6.5rem",
        26.5: "6.75rem",
        34: "8.5rem",
        38: "9.5rem",
        42: "10.5rem",
        46: "11.5rem",
        76: "19rem",
        92: "23rem",
        140: "140px",
        246: "246px",
        370: "370px",
        520: "520px",
        550: "550px",
        650: "650px",
        "mobile-form": "calc(50% - 16rem)",
        "label": "calc(50% + 1rem)",
        "stats-number-wrapper-max-sm": "calc(100% - 1.5rem)",
        "stats-number-wrapper": "calc(100% - 2.125rem)",
        "stats-number-wrapper-xl": "calc(100% - 2.3125rem)",
        "stats-number": "calc(100% - 1.375rem)",
        "stats-px": "calc(calc(100% - 9.5rem) / 2)",
        "stats-px-xl": "calc(calc(100% - 11.5rem) / 2)",
        "menu": "calc(100% - 4.625rem)",
        "vector": "calc(50% - 3rem)"
      }, 
      fontSize: {
        html: ".625rem",
        "html-sm": ".75rem",
        "html-2xl": ".8125rem",
        footer: ".875rem",
        "footer-xl": ".9375rem",
        base: "1rem",
        s: "1.125rem",
        sm: "1.1875rem",
        md: "1.25rem",
        lg: "1.375rem",
        lgx: "1.45rem",
        xl: "1.5rem",
        h4: "1.625rem",
        h3: "1.75rem",
        h2: "1.875rem",
        "2xl": "2rem",
        h1: "2.125rem",
        "3xl": "3rem",
        "3.25xl": "3.25rem",
        "6xl": ["6rem", "1"],
        "14xl": ["14rem", "1"]
      },
      gridColumn: {
        1: "1",
        2: "2",
        3: "3",
        "1/2": "1 / span 2",
        "1/3": "1 / span 3",
        "4/5": "4 / span 5"
      },
      gridRow: {
        2: "2",
        "1/4": "1 / span 4",
        "1/5": "1 / span 5"
      },
      opacity: {
        85: ".85"
      },
      borderRadius: {
        lx: ".625rem"
      },
      fontFamily: {
        sora: ["Sora", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      },
      gridTemplateColumns: {
        s: "1fr minmax(36rem, 46rem) 1fr",
        sm: "1fr minmax(auto, 61rem) 1fr",
        xl: "16rem 1fr minmax(auto, 61rem) 3fr 25rem"
      },   
      letterSpacing: {
        "0p": "0.25px",
        "0px": "0.5px",
        px: "1px"
      },
      listStyleType: {
        latin: "lower-latin"
      }
    }
  }
}
