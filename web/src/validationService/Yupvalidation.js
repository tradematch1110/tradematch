// using YUP library to validate the user inputs forms 

import * as Yup from "yup";

const onlyHebrewPattern = new RegExp(/^[\u0590-\u05FF ,'"-]+$/i);
const ValidPhoneIsrael = new RegExp(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/);

/////////////////////FORM_LOGIN_VALIDATION//////////////////////////

export const FORM_REGISTER_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "מינימום 2 אותיות")
    .max(20, "מקסימום 20 אותיות")
    .matches(onlyHebrewPattern, "אותיות בעברית בלבד")
    .required("שדה חובה"),
  lastName: Yup.string()
    .min(2, "מינימום 2 אותיות")
    .max(20, "מקסימום 20 אותיות")
    .matches(onlyHebrewPattern, "אותיות בעברית בלבד")
    .required("שדה חובה"),
  email: Yup.string().email("כתובת מייל אינה תקינה").required("שדה חובה"),
  phoneNumber: Yup.string()
    .matches(ValidPhoneIsrael, "מספר פלאפון לא תקין")
    .required("שדה חובה"),
  password: Yup.string()
    .required("שדה חובה")
    .min(8, " אורך הסיסמה חייב להיות 8 תווים לפחות")
    .matches(/[a-zA-Z0-9]/, "אותיות באנגלית"),
});

export const FORM_UPDATEUSER_VALIDATION = Yup.object().shape({
         firstName: Yup.string()
           .min(2, "מינימום 2 אותיות")
           .max(20, "מקסימום 20 אותיות")
           .matches(onlyHebrewPattern, "אותיות בעברית בלבד")
           .required("שדה חובה"),
         lastName: Yup.string()
           .min(2, "מינימום 2 אותיות")
           .max(20, "מקסימום 20 אותיות")
           .matches(onlyHebrewPattern, "אותיות בעברית בלבד")
           .required("שדה חובה"),
         email: Yup.string()
           .email("כתובת מייל אינה תקינה")
           .required("שדה חובה"),
         phoneNumber: Yup.string()
           .matches(ValidPhoneIsrael, "מספר פלאפון לא תקין")
           .required("שדה חובה"),
       });


// FORM_UPDATEUSER_VALIDATION
/////////////////////FORM_LOGIN_VALIDATION//////////////////////////

export const FORM_LOGIN_VALIDATION = Yup.object().shape({
  
  email: Yup.string().email("כתובת מייל אינה תקינה").required("שדה חובה"),
  password: Yup.string()
    .required("שדה חובה")
    .min(8, " אורך הסיסמה חייב להיות 8 תווים לפחות")
    .matches(/[a-zA-Z0-9]/, "אותיות באנגלית"),
});

////////////////////FORM_PRODUCT_VALIDATION////////////////////
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const FORM_PRODUCT_VALIDATION = Yup.object().shape({
  produectTitle: Yup.string()
    .required("שדה חובה"),
  images: Yup.mixed()
    .test(
      "Fichier taille",
      "upload file",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "format",
      "upload file",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  descriptions: Yup.string()
    .min(2, "מינימום 2 אותיות")
    .max(100, "מקסימום 100 אותיות")
    .required("שדה חובה"),
  category: Yup.string()
    .required("שדה חובה"),
  subCategory: Yup.string()
    .required("שדה חובה"),
  condition: Yup.string()
    .min(2, "מינימום 2 אותיות")
    .max(100, "מקסימום 100 אותיות")
    .required("שדה חובה"),
  replaceableCategory: Yup.string()
  .required("שדה חובה"),
  replaceableSubCategory: Yup.string()
  .required("שדה חובה"),
});




// ////////////////////FORM_CODE_VALIDATION////////////////////
// export const FORM_CODE_VALIDATION = Yup.object({
//   code: Yup.number()
//     .min(100000, i18n.t("6_digit_required"))
//     .max(999999, i18n.t("6_digit_required"))
//     .required(i18n.t("Required")),
// });
// ////////////////////FORM_REGISTER_LI_VALIDATION////////////////////
// export const FORM_REGISTER_LI_VALIDATION = Yup.object().shape({
//   smoker: Yup.string().required(i18n.t("Required")),
//   gender: Yup.string().required(i18n.t("Required")),
//   age: Yup.number()
//     .min(0, i18n.t("Age_must_be_less_than_or_equal_to_120"))
//     .max(120, i18n.t("Age_must_be_less_than_or_equal_to_120"))
//     .required(i18n.t("Required")),
//   weight: Yup.number()
//     .min(1, i18n.t("Weihgt_must_be_less_than_or_equal_to_300"))
//     .max(300, i18n.t("Weihgt_must_be_less_than_or_equal_to_300"))
//     .required(i18n.t("Required")),
//   idNumber: Yup.string()
//     .test(i18n.t("Id_validation"), i18n.t("Id_not_valid"), function (value) {
//       let strId = String(value).trim();
//       if (strId.length > 9) {
//         return false;
//       }
//       if (strId.length < 9) {
//         while (strId.length < 9) strId = "0" + strId;
//       }
//       let counter = 0,
//         rawVal,
//         actualVal;
//       for (let i = 0; i < strId.length; i++) {
//         rawVal = Number(strId[i]) * ((i % 2) + 1);
//         actualVal = rawVal > 9 ? rawVal - 9 : rawVal;
//         counter += actualVal;
//       }
//       return counter % 10 === 0;
//     })
//     .required(i18n.t("Required")),
//   requestedInsuranceAmount: Yup.number()
//     .min(100000, i18n.t("Enter_value_between_100000_100000000"))
//     .max(100000000, i18n.t("Enter_value_between_100000_100000000"))
//     .required(i18n.t("Required")),
//   requestedInsurancePeriod: Yup.number()
//     .min(1, i18n.t("Enter_value_between_1_120"))
//     .max(120, i18n.t("Enter_value_between_120"))
//     .required(i18n.t("Required")),
// });


// /////////IS_ISRAEL_ID_VALID/////////////////////////////////////////////
// export const IS_ISRAEL_ID_VALID = (id) => {
//   let strId = String(id).trim();
//   if (strId.length > 9) {
//     return false;
//   }
//   if (strId.length < 9) {
//     while (strId.length < 9) strId = "0" + strId;
//   }
//   let counter = 0,
//     rawVal,
//     actualVal;
//   for (let i = 0; i < strId.length; i++) {
//     rawVal = Number(strId[i]) * ((i % 2) + 1);
//     actualVal = rawVal > 9 ? rawVal - 9 : rawVal;
//     counter += actualVal;
//   }
//   return counter % 10 === 0;
// };
// /////////////////FORM_CREDIT_CARD_VALIDATION//////////////////////////////
// export const FORM_CREDIT_CARD_VALIDATION = Yup.object({
//   number: Yup.string()
//     .test(
//       "test-number",
//       i18n.t("Credit_Card_number_is_invalid"),
//       (value) => valid.number(value).isValid
//     ) // return true false based on validation
//     .required(i18n.t("Required")),
//   fullname: Yup.string().min(2, i18n.t("Min_2_letters"))
//     .max(20, i18n.t("Max_2_letters"))
//     .test(
//       "test-number",
//       i18n.t("Credit_Card_holder_name_is_invalid"),
//       (value) => valid.cardholderName(value).isValid) 
//       // return true false based on validation
//     .required(i18n.t("Required")),
//   expiry: Yup.string()
//     .test(
//       "test-number",
//       i18n.t("Expiry_date_is_invalid"),
//       (value) => valid.expirationDate(value).isValid
//     ) // return true false based on validation
//     .required(i18n.t("Required")),
//   cvc: Yup.string()
//     .test(
//       "test-number",
//       i18n.t("Cvc_number_is_invalid"),
//       (value) => valid.cvv(value).isValid
//     ) // return true false based on validation
//     .required(i18n.t("Required")),
// });
