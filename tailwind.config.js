/** 
 * Configuração do Tailwind CSS para o projeto.
 * Personaliza temas, cores, animações, fontes e integra plugins.
 */
module.exports = {
  // Ativa o modo escuro via classe CSS (ex: <html class="dark">)
  darkMode: ["class"],

  // Define os caminhos dos arquivos onde o Tailwind deve procurar classes CSS
  content: [
    './pages/**/*.{js,jsx}',      // Páginas do Next.js ou React
    './components/**/*.{js,jsx}', // Componentes reutilizáveis
    './app/**/*.{js,jsx}',        // Estrutura de app (Next.js 13+)
    './src/**/*.{js,jsx}',        // Outros arquivos fonte
  ],

  theme: {
    // Configuração do container padrão do Tailwind
    container: {
      center: true,           // Centraliza o container na tela
      padding: "2rem",        // Padding interno padrão
      screens: {
        "2xl": "1400px",      // Largura máxima para telas muito grandes
      },
    },

    // Extensões e personalizações do tema padrão
    extend: {
      // Cores customizadas usando variáveis CSS (hsl)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Cores principais e suas variações de foreground
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Cores específicas para categorias (usando variáveis CSS)
        // Observação: evitar verde/amarelo nessas categorias
        'category-educacao': 'hsl(var(--category-educacao))',
        'category-produtos-sustentaveis': 'hsl(var(--category-produtos-sustentaveis))',
        'category-jardinagem': 'hsl(var(--category-jardinagem))',
        'category-bem-estar': 'hsl(var(--category-bem-estar))',
        'category-impacto-ambiental': 'hsl(var(--category-impacto-ambiental))',
        'category-vestuario': 'hsl(var(--category-vestuario))',
        'category-default': 'hsl(var(--category-default))',
        'terracota': 'hsl(var(--terracota-hsl))', // Cor nomeada extra
      },

      // Personalização dos raios de borda usando variáveis CSS
      borderRadius: {
        lg: "var(--radius)",                 // Grande
        md: "calc(var(--radius) - 2px)",     // Médio
        sm: "calc(var(--radius) - 4px)",     // Pequeno
      },

      // Animações customizadas para acordeão (abrir/fechar)
      keyframes: {
        "accordion-down": {
          from: { height: 0 }, // Começa fechado
          to: { height: "var(--radix-accordion-content-height)" }, // Abre até a altura do conteúdo
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" }, // Começa aberto
          to: { height: 0 }, // Fecha
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Usa keyframe acima
        "accordion-up": "accordion-up 0.2s ease-out",     // Usa keyframe acima
      },

      // Fonte padrão para textos sans-serif
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      // Sombreamento customizado para cartões, usando as cores primária e secundária
      boxShadow: {
        'card-glow-primary': '0 0 20px 0px hsla(var(--primary), 0.5)',
        'card-glow-secondary': '0 0 20px 0px hsla(var(--secondary), 0.5)',
      }
    },
  },

  // Plugins adicionais do Tailwind (animações utilitárias)
  plugins: [require("tailwindcss-animate")],
}