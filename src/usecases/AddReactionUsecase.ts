import { ReactionAddedEvent } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import ExtractTargetReactionService from '../services/ExtractReactionService/ExtractTargetReactionService';
import GetEmojiListRequestService from '../external/GetEmojiListRequestService';
import AddReactionService from '../services/AddReactionService';

export default class AddReactionUsecase {
    private readonly _extractReactionService: ExtractTargetReactionService;
    private readonly _client: WebClient;
    private readonly _channel: string;
    private readonly _timestamp: string;

    constructor(event: ReactionAddedEvent, client: WebClient) {
        this._client = client;

        if (event.item.type !== 'message') {
            throw new Error(`${event.item.type}は対象外のリアクションです。`);
        }

        const result = event.reaction.match(/(^moriage)_(.*)/);

        if (result === null) {
            throw new Error(`${event.reaction}は対象外のリアクションです。`);
        }

        let type = result[2];
        const file_name = result[2];

        if (type !== 'meow') {
            type = 'text';
        }

        this._extractReactionService = new ExtractTargetReactionService(
            type,
            file_name
        );

        this._channel = event.item.channel;
        this._timestamp = event.item.ts;
    }

    public async execute(): Promise<void> {
        const emoji_names = await GetEmojiListRequestService.execute(
            this._client
        );
        const target_emoji_names = await this._extractReactionService.execute(
            emoji_names
        );
        await new AddReactionService(this._client).execute(
            target_emoji_names,
            this._channel,
            this._timestamp
        );
    }
}
