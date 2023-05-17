import { Router } from "express"
import api_router from './api/index.js'
import views_router from './views/index.js'
import messages_router from "./views/messages.js";
const router = Router()

router.use('/api',api_router)
router.use('/',views_router)
router.use("/coder", messages_router);
export default router