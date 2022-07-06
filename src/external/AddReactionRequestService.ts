import { WebClient } from '@slack/web-api';

export default class AddReactionRequestService {
    static async execute(
        client: WebClient,
        name: string,
        channel: string,
        timestamp: string
    ) {
        await client.reactions.add({
            name: name,
            channel: channel,
            timestamp: timestamp,
        });
    }
}
