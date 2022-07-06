import IExtractReactionService from './IExtractReactionService';
import { WebClient } from '@slack/web-api';

export default class ExtractWelcomeReactionService
    implements IExtractReactionService
{
    private readonly client: WebClient;

    constructor(client: WebClient) {
        this.client = client;
    }

    public execute(emoji_names: string[]): string[] {
        const text_emoji_names = emoji_names.filter((emoji) => emoji.includes('text'));
        return text_emoji_names.filter((emoji_name) => {
            return emoji_name.includes('yoroone')
            || emoji_name.includes('youkoso')
            || emoji_name.includes('yorosiku')
            || emoji_name.includes('yattane')
            || emoji_name.includes('syuku')
            || emoji_name.includes('saisyohaminnna')
            || emoji_name.includes('omedeto')
            || emoji_name.includes('akeome')
        });
    }
}
