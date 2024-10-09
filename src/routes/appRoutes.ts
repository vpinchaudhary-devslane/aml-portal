import Instructions from 'views/contents/dashboard/Instructions';
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
    name: 'Questions',
    path: webRoutes.questions.root(),
    key: RouteKey.QUESTIONS,
    component: Instructions,
  },
];
