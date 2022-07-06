export default interface IExtractReactionService {
    execute(emoji_names: string[]): string[];
}