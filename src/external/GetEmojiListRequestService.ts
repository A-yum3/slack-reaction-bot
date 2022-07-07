import { WebClient } from '@slack/web-api';

export default class GetEmojiListRequestService {
    static async execute(client: WebClient): Promise<string[]> {
        const response = await client.emoji.list();

        if (response.emoji === undefined) {
            throw new Error('絵文字が存在しません');
        }
        return Object.keys(response.emoji);
    }
}
