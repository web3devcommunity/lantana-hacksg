import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import { withTemplate } from "../webpack.config.template";

console.log("template", withTemplate);
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config, { configType }) => {
    return withTemplate(config);
  },
};
export default config;
