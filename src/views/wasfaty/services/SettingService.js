import { Resources } from "../Resource";

class Service extends Resources {
  route = "Setting";
  routes = {
    find: "",
    create: "/create",
    show: "/show",
    update: "/update",
    delete: "/delete",
  };

  settings = [];

  // Setting Keys

  TranslationArabic = "TRANSLATION_ARABIC";
  TranslationEnglish = "TRANSLATION_ENGLISH";

  constructor() {
    super(arguments);
  }

  getByKey = async (key, force = false) => {
    let data = [];
    let defaultValue = {
      value: [],
    };

    try {
      if (this.settings && !force) {
        data = this.settings;
      } else {
        let res = await this.find();
        data = res?.data?.data;
      }

      if (data?.length) {
        let setting = data.find((setting) => setting.key === key);
        if (setting) {
          return setting;
        }
      }

      throw Error;
    } catch (error) {
      return defaultValue;
    }
  };

  setSetting = (settings) => {
    this.settings = settings;
  };

  getArabicMessages = async () => {
    try {
      let { value } = await this.getByKey(this.TranslationArabic);
      if (value.length) {
        return value.reduce((res, cur) => {
          if (cur.hasOwnProperty("english")) {
            res[cur.english] = cur.arabic;
          }

          return res;
        }, {});
      }

      return {};
    } catch (error) {
      return {};
    }
  };

  getEnglishMessages = async () => {
    try {
      let { value } = await this.getByKey(this.TranslationEnglish);
      if (value.length) {
        return value.reduce((res, cur) => {
          if (cur.hasOwnProperty("english")) {
            res[cur.english] = cur.arabic;
          }

          return res;
        }, {});
      }

      return {};
    } catch (error) {
      return {};
    }
  };
}

const SettingService = new Service();

export default SettingService;
