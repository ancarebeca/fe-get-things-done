import React from 'react';
import CreateGoal from '../../CreateGoal';

import { shallow } from 'enzyme';

const emptyFunction = () => {};

const defaultProps = {
  history: {
    push: emptyFunction
  }
};

function setUp(props = {}) {
  return shallow(<CreateGoal {...defaultProps} {...props} />);
}

describe('<CreateGoal/> data validations', () => {
  const penaltyDataProvider = [
    ['10', true],
    ['-1', false],
    ['0', false],
    ['', false],
    ['string', false],
    [undefined, false]
  ];

  test.each(penaltyDataProvider)(
    'given a penalty equal to %p as arguments, returns %p',
    (penalty, expectedResult) => {
      const wrapper = setUp();
      const {
        actions: { onChangeGoalPenalty }
      } = wrapper.props();

      onChangeGoalPenalty({ target: { value: penalty } });

      const {
        validations: { isPenaltyValid }
      } = wrapper.props();

      expect(isPenaltyValid).toEqual(expectedResult);
    }
  );

  const descriptionDataProvider = [
    ['Go to gym tiwce at week.', true],
    ['', false],
    [undefined, false]
  ];

  test.each(descriptionDataProvider)(
    'given a description equal to %p as arguments, returns %p',
    (description, expectedResult) => {
      const wrapper = setUp();
      const {
        actions: { onChangeGoalDescription }
      } = wrapper.props();

      onChangeGoalDescription({ target: { value: description } });

      const {
        validations: { isDescriptionValid }
      } = wrapper.props();

      expect(isDescriptionValid).toEqual(expectedResult);
    }
  );

  const accountablePartnerDataProvider = [
    ['Jose@gmail.com', true],
    ['', false],
    [undefined, false]
  ];

  test.each(accountablePartnerDataProvider)(
    'given a description equal to %p as arguments, returns %p',
    (accountablePartner, expectedResult) => {
      const wrapper = setUp();
      const {
        actions: { onChangeGoalAcountablePartner }
      } = wrapper.props();

      onChangeGoalAcountablePartner({
        target: { value: accountablePartner }
      });

      const {
        validations: { isAcountablePartnerValid }
      } = wrapper.props();

      expect(isAcountablePartnerValid).toEqual(expectedResult);
    }
  );
});

describe('<CreateGoal/> actions', () => {
  it('handles onChange', () => {
    const today = new Date();
    const expectData = {
      description: 'Go to gym twice at week',
      deadline: today,
      accountablePartner: 'mgonyan@gmail.com',
      penalty: '4'
    };

    const wrapper = setUp();

    const {
      actions: {
        onChangeGoalDescription,
        onChangeGoalDeadline,
        onChangeGoalAcountablePartner,
        onChangeGoalPenalty
      }
    } = wrapper.props();

    onChangeGoalDescription({ target: { value: 'Go to gym twice at week' } });
    onChangeGoalDeadline(today);
    onChangeGoalAcountablePartner({ target: { value: 'mgonyan@gmail.com' } });
    onChangeGoalPenalty({ target: { value: '4' } });

    const goal = wrapper.props().goal;

    expect(goal.description).toEqual(expectData.description);
    expect(goal.deadline).toEqual(expectData.deadline);
    expect(goal.accountablePartner).toEqual(expectData.accountablePartner);
    expect(goal.penalty).toEqual(expectData.penalty);
  });

  const touchedFieldDataProvider = [
    ['description', true],
    ['deadline', true],
    ['accountablePartner', true],
    ['penalty', true]
  ];

  test.each(touchedFieldDataProvider)(
    'when field %p is touched, state is change to %p',
    (fieldTouched, expectedResult) => {
      const wrapper = setUp();

      const {
        actions: { onFocus }
      } = wrapper.props();

      onFocus(fieldTouched)();

      const props = wrapper.props();
      expect(props.touched[fieldTouched]).toEqual(expectedResult);
    }
  );
});

describe('<CreateGoal/> onSubmit action', () => {
  const fieldDataProvider = [
    ['Go to gym twice at week', '1', 'manuel@gmail.com', true, []],
    ['', '1', 'manuel@gmail.com', true, ['Description cannot be empty']],
    [
      'Go to gym twice at week',
      '0',
      'manuel@gmail.com',
      true,
      ['Penalty has to be bigger than 0']
    ],
    [
      'Go to gym twice at week',
      '1',
      '',
      true,
      ['Accountable partner cannot be empty']
    ],
    [
      '',
      '0',
      '',
      true,
      [
        'Accountable partner cannot be empty',
        'Description cannot be empty',
        'Penalty has to be bigger than 0'
      ]
    ]
  ];

  test.each(fieldDataProvider)(
    'when field %p is touched, state is change to %p',
    (description, penalty, accountablePartner, touched, error) => {
      const wrapper = setUp();

      const {
        actions: {
          onChangeGoalPenalty,
          onChangeGoalAcountablePartner,
          onChangeGoalDescription
        }
      } = wrapper.props();

      onChangeGoalPenalty({ target: { value: penalty } });
      onChangeGoalAcountablePartner({ target: { value: accountablePartner } });
      onChangeGoalDescription({ target: { value: description } });

      const {
        actions: { onSubmit }
      } = wrapper.props();

      onSubmit();

      const props = wrapper.props();

      expect(
        props.touched['penalty'] &&
          props.touched['accountablePartner'] &&
          props.touched['description']
      ).toEqual(touched);

      expect(props.errors).toEqual(error);
    }
  );
});
