import React, { Fragment, useContext, useRef } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Link,
  Canvas,
} from "@react-pdf/renderer";
import get from "lodash/get";
import moment from "moment";
import Cairo_Regular from "./Cairo-Regular.ttf";

import pdfbg from "../../../assets/images/pdf/pdfbg.png";
import pdflogos from "../../../assets/images/pdf/pdflogos.png";
import powerdByAscendPdf from "../../../assets/images/pdf/powerdByAscendPdf.png";

import _ from "lodash";
import { IntlService } from "../../wasfaty/services";
let messages_sa = {};
let messages_en = {};
let arabicStringSearch = /[\u0600-\u06FF]/;
let arabicNumber = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Cairo Regular",
    // fontStyle: "Cario",
  },
  header: {
    backgroundColor: "#04244a",
    padding: 10,
    flexDirection: "row",
    color: "#fff",
  },
  row: {
    backgroundColor: "#fff",
    padding: 10,
    color: "#000",
    borderBottomWidth: 1,
  },
  customWidth: {
    width: "100%",
    fontSize: 15,
    padding: 5,
  },
  flexRowReverse: {
    width: "100%",
    flexDirection: "row-reverse",
    textAlign: "right",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  ml1: {
    marginLeft: "2pt",
    fontSize: "12",
    padding: "5",
  },

  pageContainer: {
    backgroundColor: "#fff",
    fontFamily: "Cairo Regular",
  },
  pageHeader: {
    backgroundColor: "#FBFFFE",
    height: "100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageSection: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
  },
  logos: {
    height: "50px",
    marginTop: "10px",
    // marginLeft: 100,
  },
  infoSection: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centerBorder: {
    borderLeft: 2,
    borderColor: "#141415",
    borderStyle: "solid",
    marginVertical: "10px",
    alignItems: "flex-end",
    marginRight: "10px",
    paddingLeft: 5,
  },
  infoText: {
    marginVertical: "10px",
    alignItems: "flex-end",
    marginRight: "10px",
  },
  text: {
    fontSize: 14,
    marginBottom: -2,
  },
  textBadge: {
    // marginTop: 10,
    padding: "5px",
    // backgroundColor: "red",
    backgroundColor: "#CEE7D6",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  contentSection: {
    flex: 1,
  },
  step: {
    marginTop: 20,
    // position: "relative",
  },
  stepHeader: {
    backgroundColor: "#FBFFFE",
    borderRadius: 58,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    fontSize: 14,
    color: "#141415",
  },

  border: {
    border: 1,
    borderColor: "#141415",
    borderStyle: "solid",
    marginHorizontal: 20,
    height: 30,
    fontFamily: "Helvetica",
  },
  stepContent: {
    backgroundColor: "#FAFFF7",
    marginHorizontal: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    // position: "absolute",
    // top: 30,
    // zIndex: -1,
  },
  content: {
    marginTop: 30,
  },
  contentHeader: {
    backgroundColor: "#0D8C60",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    fontSize: 12,
    color: "white",
    alignItems: "center",
    // paddingVertical: 5,
  },
  contentBox: {
    border: 1,
    borderStyle: "solid",
    borderColor: "#0D8C60",
    display: "flex",
    padding: 10,
    fontSize: 12,
    marginBottom: 15,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: "100%",
    paddingHorizontal: 20,
    // fontStyle: "Times",
    textAlign: "right",
  },
  boxtext: {
    width: "100%",
  },
  arabicText: {
    width: "49%",
    // textAlign: "right",
  },
});

const storeAarrayAndReverse = (text) => {
  return text
    .replaceAll("\n", " ")
    .split(" ")
    .filter((i) => i);
  // .map((w) => (/^\d+$/.test(w) ? "-" : w));
  // .map((w) => {
  //   if (arabicNumber.test(w)) {
  //     return w.split("").reverse().join("");
  //   }
  //   return w;
  // });
};

//Testing image
function isImage(url) {
  return /\.(jpg|jpeg|png|webp)$/.test(url?.toLowerCase?.());
}

// Create Document Component
const MyPDF = ({
  rowData,
  language = "en",
  row,
  pdfRenderData,
  formName = "",
}) => {
  messages_sa = IntlService.arabicMessages;
  messages_en = IntlService.englishMessages;
  const trans = {
    ab: {
      Question: "سؤال",
      Answer: "إجابه",
    },
    en: {
      Question: "Question",
      Answer: "Answer",
    },
  };

  const steps = Object.entries(pdfRenderData);

  //Rendering arabic content
  const RenderArabic = ({ content, style }) => {
    content = a2e(content);
    content = p2e(content).replace(/\b(\d+)\b/g, " $1 "); // add speces around the number so it will be seprated from arabic or english word

    const replacer = (word) => {
      switch (word) {
        case ")":
          return "(";

        case "(":
          return ")";

        default:
          return word;
      }
    };
    return (
      <View style={style}>
        {storeAarrayAndReverse(content).map((word, idx) => {
          return (
            <Text
              style={{
                paddingHorizontal: 4,
              }}
              key={idx}
            >
              {replacer(word)}
            </Text>
          );
        })}
      </View>
    );
  };

  const RenderFile = ({ files }) => {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {files.map((file, index) => {
          return (
            <View
              style={{
                width: "40%",
                display: "flex",
                margin: 10,
              }}
              key={index}
            >
              {isImage(file) ? (
                <View
                  style={{
                    alignItems: "flex-start",
                  }}
                >
                  <Link src={file}>Download | تحميل </Link>
                  <Image
                    src={file}
                    style={{ width: "150", objectFit: "cover" }}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: "left",
                    fontFamily: "Helvetica",
                    overflow: "hidden",
                  }}
                >
                  {/* {file} */}
                  <Link src={file}>{file}</Link>
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.pageContainer}>
        <View style={styles.pageHeader}>
          <View style={styles.imageSection}>
            {/* <View style={{ possition: "absolute", width: 800, height: 800 }}> */}
            <Image src={pdfbg} style={{ width: 300, position: "absolute" }} />
            {/* </View> */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                marginLeft: 50,
              }}
            >
              {/* <Image src={pdflogos} style={styles.logos} /> */}
              <Text style={{ fontSize: 12 }}>{formName}</Text>
              <Text style={{ fontSize: 12 }}>{messages_sa[formName]}</Text>
            </View>
          </View>
          <View style={styles.infoSection}>
            <View style={styles.infoText}>
              <Text style={styles.text}>تاريخ</Text>
              <Text style={styles.text}>Date</Text>
              <Text style={styles.textBadge}>
                {moment(rowData.created_at).format("ll")}
              </Text>
            </View>
            <View style={styles.centerBorder}>
              <Text style={styles.text}>رقم التقرير#</Text>
              <Text style={styles.text}>Report No. #</Text>
              <Text style={styles.textBadge}>{rowData.reportNumber}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 130 }}>
          {steps.map((step, stepindex) => {
            //step existense check
            let isStepExist = false;
            step[1].forEach((element) => {
              const values = _.get(rowData, element?.state);
              const _check = Array.isArray(values) ? !!values.length : !!values;
              isStepExist = isStepExist || _check;
            });

            return (
              isStepExist && (
                <View style={styles.step} key={stepindex}>
                  <View style={styles.stepHeader}>
                    <Text>
                      {messages_en[_.startCase(step[0])] ||
                        _.startCase(step[0])}
                    </Text>
                    <View style={styles.border}></View>
                    <RenderArabic
                      content={messages_sa[_.startCase(step[0])] || ""}
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    />
                  </View>

                  <View style={styles.stepContent}>
                    <View style={styles.content}>
                      {step[1].map((tag, tagKey) => {
                        const values = _.get(rowData, tag?.state);
                        const _check = Array.isArray(values)
                          ? values.length
                          : !!values;

                        if (_check) {
                          return (
                            <View key={"tag" + tagKey}>
                              <View style={styles.contentHeader}>
                                <Text style={{ width: "49%", fontSize: 13 }}>
                                  {tag?.title}
                                </Text>
                                <RenderArabic
                                  content={messages_sa[tag?.title] || ""}
                                  style={{
                                    width: "49%",
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    flexWrap: "wrap",
                                  }}
                                />
                              </View>
                              <View style={styles.contentBox}>
                                {tag.function ? (
                                  tag.function(
                                    _.get(rowData, tag?.state),
                                    tag,
                                    RenderArabic,
                                    RenderFile
                                  )
                                ) : arabicStringSearch.test(
                                    _.get(rowData, tag?.state)
                                  ) ? (
                                  <>
                                    <RenderArabic
                                      content={_.get(rowData, tag?.state)}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        flexWrap: "wrap",
                                      }}
                                    />
                                  </>
                                ) : _.get(rowData, tag?.state) instanceof
                                  Array ? (
                                  <RenderFile
                                    files={_.get(rowData, tag?.state)}
                                  />
                                ) : (
                                  <Text
                                    style={{
                                      width: "100%",
                                      fontFamily: "Helvetica",
                                      paddingRight: 5,
                                    }}
                                  >
                                    {_.get(rowData, tag?.state)}
                                  </Text>
                                )}

                                {tag.moreOptions && (
                                  <View
                                    style={{
                                      fontSize: 13,
                                    }}
                                  >
                                    {_.get(rowData, `${tag?.state}_other`) && (
                                      <Text style={{ width: "100%" }}>
                                        Reason :{" "}
                                        {_.get(rowData, `${tag?.state}_other`)}
                                      </Text>
                                    )}
                                    {_.get(
                                      rowData,
                                      `${tag?.state}_file`
                                    ) instanceof Array &&
                                    _.get(rowData, `${tag?.state}_file`)
                                      .length ? (
                                      <View>
                                        <Text>Files: </Text>
                                        <RenderFile
                                          files={_.get(
                                            rowData,
                                            `${tag?.state}_file`
                                          )}
                                        />
                                      </View>
                                    ) : null}
                                  </View>
                                )}
                              </View>
                            </View>
                          );
                        }
                      })}
                    </View>
                  </View>
                </View>
              )
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: "#FBFFFE",
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            padding: 20,
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 105,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
              justifyContent: "space-between",
              marginBottom: 7,
              borderBottom: 1,
              borderBottomColor: "#F1F1F1",
              borderBottomStyle: "solid",
              paddingBottom: 5,
            }}
          >
            <Image src={pdflogos} style={{ height: "25" }} />
            <Image src={powerdByAscendPdf} style={{ height: 20 }} />
          </View>
          <Text
            style={{
              color: "#6A7C94",
              marginHorizontal: 50,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            This is the computer-generated report it doesn’t require any stamp
            or signature
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Cairo Regular",
  format: "truetype",
  src: Cairo_Regular,
});
export default MyPDF;
