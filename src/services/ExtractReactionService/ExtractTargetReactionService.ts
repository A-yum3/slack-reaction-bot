import ReadConfig from '../../infra/ReadConfig';

export default class ExtractTargetReactionService {
    private readonly type: string;
    private readonly target_file_name: string;

    constructor(type: string, target_file_name: string) {
        this.type = type;
        this.target_file_name = target_file_name;
    }

    public async execute(emoji_names: string[]): Promise<string[]> {
        const text_emoji_names = emoji_names.filter((emoji) =>
            emoji.includes(this.type)
        );

        const target_emoji_names = await ReadConfig.execute(
            this.target_file_name
        );

        return text_emoji_names.filter((emoji_name) => {
            for (const name of target_emoji_names) {
                if (emoji_name.includes(name)) {
                    return true;
                }
            }
        });
    }
}
