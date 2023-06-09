/**
 * incident router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::incident.incident", {
  config: {
    create: {
      middlewares: ["api::incident.attach-create-user"],
    },
  },
});
