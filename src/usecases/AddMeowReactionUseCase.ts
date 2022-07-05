import IAddReactionUseCase from './IAddReactionUseCase';
import { WebClient } from '@slack/web-api';
import GetEmojiList from '../external/GetEmojiList';

export default class AddMeowReactionUseCase implements IAddReactionUseCase {
    private readonly client: WebClient;
    private readonly channel: string;
    private readonly timestamp: string;

    constructor(client: WebClient ,channel: string, timestamp: string) {
        this.client = client;
        this.channel = channel;
        this.timestamp = timestamp;
    }

    async execute() {
        const emoji_names = await GetEmojiList.execute(this.client);

        const meows = emoji_names.filter((emoji_name) =>
            emoji_name.includes('meow')
        );

        console.log(meows);

        for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * meows.length);
            const name = meows[index];
            meows.splice(index, 1);
            try {
                await this.client.reactions.add({
                    name: name,
                    channel: this.channel,
                    timestamp: this.timestamp,
                });
            } catch (e) {
                console.log('Skip because already added');
            }
        }
    }
}
