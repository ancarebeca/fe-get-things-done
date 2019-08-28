import React from 'react';
import { Route } from 'react-router-dom';

import CreateGoal from '../CreateGoal';
import EditGoal from '../EditGoal';
import GoalsList from '../GoalsList';
import ShowGoal from '../ShowGoal';

export default function Content() {
  return (
    <>
      <Route path="/" exact component={GoalsList} />
      <Route path="/edit/:id" exact component={EditGoal} />
      <Route path="/create" exact component={CreateGoal} />
      <Route path="/show/:id" exact component={ShowGoal} />
    </>
  );
}
