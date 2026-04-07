export default {
  routes: [
    {
      method: "GET",
      path: "/contexto-agente",
      handler: "contexto-agente.find",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
