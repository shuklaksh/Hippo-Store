
import { getPayloadClient } from './getPayload';
import { nextApp, nextHandler } from './nextUtils';

const express = require('express')
const app = express();
const PORT = Number(process.env.PORT) || '3000'

const start = async () => {
    const payload = await getPayloadClient({
        initOption: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin Info ${cms.getAdminURL}`)
            }
        }
    })
    app.use((req: any,res: any) => nextHandler(req,res));

    nextApp.prepare().then(() => {
        payload.logger.info('Next.js App Started');
        app.listen(PORT, async () => {
            payload.logger.info(`Next.js App URL ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        })
    })
}

start();