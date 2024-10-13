import { generateSchedule } from './schedulingLogic';

const residents = [
  { name: "Julie", imageUrl: 'image-julie.jpg' },
  { name: "Anine", imageUrl: 'image-anine.jpg' },
  { name: "Jenny L", imageUrl: 'image-jennyL.jpg' },
  { name: "Jenny M", imageUrl: 'image-jennyM.jpg' },
  { name: "Hanna", imageUrl: 'image-hanna.jpg' }
];

const areas = ["Bad🚽", "Kjøkken🧼", "Stue💦"];
const offWeeks = [null, null];

describe('generateSchedule', () => {
  it('generates the correct schedule for current week', () => {
    const currentWeek = 1;
    const result = generateSchedule(currentWeek, residents, areas, offWeeks);

    expect(result[0]).toEqual([
      { person: residents[0], area: "Kjøkken🧼" },
      { person: residents[1], area: "Stue💦" },
      { person: residents[2], area: null },
      { person: residents[3], area: null },
      { person: residents[4], area: "Bad🚽" }
    ]);
  });
});
