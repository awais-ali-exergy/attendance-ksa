import { Singleton } from "../Resource";
import messages_sa from "../../../assets/data/locales/sa.json";
import messages_en from "../../../assets/data/locales/en.json";
class Service {
  intl = null;
  arabicMessages = messages_sa;
  englishMessages = messages_en;
  formatMessage(msg) {
    return this.intl.formatMessage({
      id: msg,
      defaultMessage: msg,
    });
  }

  m(msg) {
    if (msg)
      return this.intl.formatMessage({
        id: msg,
        defaultMessage: msg,
      });
  }

  setIntl(intl) {
    this.intl = intl;
  }

  updateArabicMessages = (messages) => {
    this.arabicMessages = { ...this.arabicMessages, ...messages };
  };

  updateEnglishMessages = (messages) => {
    this.englishMessages = { ...this.englishMessages, ...messages };
  };

  get isRtl() {
    return this.intl?.locale === "sa";
  }
}

const IntlService = new Service();
export default IntlService;
