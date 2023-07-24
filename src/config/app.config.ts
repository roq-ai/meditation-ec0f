interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Subscriber'],
  tenantRoles: ['Owner'],
  tenantName: 'Organization',
  applicationName: 'Meditation',
  addOns: ['notifications'],
};
