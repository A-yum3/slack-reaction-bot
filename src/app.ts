import { App, LogLevel } from '@slack/bolt';
import AddReactionController from './controllers/AddReactionController';

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    logLevel: LogLevel.DEBUG,
});

app.event('reaction_added', async ({ event, client }) => {
    const useCase = new AddReactionController(event, client);
    await useCase.execute();
});

void (async () => {
    await app.start();
    console.log('⚡️ Bolt app is running!');
})();
