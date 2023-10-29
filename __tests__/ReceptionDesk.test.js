import { Console } from '@woowacourse/mission-utils';
import ReceptionDesk from '../src/ReceptionDesk.js';
import { validateName } from '../src/functions/validate.js';

describe('이름 입력 처리 테스트', () => {
  test('이름 입력 시, Console.readLineAsync를 사용한다', async () => {
    const inputs = 'pobi,woni,jun';
    const readSpy = jest
      .spyOn(Console, 'readLineAsync')
      .mockResolvedValue(inputs);
    await ReceptionDesk.registerRacingCars();
    expect(readSpy).toHaveBeenCalled();
    readSpy.mockClear();
  });

  test('입력받은 이름을 쉼표(,)를 기준으로 구분한다', async () => {
    const inputs = 'pobi,woni,jun';
    const outputs = await ReceptionDesk.createNameList(inputs);
    const expected = ['pobi', 'woni', 'jun'];
    expect(outputs).toStrictEqual(expected);
  });
});

describe('이름 입력 예외 테스트', () => {
  test.each([[['pobi', 'javaji']], [['']]])(
    '이름이 5자 이내가 아니면 에러를 발생시킨다 (입력된 이름들: %s)',
    (inputs) => {
      expect(() => validateName(inputs)).toThrow('[ERROR]');
    },
  );
});
