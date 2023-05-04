/**
 * `attachCreateUser` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (!!ctx.state.user) {
      let body = ctx.request.body;
      body.data.createdUser = {
        id: ctx.state.user.id,
      };
    }
    await next();
  };
};
