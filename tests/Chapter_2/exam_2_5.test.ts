import { flatten } from '../../Chapter_2/exam_2_5'

describe('Chapter 2: exam 2.5', () => {
  it('flatten works correctly', () => {
    const people = [
      {
        person: {
          firstName: {
            name: [{ name: 1 }, '4']
          },
          lastName: 'Doe',
          role: 'Admin'
        },
        permissions: ['read', 'write', 'special'],
        age: 42,
        competencies: [
          { skill: 'JavaScript', level: 'junior' },
          { skill: 'css', level: 'junior' }
        ]
      }
    ]

    expect(flatten(people)).toEqual([
      {
        person_firstName_name_0_name: 1,
        person_firstName_name_1: '4',
        person_lastName: 'Doe',
        person_role: 'Admin',
        permissions_0: 'read',
        permissions_1: 'write',
        permissions_2: 'special',
        age: 42,
        competencies_0_skill: 'JavaScript',
        competencies_0_level: 'junior',
        competencies_1_skill: 'css',
        competencies_1_level: 'junior'
      }
    ])
  })
})
