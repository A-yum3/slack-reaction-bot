import { WebClient } from '@slack/web-api';
import AddReactionRequestService from '../external/AddReactionRequestService';

export default class AddReactionService {
    private readonly client: WebClient;

    constructor(client: WebClient) {
        this.client = client;
    }

    public async execute(
        emoji_names: string[],
        channel: string,
        timestamp: string
    ) {
        for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * emoji_names.length);
            const name = emoji_names[index];
            emoji_names.splice(index, 1);
            try {
                await AddReactionRequestService.execute(
                    this.client,
                    name,
                    channel,
                    timestamp
                );
            } catch (e) {
                console.log('既に追加済みのためスキップします');
            }
        }
    }
}
