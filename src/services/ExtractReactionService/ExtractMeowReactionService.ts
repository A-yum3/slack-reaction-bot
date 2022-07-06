import IExtractReactionService from './IExtractReactionService';
import { WebClient } from '@slack/web-api';

export default class ExtractMeowReactionService
    implements IExtractReactionService
{
    private readonly client: WebClient;

    constructor(client: WebClient) {
        this.client = client;
    }

    public execute(emoji_names: string[]): string[] {
        return emoji_names.filter((emoji_name) => emoji_name.includes('meow'));
    }
}
