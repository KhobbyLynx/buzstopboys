// ** types
type appConfigType = {
    appName: string
    appVersion: string
    appLogo: string
    appLogoDark: string
    appLogoLight: string
    appUrl: string
    appTitle: string
    appDescription: string
    appAuthor: string
    appAuthorUrl: string
    appAuthorEmail: string
    appKeywords: string
    routingLoader: boolean
}

const appConfig: appConfigType = {
    appName: 'Lynx',
    appVersion: '1.0.0',
    appLogo: '/images/logo/logo.png',
    appLogoDark: '/images/logo/logo-dark.png',
    appLogoLight: '/images/logo/logo-light.png',
    appUrl: 'https://buzstopboys.vercel.app',
    appTitle: 'BuzStopBoys',
    appDescription: 'BuzStopBoys Official Website',
    appAuthor: 'Samuel Tetteh',
    appAuthorUrl: 'https://samueltetteh.netlify.app',
    appAuthorEmail: 'khobbylynx55@gmail.com',
    appKeywords: 'buzstopboys, admin, template, dashboard, admin template, reactjs, react template, react admin, react dashboard, react admin template, react dashboard template',

    // ** Routing Configs
    routingLoader: true /* true | false */,
}

export default appConfig