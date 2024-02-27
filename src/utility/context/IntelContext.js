import React, { useState, useEffect, useMemo } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch } from "react-redux";
import { handleRTL } from "../../redux/layout";
import { IntlService } from "../../views/wasfaty/services";

const Context = React.createContext();

const IntlProviderWrapper = (props) => {
  const Languages = {
    sa: {
      locale: "sa",
      messages: IntlService.arabicMessages,
      direction: "rtl",
    },
    en: {
      locale: "en",
      messages: IntlService.englishMessages,
      direction: "ltr",
    },
  };

  const [state, setState] = useState(Languages["en"]);

  const isArabic = useMemo(() => state.locale === "sa", state.locale);
  const isEnglish = useMemo(() => state.locale === "en", state.locale);
  const dispatch = useDispatch();

  useEffect(() => {
    let d =
      window.localStorage.getItem("direction")?.toString?.() === "true"
        ? "sa"
        : "en";
    dispatch(handleRTL(d === "sa"));
    handleSwitch(d);
  }, []);

  const handleSwitch = (language) => {
    setState({ ...Languages[language] });
  };

  const updateMessages = (newMessages) => {
    let messages = { ...state.messages, ...newMessages };
    setState((oldState) => ({ ...oldState, messages }));
  };

  const updateArabicMessages = (messages) => {
    IntlService.updateArabicMessages(messages);

    if (isArabic) {
      updateMessages(IntlService.arabicMessages);
    }
  };

  const updateEnglishMessages = (messages) => {
    IntlService.updateEnglishMessages(messages);
    if (isEnglish) {
      updateMessages(IntlService.englishMessages);
    }
  };

  const { children } = props;
  const { locale, messages } = state;
  return (
    <Context.Provider
      value={{
        state: state,
        switchLanguage: handleSwitch,
        locale: locale,
        updateMessages,
        isArabic,
        updateArabicMessages,
        updateEnglishMessages,
      }}
    >
      <IntlProvider key={locale} locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};
export { IntlProviderWrapper, Context as IntlContext };
