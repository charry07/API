import { SendMailMyPortfolio } from '../controllers';

export const getControllersRoutes = [
  {
    url: '/api/SendMailToMe',
    method: 'POST',
    handler: SendMailMyPortfolio,
  },
];
