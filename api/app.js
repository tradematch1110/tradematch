/**********************************************************************************************
                ******* this file run the whole app srever service *******

    the flow:
    1. incoming request get to app.js file
    2. move to the startup route file
    3. move to the route direcory in to the specific route file
    4. the route handle all the middleware and return the result to the cleint
    
    app.js => stratup => routes => controllers => repositories
    
***********************************************************************************************/

// declere all the required consts
const winston = require("winston");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./startup/logger");

// temp ////////////////////////////////////////////////////
const { Category } = require("./models/category");
///////////////////////////////////////////////////
// init the app const to use the required services

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser({ limit: "50mb" }));
app.use(express.json());
app.use(cors());


// use morgan to console log any incoming http request
app.use(morgan("tiny"));
logger.info("morgan enabled");
logger.info(app.get("env"));

///////////////////////////////////////////////////

app.get("/add-category", (req, res) => {
  const categories = [];
  categories.push(
    new Category({
      name: "מוצרי חשמל",
      id: "1",
      subCategories: [
        "מקרר",
        "טלויזיה",
        "מכונת כביסה",
        "מזגן",
        "מכונת קפה",
        "DVD",
        "אופה לחם",
        "בלנדר ומיקסר",
        "וידאו",
        "זרוע לטלוויזיה",
        "טוחן אשפה",
        "טוסטר",
        "טוסטר אובן",
        "טלויזיה",
        "טלפונים ואביזרים",
        "כיריים",
        "מאוורר",
        "מגהץ",
        "מדיח כלים",
        "מזגן",
        "מחברים וכבלים",
        "מטחנת בשר",
        "מטחנת קפה",
        "מטען לסוללות",
        "מיחם לשבת",
        "מייבש כביסה",
        "מיקרוגל",
        "מכונת גלידה",
        "מכונת כביסה",
        "מכונת קפה",
        "מכונת תפירה",
        "מכשירי פקס",
        "מנגל",
        "מסחטה",
        "מעבד מזון",
        "מפזר חום",
        "מקפיא",
        "מקרן",
        "מקרר",
        "מקרר יינות",
        "מקרר מיני בר",
        "מתקני / מטהרי מים",
        "ניקוי בקיטור",
        "סדין חשמלי",
        "סטרימר",
        "סיר בישול",
        "סיר טיגון",
        "פלטה חשמלית",
        "קולט אדים",
        "קומקום חשמלי",
        "רדיאטור",
        "שואבי אבק",
        "שלטים",
        "תנור אפייה",
        "תנור חימום",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ריהוט",
      id: "2",
      subCategories: [
        "פינת אוכל",
        "סלון",
        "ספות",
        "ארונות",
        "מזנון / ויטרינה",
        "ארונות",
        "בר",
        "דלתות",
        "חדרי שינה",
        "כוורת",
        "כורסאות",
        "כורסאות טלויזיה",
        "כורסאות ומושבי עיסוי",
        "כיסא נדנדה",
        "כסאות",
        "מדפים",
        "מוטות תלייה",
        "מזנון / ויטרינה",
        "מזרנים",
        "מטבח",
        "מיטות",
        "מעמד לדיסקים",
        "מראה",
        "סלון",
        "ספות",
        "ספריה",
        "ענתיקות",
        "פוף",
        "פינת אוכל",
        "ריהוט לגינה",
        "ריהוט לחדרי ילדים",
        "ריהוט משרדי",
        "שולחן טלוויזיה",
        "שולחן מחשב",
        "שולחנות",
        "שטיחים",
        "שידות",
        "שעון קיר",
        "תכולת דירה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "עסקים למכירה/מסירה",
      id: "3",
      subCategories: [
        "אופנה וביגוד",
        "אינטרנט ודומיינים",
        "אירועים",
        "בידור ומוסיקה",
        "בית מלון",
        "בתי קפה ומסעדות",
        "הזדמנויות עסקיות",
        "הייטק",
        "זכות ציבורית למונית",
        "זכיינות",
        "חנויות",
        "חקלאות",
        "טיפוח וקוסמטיקה",
        "ייצור",
        "כללי",
        "מוסכים",
        "מועדונים וברים",
        "מזון",
        "מינימרקט/סופרמרקט",
        "מסחר",
        "משקיעים פוטנציאלים",
        "מתקני ילדים",
        "עבודה מהבית",
        'עסקים בחו"ל',
        "פיצוציה/קיוסק",
        "קווי חלוקה",
        "קליניקה",
        "שותפות",
        "תעשייה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ספורט",
      id: "4",
      subCategories: [
        "ספורט ימי",
        "מכשירי כושר ביתיים",
        "מכונית על שלט רחוק",
        "טיסנים ומסוקים",
        "שעוני דופק/פולאר",
        "אביזרי ספורט",
        "אביזרים לסנפלינג",
        "אביזרים לסקי",
        "אומנויות לחימה",
        "אופניים",
        "ביגוד ונעליים מקצועיות",
        "ג'אגלינג/להטוטנות",
        "גולף",
        "הוקי",
        "וויקבורד",
        "טיסנים ומסוקים",
        "טרמפולינה",
        "מחבטי טניס",
        "מטקות",
        "מכונית על שלט רחוק",
        "מכשירי כושר ביתיים",
        "מנוי לחדר כושר",
        "סנובורד",
        "ספורט ימי",
        "סקייטבורד",
        "עפיפונים",
        "ציוד דיג",
        "ציוד לאגרוף",
        "ציוד לכדורגל",
        "ציוד לכדורסל",
        "ציוד צלילה",
        "צניחה",
        "רולר בליידס וגלגיליות",
        "שולחנות משחק",
        "שעוני דופק/פולאר",
        "שק אגרוף",
      ],
    })
  );
  categories.push(
    new Category({
      name: "סלולרי",
      id: "5",
      subCategories: [
        "מכשיר סלולרי",
        "אביזרים",
        "מספרי זהב",
        "Smartwatch",
        "אביזרים",
        "כרטיס סים",
        "מודם סלולרי",
        "מכשיר סלולרי",
        "מספרי זהב",
      ],
    })
  );
  categories.push(
    new Category({
      name: "לתינוק ולילד",
      id: "6",
      subCategories: [
        "עגלות ועגלות טיול",
        "מיטות ולולים",
        "ממונעים לילדים",
        "שידות החתלה / שידות",
        "משחקים וצעצועים",
        "אביזרי בטיחות",
        "אביזרים ללידה ולהנקה",
        "אוניברסיטה",
        "אופני ילדים",
        "אמבטיה\\ כלי אמבטיה",
        "ביגוד והנעלה",
        "בייביסנס ומוניטורים",
        "הופעות לילדים",
        "הליכונים ובימבות",
        "טרמפולינה",
        "כורסת הנקה",
        "כלי אוכל",
        "כלי מיטה",
        "כסא לאוכל",
        "כסא לרכב",
        "מובייל",
        "מיטות ולולים",
        "מכשיר אדים",
        "ממונעים לילדים",
        "מנשאים",
        "משחקים וצעצועים",
        "משטחי/מזרני פעילות",
        "מתקני ג'ימבורי",
        "נדנדה",
        "סלקל",
        "ספרי ילדים",
        "עגלות ועגלות טיול",
        "פורים",
        "ציורים ותמונות",
        "קישוטים ואביזרים",
        "קלטות ו-DVD",
        "שידות החתלה / שידות",
        "תיקים",
      ],
    })
  );
  categories.push(
    new Category({
      name: "קונסולות משחק",
      id: "7",
      subCategories: [
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo GameBoy",
        "Nintendo GameCube",
        "Nintendo Switch",
        "Nintendo Wii",
        "Nintendo Wii U",
        "PSP",
        "PlayStation 1",
        "PlayStation 2",
        "PlayStation 3",
        "PlayStation 4",
        "PlayStation 5",
        "PlayStation Vita",
        "XBOX",
        "Xbox 360",
        "Xbox One",
        "Xbox Series S",
        "Xbox Series X",
        "אביזרים",
        "משחקים",
        "נינטנדו",
      ],
    })
  );
  categories.push(
    new Category({
      name: "מחשבים וציוד נלווה",
      id: "8",
      subCategories: [
        "מחשב נייד",
        "מחשב שולחני",
        "טאבלטים",
        "חומרה",
        "Ebook Reader",
        "google glass",
        "אביזרים",
        "אייפד אייר 2 ipad air",
        "אייפד אייר 3 iPad Air",
        "אייפד אייר ipad air",
        "אייפד מיני iPad mini",
        "אייפד מיני iPad mini 2",
        "אייפד מיני iPad mini 3",
        "אייפד מיני iPad mini 4",
        "אייפד פרו iPad Pro 9.7",
        "אייפד פרו iPadPro",
        "אייפד1 iPad1",
        "אייפד2 iPad2",
        "אייפד3 iPad3",
        "אייפד4 iPad4",
        "חומרה",
        "טאבלטים",
        "מדפסות",
        "מחשב כף יד",
        "מחשב נייד",
        "מחשב שולחני",
        "מילון אלקטרוני",
        "מסכי מחשב",
        "משחקי מחשב",
        "ניווט GPS",
        "סורקים",
        "עט דיגיטלי",
        "צורבים",
        "שרתים",
        "תוכנות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "לגינה",
      id: "9",
      subCategories: [
        "ברזנטים",
        "בריכה",
        "חפצי נוי",
        "כלי עבודה",
        "מחסן",
        "מכסחת דשא",
        "ממטרות ומערכות השקיה",
        "מנגל",
        "נדנדות וערסל",
        "סוכות",
        "עצי זית עתיקים",
        "עצים ועציצים",
        "פרגולות",
        "צמחיה מלאכותית",
        "ריהוט לגינה",
        "תאורת גן",
      ],
    })
  );
  categories.push(
    new Category({
      name: "אומנות",
      id: "10",
      subCategories: [
        "בדים",
        "חפצי נוי",
        "כדים וקערות",
        "פוחלצים",
        "פוסטרים",
        "פסלים",
        "ציוד לאומנות",
        "ציורים",
        "קריסטלים",
        "תמונות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "אופנה וטיפוח",
      id: "11",
      subCategories: [
        "אקססוריז",
        "בגדים",
        "ביוטי",
        "גרביים וגרביונים",
        "חתונה",
        "כובעים, פאות ואביזרי שיער",
        "נעליים",
        "ספורט",
        "תחפושות",
        "תיקים וארנקים",
      ],
    })
  );
  categories.push(
    new Category({
      name: "אופניים",
      id: "12",
      subCategories: [
        "אופניים חשמליים",
        "הרים שיכוך מלא",
        "אופני - ילדים",
        "הרים זנב קשיח",
        'הרים 29"',
        "אביזרים",
        "אופני - ילדים",
        "אופני כביש",
        "אופני נשים",
        "אופני עיר",
        "אופני פעלולים / BMX",
        "אופניים חשמליים",
        "אופניים מיוחדים",
        "אופניים מתקפלים",
        'הרים 29"',
        "הרים זנב קשיח",
        "הרים חשמליים",
        "הרים שיכוך מלא",
        'נג"ש וטריאתלון',
        "סינגלספיד",
        "תלת אופן",
      ],
    })
  );
  categories.push(
    new Category({
      name: "אספנות",
      id: "13",
      subCategories: [
        "אוספים שונים",
        "בובות",
        "בולים,מעטפות וגלויות",
        "דגמי מכוניות",
        "חפצי נוי",
        "טלפונים",
        "כלי נגינה",
        "כלים",
        "כרטיסי חיוג טלכרד",
        "לבית",
        "מגהץ",
        "מדליות",
        "מוצרי ילדות",
        "מוצרי קוקה קולה",
        "מזוודות וקופסאות",
        "מטבעות ושטרות",
        "מכונות כתיבה",
        "מכונות תפירה",
        "מצלמות",
        "משקל",
        "סיפולוקס/סיפון",
        "עטים",
        "עיתונים ומגזינים",
        "פטיפונים וטייפיים",
        "פריטים ארכיאולוגים",
        "קומיקס",
        "רדיו",
        "ריהוט",
        "שעונים",
        "תמונות",
        "תקליטים\\ דיסקים",
      ],
    })
  );
  categories.push(
    new Category({
      name: "גראג' סייל",
      id: "14",
      subCategories: ["כללי"],
    })
  );
  categories.push(
    new Category({
      name: "יודאיקה",
      id: "15",
      subCategories: [
        "אומנות",
        "חנוכיות",
        "כלי כסף",
        "ספרים ומאמרים",
        "ציוד לבית כנסת",
        "תשמישי קדושה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "כלי נגינה",
      id: "16",
      subCategories: [
        "אביזרים נלווים",
        "אורגן",
        "אקורדיון",
        "כלי הקשה ותופים",
        "כלי מיתר",
        "כלי נשיפה",
        "מגבר",
        "ספרי תווים",
        "פסנתר",
        "קלידים",
      ],
    })
  );
  categories.push(
    new Category({
      name: "כלי נשק",
      id: "17",
      subCategories: [
        "CZ",
        "Taurus",
        "smith & Wesson",
        "אביזרים",
        "אקדח FN",
        "אקדח אויר",
        "בול",
        "ברטה",
        "גלוק",
        "הגנה עצמית",
        "וולטר",
        "זיג זאוור",
        "טנפוליו",
        "יריחו",
        "נשק קר",
        "קולט",
        "רובה אויר / איירסופט",
      ],
    })
  );
  categories.push(
    new Category({
      name: "כלי עבודה",
      id: "18",
      subCategories: [
        "גנרטורים",
        "חומרי עבודה",
        "כלי עבודה",
        "כלי עבודה לגינה",
        "כלים לנגרות",
        "כלים לעבודת מכונאות",
        "כלים לשרברבות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "כלים סניטריים",
      id: "19",
      subCategories: [
        "ארונות מטבח",
        "ברזים",
        "ג'קוזי",
        "כיורים",
        "לאמבטיה ולשירותים",
        "מקלחונים",
        "סאונה",
        "שיש",
      ],
    })
  );
  categories.push(
    new Category({
      name: "לבית",
      id: "20",
      subCategories: [
        "ארגזי אחסון",
        "בלוני גז",
        "בר מים",
        "ברזים",
        "דוד חימום",
        "הרחקת מזיקים",
        "וילונות",
        "חימום על גז",
        "חימום על סולר",
        "חלונות ותריסים",
        "חפצי נוי",
        "טאבון",
        "ידיות",
        "כיורים",
        "כלי אוכל",
        "כלי מיטה",
        "כלי עבודה",
        "כספת",
        "כריות נוי",
        "לאמבטיה ולשירותים",
        "למטבח",
        "מדרגות מתקפלות",
        "מטהרי אוויר לבית",
        "מכשירי סודה",
        "מנגל",
        "מקלחונים",
        "משקל",
        "מתקן ייבוש כלים",
        "מתקן עיתונים",
        "סולמות",
        "סורגים",
        "סכו''ם",
        "עגלת קניות",
        "עיצוב הבית ואביזרים",
        "פאנלים סולאריים",
        "פחי אשפה",
        "פרקטים",
        "קולבים",
        "קמין",
        "קרש גיהוץ",
        "ריצוף וחיפוי",
        "תמונות",
        "תנור נפט",
      ],
    })
  );
  categories.push(
    new Category({
      name: "למטייל ולמתגייס",
      id: "22",
      subCategories: [
        "אוהלים",
        "אולרים וסכינים",
        "ביגוד למטייל",
        "גזיה",
        "גלאי מתכות",
        "חרמונית",
        "כלי אוכל ובישול",
        "מזוודות ותיקים",
        "מחצלת",
        "מצפנים",
        "משקפת \\ טלסקופ",
        "נעלי טרקים וסנדלים",
        "ספרים ומפות",
        "פנסים",
        "צידניות",
        "קמפינג- כסאות ושולחנות",
        "שק שינה ומזרנים",
        "תרמילים",
      ],
    })
  );
  categories.push(
    new Category({
      name: "למסירה - הכל בחינם",
      id: "23",
      subCategories: [
        "אומנות",
        "אופניים",
        "אספנות",
        "ביגוד",
        "יודאיקה",
        "כלי נגינה",
        "כלי עבודה",
        "כלים סניטריים",
        "לבית",
        "לגינה",
        "לתינוק ולילד",
        "מוסיקה וסרטים",
        "מוצרי חשמל",
        "מחשבים וציוד נלווה",
        "מנויים וכרטיסים",
        "סטריאו",
        "סלולרי",
        "ספורט",
        "ספרות ומאמרים",
        "ציוד לעסקים",
        "ציוד לתעשייה",
        "ציוד סעודי\\ רפואי",
        "צילום",
        "קוסמטיקה",
        "ריהוט",
        "תאורה ונברשות",
        "תכשיטים",
        "תקשורת",
      ],
    })
  );
  categories.push(
    new Category({
      name: "מבנים ניידים",
      id: "25",
      subCategories: ["צימר", "קראוון", "שירותים ניידים"],
    })
  );
  categories.push(
    new Category({
      name: "מוסיקה וסרטים",
      id: "26",
      subCategories: ["CD's", "DVD", "וידאו", "קלטות", "תקליטים"],
    })
  );
  categories.push(
    new Category({
      name: "מיגון לבית ולעסק",
      id: "29",
      subCategories: [
        "אזעקה",
        "אינטרקום",
        "כספת",
        "מכשיר ציתות והאזנה",
        "מצלמות וטלוויזיה במעגל סגור",
        "סורגים",
        "ציוד כיבוי אש",
        "שער",
      ],
    })
  );
  categories.push(
    new Category({
      name: "מכשירי עיסוי",
      id: "30",
      subCategories: ["כללי"],
    })
  );
  categories.push(
    new Category({
      name: "מנויים וכרטיסים",
      id: "31",
      subCategories: [
        "הופעות מוסיקליות",
        "הצגות חנוכה",
        "הצגות תיאטרון",
        "כרטיס משחקי ספורט",
        "כרטיס קולנוע",
        "מופעי מחול וריקוד",
        "מופעים לילדים",
        "מנוי לחוגי ספורט",
        "מנוי למשחקי ספורט",
        "מנוי לקאנטרי\\ בריכה",
        "מנוי לתיאטרון",
        "מנויים לחדר כושר",
        "סטנד אפ / בידור",
        "פארקים ואטרקציות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "משחקים וצעצועים",
      id: "32",
      subCategories: ["צעצועים לבוגרים", "צעצועים לילדים"],
    })
  );
  categories.push(
    new Category({
      name: "מתלי בגדים וכביסה",
      id: "33",
      subCategories: [
        "אטבים",
        "חבל כביסה",
        "מעמד",
        "מקפל בגדים",
        "מתלה",
        "מתקן תלייה",
        "סל כביסה",
        "עגלת כביסה",
        "קולב",
      ],
    })
  );
  categories.push(
    new Category({
      name: "סטוקים",
      id: "34",
      subCategories: ["כללי"],
    })
  );
  categories.push(
    new Category({
      name: "סטריאו",
      id: "35",
      subCategories: [
        "אביזרים",
        "אייפוד iPod",
        "אקולייזר",
        "דיסקמן",
        "טייפ",
        "טייפ מנהלים",
        "מגבר",
        "מיני דיסק",
        "מערכות סטריאו",
        "מערכת קולנוע ביתית",
        "נגן דיסקים",
        "נגני mp3 / mp4",
        "פטיפון",
        "ציוד לקריוקי",
        "רדיו טייפ\\ דיסק",
        "רמקולים",
        "רסיבר",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ספרות וחומרי לימוד",
      id: "38",
      subCategories: [
        "אינצקלופדיה",
        "מאמרים",
        "מילונים",
        "סיפורת",
        "ספרות וחומרי לימוד",
        "ספרות מקצועית",
        "ספרי אומנות",
        "ספרי בישול",
        "ספרי ילדים",
        "ספרי לימוד",
        "ספרי נוער",
        "ספרי עיון ואלבומים",
        "ספרים ומאמרים",
        "ספרים ומפות",
        "שפה זרה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד לאירועים",
      id: "40",
      subCategories: [
        "אביזרי עיצוב",
        "אוהל",
        "בר",
        "חופה",
        "כיסא כלה",
        "עגלת מזון",
        "ציוד הגברה",
        "ציוד לאטרקציות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד לבית ספר",
      id: "41",
      subCategories: [
        "יומנים",
        "ילקוט",
        "לוח",
        "מחברות",
        "מילון כיס",
        "קלמר",
        "תלבושת אחידה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד לדי.ג'י. ולאולפנים",
      id: "42",
      subCategories: [
        "אביזרים",
        "כרטיס קול",
        "מיקרופון",
        "פלטות די. ג'יי",
        "פנס / מצביע לייזר",
        "ציוד הגברה",
        "ציוד לאולפנים",
        "תאורה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד להשכרה",
      id: "43",
      subCategories: [
        "ביגוד ואביזרים",
        "כלי עבודה",
        "ציוד לאירועים",
        "ציוד לעסקים",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד לעסקים",
      id: "44",
      subCategories: [
        "בובות ראווה",
        "חדר קירור",
        "טלפון שקלים",
        "כלי צורפות",
        "ליצנות וקרקס",
        "מזון ומשקאות",
        "מטבח תעשייתי",
        "מכונות קרח",
        "מכונת מזון",
        "מכונת סיגריות",
        "מכונת שתייה",
        "מכונת תפירה",
        "מקפיא",
        "מקרר",
        "משקל",
        "מתנפחים",
        "ציוד אלקטרוניקה",
        "ציוד לגני ילדים",
        "ציוד לדיג'יי ואולפנים",
        "ציוד לחדרי כושר",
        "ציוד לחנות ביגוד",
        "ציוד לחקלאות",
        "ציוד למוסך",
        "ציוד למסעדות/בתי קפה",
        "ציוד למספרה",
        "ציוד לנקיון",
        "ציוד לקליניקות ומרפאות",
        "ציוד תפירה",
        "קונדטוריות ומאפיות",
        "קופה רושמת",
        "ריהוט לעסקים",
        "תנור תעשייתי",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד לתעשייה",
      id: "45",
      subCategories: [
        "גנרטורים תעשייתים",
        "דפוס",
        "מיכלים וחביות",
        "מכולות",
        "מכונות",
        "מכונות בטון",
        "מסועים",
        "משאבות",
        "עגלות משטחים / מלגזה ידנית",
        "פיגומים",
        "ציוד כללי לתעשייה",
        "קומפרסור/מדחס",
        "רתכות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד משרדי",
      id: "46",
      subCategories: [
        "גליוטינות",
        "כלי כתיבה",
        "מגרסות",
        "מחשבונים",
        "מכונת צילום",
        "מכשירי כריכה ולמינציה",
        "מרכזיות",
        "עמדת קבלה",
        "פקס",
        "שולחן משרדי",
        "תכולת משרד",
      ],
    })
  );
  categories.push(
    new Category({
      name: "ציוד סיעודי/ רפואי",
      id: "47",
      subCategories: [
        "הליכון",
        "כסא גלגלים",
        "כסא טיפולי",
        "מד לחץ דם",
        "מוצרי ספיגה למבוגרים",
        "מחולל חמצן",
        "מיטה",
        "מיטת עיסוי",
        "מסכה",
        "מעלון",
        "עזרי שמיעה",
        "עמידון",
        "ציוד נלווה",
        "קלנועית",
      ],
    })
  );
  categories.push(
    new Category({
      name: "צילום",
      id: "48",
      subCategories: [
        "אביזרים",
        "מצלמה דיגיטלית",
        "מצלמות אקסטרים",
        "מצלמת וידאו",
        "מצלמת פילם",
        "מצלמת רחפן",
        "מצלמת רפלקס דיג'י",
        "עדשות",
      ],
    })
  );
  categories.push(
    new Category({
      name: "קורקינטים",
      id: "50",
      subCategories: [
        "אביזרים",
        "הוברבורד",
        "סגווי",
        "קורקינט",
        "קורקינט בנזין",
        "קורקינט חשמלי",
      ],
    })
  );
  categories.push(
    new Category({
      name: "שוברי זיכוי  תלושים  שונות",
      id: "52",
      subCategories: [
        "זיכויים ושוברים",
        "כרטיסי חנייה",
        "מיוחדים",
        "סדנאות",
        "קופונים",
        "קורסים",
        "תלושים ותווי שי",
      ],
    })
  );
  categories.push(
    new Category({
      name: "תאורה ונברשות",
      id: "53",
      subCategories: [
        "אביזרים",
        "אהילים",
        "בתי מנורה",
        "גופי תאורה",
        "מנורת שולחן",
        "נברשות",
        "נורות",
        "נורות ומנורות",
        "ספוטים",
        "תאורת גן",
        "תאורת לילה",
      ],
    })
  );
  categories.push(
    new Category({
      name: "תקשורת",
      id: "54",
      subCategories: [
        "אנטנות/צלחות לווין/ממירים",
        "ארונות תקשורת",
        "חבילות תקשורת",
        "מכשירי כריזה",
        "מכשירי קשר ואלחוט",
        "עזרי שמיעה",
      ],
    })
  );
  let count = 0;
  categories.forEach((category) => {
    console.log(category);
    category
      .save()
      .then((result) => {
        count++;
        if (count == categories.length) res.send("success!!!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  });
});
///////////////////////////////////////////////////

// init (isdocker, routes, db moudles)
require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/isdocker")();
// require("./startup/logging")(); 

