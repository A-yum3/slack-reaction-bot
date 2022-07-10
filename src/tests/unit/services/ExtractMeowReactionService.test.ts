import ExtractTargetReactionService from '../../../services/ExtractReactionService/ExtractTargetReactionService';

describe('meowパターンの振る舞いテスト', () => {
    const sut = new ExtractTargetReactionService('meow', 'meow');

    test('対象がtextを含まないとき、空配列を返す', async () => {
        const emoji_names = ['text_yoroone', 'text_bad'];

        const result = await sut.execute(emoji_names);

        expect(result).toEqual([]);
    });

    test('対象があるとき、対象の絵文字の名前のみ配列で返す', async () => {
        const emoji_names = ['meow_popcorn', 'text_good'];

        const result = await sut.execute(emoji_names);

        expect(result).toEqual(['meow_popcorn']);
    });

    test('対象がないとき、空配列を返す', async () => {
        const emoji_names = ['text_bad', 'text_good'];

        const result = await sut.execute(emoji_names);

        expect(result).toEqual([]);
    });
});
