import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})

/**
 * @param {String} locale
 */
export async function loadMessages (locale) {
  if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
    const messages = await import(/* webpackChunkName: "lang-[request]" */ `~/lang/${locale}`)
    i18n.setLocaleMessage(locale, messages)
  }

  if (i18n.locale !== locale) {
    i18n.locale = locale
  }
}

(async function () {
  const { locale } = window.config

  let lang = Cookies.get('locale') || locale
  await loadMessages(lang)
})()

export default i18n
