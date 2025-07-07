import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration - Dark Souls Bonfire Theme
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Yahya Qureshi",
    pageTitleSuffix: " | Portfolio",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://portfolio-tau-seven-pbrc2qec06.vercel.app/", // Empty baseUrl for relative paths - update to your Vercel domain later
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#1a1a1a",
          lightgray: "#2d2d2d",
          gray: "#4a4a4a",
          darkgray: "#b8b8b8",
          dark: "#e8e8e8",
          secondary: "#d4722b",
          tertiary: "#8b4513",
          highlight: "rgba(212, 114, 43, 0.15)",
          textHighlight: "rgba(255, 107, 53, 0.3)",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "#2d2d2d",
          gray: "#4a4a4a",
          darkgray: "#b8b8b8",
          dark: "#e8e8e8",
          secondary: "#d4722b",
          tertiary: "#8b4513",
          highlight: "rgba(212, 114, 43, 0.15)",
          textHighlight: "rgba(255, 107, 53, 0.3)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-dark",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
