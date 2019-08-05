// import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
import CalendarIcon from '@material-ui/icons/DateRangeOutlined';
import CheckIcon from '@material-ui/icons/Check';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InvoiceIcon from '@material-ui/icons/DescriptionOutlined';
// import DeleteIcon from '@material-ui/icons/DeleteOutline';
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
    items: [],
  },
  // section
  {
    id: 'clients',
    icon: SubjectIcon,
    path: AppConfig.routePaths.clients,
    items: [],
  },
  {
    id: 'timings',
    icon: CalendarIcon,
    path: AppConfig.routePaths.activity,
    items: [],
  },
  {
    id: 'invoices',
    icon: InvoiceIcon,
    path: AppConfig.routePaths.invoices,
    items: [],
  },
  {
    id: 'settings',
    icon: SettingsIcon,
    path: AppConfig.routePaths.settings,
    items: [],
  },
];

export const subMenuItems = {
  clients: [
    {
      type: 'item',
      text: 'clients.active',
      path: AppConfig.routePaths.clients,
      icon: AddIcon,
    }, {
      type: 'item',
      text: 'clients.archived',
      path: AppConfig.routePaths.clientsArchived,
      icon: CheckIcon,
    },
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
