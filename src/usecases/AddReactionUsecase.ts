import { ReactionAddedEvent } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import ExtractTargetReactionService from '../services/ExtractReactionService/ExtractTargetReactionService';
import GetEmojiListRequestService from '../external/GetEmojiListRequestService';
import AddReactionService from '../services/AddReactionService';

export default class AddReactionUsecase {
    private readonly extractReactionService: ExtractTargetReactionService;
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
                this.extractReactionService = new ExtractTargetReactionService(
                    'meow',
                    'meow'
                );
                break;
            case 'moriage_praise':
                this.extractReactionService = new ExtractTargetReactionService(
                    'text',
                    'praise'
                );
                break;
            case 'moriage_welcome':
                this.extractReactionService = new ExtractTargetReactionService(
                    'text',
                    'welcome'
                );
                break;
            default:
                throw new Error(
                    `${event.reaction}は対象外のリアクションです。`
                );
        }
        this.channel = event.item.channel;
        this.timestamp = event.item.ts;
    }

    public async execute(): Promise<void> {
        const emoji_names = await GetEmojiListRequestService.execute(
            this.client
        );
        const target_emoji_names = await this.extractReactionService.execute(
            emoji_names
        );
        await new AddReactionService(this.client).execute(
            target_emoji_names,
            this.channel,
            this.timestamp
        );
    }
}
