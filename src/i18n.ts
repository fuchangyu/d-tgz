import { I18n } from 'i18n'
import path from 'path';
import { osLocaleSync } from 'os-locale'

const locales = ['zh-CN', 'en-US']

const i18n = new I18n({
  locales: locales,
  directory: path.join(__dirname, 'locales'),
  extension: '.json',
  defaultLocale: 'en-US',
})

const lang = osLocaleSync()

i18n.setLocale(locales.includes(lang) ? lang : 'en-US')

export default i18n;

export { i18n };


