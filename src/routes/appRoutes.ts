import Instructions from 'views/contents/dashboard/Instructions';
import ContinueJourney from 'views/contents/dashboard/ContinueJourney';
import Welcome from 'views/contents/dashboard/Welcome';
import Questions from 'views/contents/dashboard/Questions';
import { AppRoutesConfigType } from './routes.types';
import { webRoutes } from '../utils/constants/webRoutes.constants';
import { RouteKey } from '../types/enum';
import Dashboard from '../views/contents/dashboard/Dashboard';

export const appRoutes: Array<AppRoutesConfigType> = [
  {
    name: 'Dashboard',
    path: webRoutes.dashboard.root(),
    key: RouteKey.DASHBOARD,
    component: Dashboard,
  },
  {
    name: 'Instructions',
    path: webRoutes.instructions.root(),
    key: RouteKey.INSTRUCTIONS,
    component: Instructions,
  },
  {
    name: 'Continue Journey',
    path: webRoutes.continueJourney.root(),
    key: RouteKey.CONTINUE_JOURNEY,
    component: ContinueJourney,
  },
  {
    name: 'Welcome',
    path: webRoutes.welcome.root(),
    key: RouteKey.WELCOME,
    component: Welcome,
  },
  {
    name: 'Questions',
    path: webRoutes.questions.root(),
    key: RouteKey.QUESTIONS,
    component: Questions,
  },
];
