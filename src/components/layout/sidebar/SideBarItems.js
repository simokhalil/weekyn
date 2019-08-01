import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import SubjectIcon from '@material-ui/icons/Subject';
import ThumbDownIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import AppConfig from '../../../AppConfig';

export default [
  // section
  {
    id: 'dashboard',
    icon: DashboardIcon,
    path: AppConfig.routePaths.homepage,
    items: [{
      type: 'item',
      text: 'Offres',
      path: AppConfig.routePaths.homepage,
      icon: DashboardIcon,
    }],
  },
  // section
  {
    id: 'clients',
    icon: SubjectIcon,
    path: AppConfig.routePaths.homepage,
    items: [],
  },
  {
    id: 'timings',
    icon: SubjectIcon,
    path: AppConfig.routePaths.homepage,
    items: [],
  },
  {
    id: 'settings',
    icon: SettingsIcon,
    path: AppConfig.routePaths.homepage,
    items: [],
  },
];

export const subMenuItems = {
  offers: [
    {
      type: 'item',
      text: 'offers.addJob',
      path: AppConfig.routePaths.addOffer,
      icon: AddIcon,
    }, {
      type: 'item',
      text: 'offers.active',
      path: AppConfig.routePaths.offers,
      icon: CheckIcon,
    }, {
      type: 'item',
      text: 'offers.draft',
      path: AppConfig.routePaths.draftOffers,
      icon: AccountBoxIcon,
    }, {
      type: 'item',
      text: 'offers.archived',
      path: AppConfig.routePaths.deletedOffers,
      icon: DeleteIcon,
    }, /* {
        type: 'item',
        text: 'Rechercher une offre',
        path: '/positions/search',
        icon: SearchIcon,
      }, */
  ],
  sourcing: [
    {
      type: 'item',
      text: 'sourcing.searchCandidate',
      path: AppConfig.routePaths.sourcing,
    }, {
      type: 'item',
      text: 'sourcing.candidatesPool',
      path: AppConfig.routePaths.pool,
    },
  ],
  applications: [
    {
      type: 'item',
      text: 'applications.overview',
      path: AppConfig.routePaths.applications,
      icon: SettingsOverscanIcon,
    }, {
      type: 'item',
      text: 'applications.new',
      path: AppConfig.routePaths.applicationsListNew,
      icon: ViewHeadlineIcon,
    }, {
      type: 'item',
      text: 'applications.inProgress',
      path: AppConfig.routePaths.applicationsListInProgress,
      icon: PlaylistAddIcon,
    }, {
      type: 'item',
      text: 'applications.approved',
      path: '/applications/approved',
      icon: ThumbUpIcon,
    }, {
      type: 'item',
      text: 'applications.declined',
      path: '/applications/declined',
      icon: ThumbDownIcon,
    },
  ],
  settings: [
    {
      type: 'item',
      text: 'settings.myProfile',
      path: '/my-profile',
    }, {
      text: 'settings.settings',
      path: '/settings',
    },
  ],
};
