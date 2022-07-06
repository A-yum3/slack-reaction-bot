import ExtractTargetReactionService from '../../services/ExtractReactionService/ExtractTargetReactionService';

describe('test', () => {
    const sut = new ExtractTargetReactionService('text', 'praise');

    test('a', async () => {
        const emoji_names = [
            'text_iine',
            'text_bad',
            'text_good'
        ];

        const result = await sut.execute(emoji_names);

        console.log(result);
    })
});