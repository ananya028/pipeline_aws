# Equivalent Webapp

## Tech stacks

### Languages

- HTML: is the standard markup language for Web pages. With HTML you can create your own Website.
- CSS: is the language we use to style an HTML document. CSS describes how HTML elements should be displayed.
- JavaScript: is a scripting or programming language that allows you to implement complex features on web pages.
- TypeScript: is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

### Frameworks

- [React](https://react.dev/learn): is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.
- [Mantine](https://mantine.dev/): builds fully functional accessible web applications faster than ever – Mantine includes more than 100 customizable components and 50 hooks to cover you in any situation.

### Develop tools

- [Vite](https://vitejs.dev/): is a build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Husky](https://typicode.github.io): improves your commits and more! You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.
- [Commitlint](https://commitlint.js.org/): supports checking a commit convention. By supporting npm-installed configurations it makes sharing of commit conventions easy.
- [Eslint](https://eslint.org/): statically analyzes code to quickly find problems. It is built into most text editors and developers can run ESLint as part of your continuous integration pipeline.
- [Prettier](https://prettier.io/): removes all original styling\* and ensures that all outputted code conforms to a consistent style.

### Testing

- [React Testing Library](https://testing-library.com/): Simple and complete testing utilities that encourage good testing practices

## Available command lines

| Command            | Action                                       |
| :----------------- | :------------------------------------------- |
| `pnpm install`     | Install dependencies                         |
| `pnpm run dev`     | Start local dev server at `localhost:5173`   |
| `pnpm run build`   | Build your production site to `./dist/`      |
| `pnpm run preview` | Preview your build locally, before deploying |
| `pnpm run test`    | Run unit test                                |

## How to customize theme

### **Structure**

#### **Provider**

- In terms of providing theme context, ColorSchemeProvider and MantineProvider are wrapped in ThemeProvider.tsx

```
<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    {children}
  </MantineProvider>
</ColorSchemeProvider>
```

- State `colorScheme` will receive two values 'dark' and 'light' (Data type: ColorScheme)
- The method `toggleColorScheme` is available that allows user to switch theme

#### **Theme object**

- Mantine theme is an object where your application's colors, fonts, spacing, border-radius and other design tokens are stored.
- With simple approach, you can override theme object at `themes/index.ts`. The following sample illustrates the way to customize:

```
{
  colorScheme: 'light',
  colors: {
    // Add your color
    deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
    // or replace default theme color
    blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '2rem' },
    },
  },
}
```

You can discover details at [https://mantine.dev/theming/theme-object/](https://mantine.dev/theming/theme-object/).

#### **Components**

- For each components, we need to add specific style for each variants, sizes,...

```
{
  ...
  colorScheme: 'dark',
  components: {
    Button: {
      variants: {
        danger: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[9],
            color: theme.colors.red[0],
            ...theme.fn.hover({ backgroundColor: theme.colors.red[8] }),
          },
        }),
      }
    }
  }
}
```

#### **Dark theme**

- All Mantine components support dark color scheme natively without any additional steps.
- The following sample demonstrates how we can customize dark theme:

```
{
  colorScheme: 'dark',
  colors: {
    // override dark colors to change them for all components
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
  },
}
```

All places using theme.colors.dark[x] will be applied these changes.
You can explore more at [https://mantine.dev/guides/dark-theme/](https://mantine.dev/guides/dark-theme/)
