import type { Command } from "./types";

export const COMMANDS: Command[] = [
  {
    name: "new",
    description: "Start a new conversation",
    value: "/new",
    action : (ctx) => {
      ctx.toast.show({
        message : "New conversation started",
        variant : "success"
      });
    }
  },
  {
    name: "agents",
    description: "Switch agents",
    value: "/agents",
    action : (ctx) => {
      ctx.toast.show({
        message : "Agent changed",
        variant : "success"
      });
    }
  },
  {
    name: "models",
    description: "Select AI model for generation",
    value: "/models",
    action : (ctx) => {
      ctx.toast.show({
        message : "Model changed",
        variant : "info"
      });
    }
  },
  {
    name: "sessions",
    description: "Browse past sessions",
    value: "/sessions",
    action : (ctx) => {
      ctx.toast.show({
        message : "Sessions opened",
        variant : "info"
      });
    }
  },
  {
    name: "theme",
    description: "Change color theme",
    value: "/theme",
    action : (ctx) => {
      ctx.toast.show({
        message : "Theme changed",
        variant : "success"
      });
    }
  },
  {
    name: "login",
    description: "Sign in with your browser",
    value: "/login",
    action : (ctx) => {
      ctx.toast.show({
        message : "Login",
        variant : "success"
      });
    }
  },
  {
    name: "logout",
    description: "Sign out of your account",
    value: "/logout",
    action : (ctx) => {
      ctx.toast.show({
        message : "Logout",
        variant : "info"
      });
    }
  },
  {
    name: "upgrade",
    description: "Buy more credits",
    value: "/upgrade",
    action : (ctx) => {
      ctx.toast.show({
        message : "Upgrade",
        variant : "success"
      });
    }
  },
  {
    name: "usage",
    description: "Open billing portal in your browser",
    value: "/usage",
    action : (ctx) => {
      ctx.toast.show({
        message : "Usage",
        variant : "info"
      });
    }
  },
  {
    name: "exit",
    description: "Quit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];