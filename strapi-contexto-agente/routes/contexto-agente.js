module.exports = {
  routes: [
    {
      method: "GET",
      path: "/contexto-agente",
      handler: "api::contexto-agente.contexto-agente.find",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
