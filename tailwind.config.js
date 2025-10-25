module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/images/image.svg')",
      },
      maxWidth: {
        'form': '600px', // フォーム用の統一幅
        'form-wide': '800px', // より広いフォーム用（必要に応じて）
      },
    },
  },
  plugins: [],
};
