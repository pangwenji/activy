import "./style.css";
import "./flex.css";
import "./uilts/request";
import "./uilts/pg.js";
import "./uilts/kwaiq.js";
import "./uilts/customer-service.js";
import {registerDirectives} from "./uilts/base.ts"
import "./scss/iconfont.scss"

import { app } from "./app.js";
import { router } from "./router/routes";

registerDirectives(app)
router.isReady().then(() => {
  app.mount("#app");
});
