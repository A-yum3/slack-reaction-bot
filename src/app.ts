import { App, LogLevel } from '@slack/bolt';

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    logLevel: LogLevel.DEBUG,
});

app.event('reaction_added', async ({ event, client }) => {
    if (event.reaction !== 'meow_mudamudamuda') {
        return;
    }

    if (event.item.type !== 'message') {
        return;
    }

    const response = await client.emoji.list();

    if (response.emoji === undefined) {
        return;
    }

    const emoji_names = Object.keys(response.emoji);

    const meows = emoji_names.filter((emoji_name) =>
        emoji_name.includes('meow')
    );

    // const texts = emoji_names.filter((emoji_name) =>
    //     emoji_name.includes('text')
    // )

    console.log(meows);

    const channel = event.item.channel;
    const ts = event.item.ts;

    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * meows.length);
        const name = meows[index];
        meows.splice(index, 1);
        try {
            await client.reactions.add({
                name: name,
                channel: channel,
                timestamp: ts,
            });
        } catch (e) {
            console.log('Skip because already added');
        }

    }

    console.log(event);
});

void (async () => {
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();
