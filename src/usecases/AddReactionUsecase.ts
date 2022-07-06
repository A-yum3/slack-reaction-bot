import { ReactionAddedEvent } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import IExtractReactionService from '../services/ExtractReactionService/IExtractReactionService';
import ExtractMeowReactionService from '../services/ExtractReactionService/ExtractMeowReactionService';
import GetEmojiListService from '../external/GetEmojiListService';
import AddReactionService from '../services/AddReactionService';
import ExtractPraiseReactionService from '../services/ExtractReactionService/ExtractPraiseReactionService';
import ExtractWelcomeReactionService from '../services/ExtractReactionService/ExtractWelcomeReactionService';

export default class AddReactionUsecase {
    private readonly extractReactionService: IExtractReactionService;
    private readonly client: WebClient;
    private readonly channel: string;
    private readonly timestamp: string;

    constructor(event: ReactionAddedEvent, client: WebClient) {
        this.client = client;

        if (event.item.type !== 'message') {
            throw new Error(`${event.item.type}は対象外のリアクションです。`);
        }

        switch (event.reaction) {
            case 'moriage_meow':
                this.extractReactionService = new ExtractMeowReactionService(this.client);
                break;
            case 'moriage_praise':
                this.extractReactionService = new ExtractPraiseReactionService(this.client);
                break;
            case 'moriage_welcome':
                this.extractReactionService = new ExtractWelcomeReactionService(this.client);
                break;
            default:
                throw new Error(`${event.reaction}は対象外のリアクションです。`);
        }
        this.channel = event.item.channel;
        this.timestamp = event.item.ts;
    }

    public async execute(): Promise<void> {
        const emoji_names = await GetEmojiListService.execute(this.client);
        const target_emoji_names = this.extractReactionService.execute(emoji_names);
        await new AddReactionService(this.client).execute(target_emoji_names, this.channel, this.timestamp);
    }
}