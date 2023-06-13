import 'i18next'
import { defaultNS, resources } from 'src/i18n/i18n'
// import all namespaces (for the default language, only)

// react-i18next versions lower than 11.11.0
declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: typeof defaultNS
    // custom resources type
    resources: (typeof resources)['vi']
  }
}
