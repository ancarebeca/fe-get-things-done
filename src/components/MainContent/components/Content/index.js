import React from 'react';
import { Route } from 'react-router-dom';

import CreateGoal from '../../../create-goal.component';
import EditGoal from '../../../edit-goal.component';
import GoalsList from '../../../goals-list.component';
import ViewGoal from '../../../view-goal.component';

export default function Content() {
  return (
    <>
      <Route path="/" exact component={GoalsList} />
      <Route path="/edit/:id" exact component={EditGoal} />
      <Route path="/create" exact component={CreateGoal} />
      <Route path="/view/:id" exact component={ViewGoal} />
    </>
  );
}
