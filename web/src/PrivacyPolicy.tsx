import { useEffect } from 'react'

const whatsappUrl = 'https://wa.me/972524398419'

const policySections = [
  {
    title: 'איזה מידע נאסף בטפסים',
    content: 'בעת השארת פרטים באתר נאספים הפרטים שמסרת מרצונך, ובהם שם פרטי, שם משפחה, כתובת דואר אלקטרוני ומספר טלפון. אנו מבקשים שלא למסור מידע שאינו נחוץ לצורך הפנייה.',
  },
  {
    title: 'מטרת איסוף המידע',
    content: 'המידע משמש כדי לטפל בפנייה, למסור פרטים על הטיול הרלוונטי, לבדוק התאמה ולהעניק שירות בקשר לטיולים ולפעילויות של Talya Dahan Travel. לא נעשה במידע שימוש למטרה שאינה קשורה לפנייה ללא הסכמה או בסיס חוקי מתאים.',
  },
  {
    title: 'יצירת קשר עם המשתמש',
    content: 'בהשארת פרטים באתר ניתנת לנו אפשרות לחזור אלייך בטלפון, בדואר אלקטרוני או ב־WhatsApp בנוגע לפנייה ולטיול שהתעניינת בו. ניתן לבקש בכל עת להפסיק לקבל פניות שאינן נדרשות להמשך טיפול בבקשה קיימת.',
  },
  {
    title: 'שמירת המידע',
    content: 'המידע יישמר רק למשך הזמן הדרוש לטיפול בפנייה, למתן השירות, לניהול הקשר ולמילוי חובות על פי דין. כאשר אין עוד צורך מוצדק בשמירתו, הוא יימחק או יצומצם בהתאם לאפשרויות הטכניות ולדרישות הדין.',
  },
  {
    title: 'מסירת מידע לצדדים שלישיים',
    content: 'מידע יועבר לצדדים שלישיים רק כאשר הדבר נדרש לצורך מתן השירות, כגון ספקי תקשורת, אחסון או תפעול, ורק במידה הנחוצה לכך. מידע עשוי להימסר גם כאשר קיימת חובה חוקית, דרישה של רשות מוסמכת או צורך בהגנה על זכויות משפטיות.',
  },
  {
    title: 'Cookies וכלי מדידה',
    content: 'נכון למועד עדכון מדיניות זו, האתר אינו מפעיל כלי analytics או Cookies ייעודיים למעקב. אם יתווספו בעתיד כלי מדידה, פרסום או Cookies שאינם הכרחיים להפעלת האתר, המדיניות תעודכן ותינתן הודעה או אפשרות בחירה כנדרש.',
  },
  {
    title: 'קישורים ושירותים של צדדים שלישיים',
    content: 'האתר כולל קישורים לשירותים חיצוניים, ובהם WhatsApp ורשתות חברתיות. מעבר לשירות חיצוני כפוף למדיניות הפרטיות ולתנאי השימוש של אותו שירות, ו־Talya Dahan Travel אינה שולטת באופן שבו הוא אוסף או מעבד מידע.',
  },
  {
    title: 'זכויות לעיון, תיקון ומחיקה',
    content: 'ניתן לפנות אלינו כדי לבקש לעיין במידע האישי המוחזק על אודותייך, לתקן מידע שאינו מדויק או מעודכן, או לבקש את מחיקתו, בכפוף להוראות הדין ולמידע שאנו נדרשים לשמור. לצורך הגנה על פרטיותך, ייתכן שנבקש פרטים סבירים לאימות זהותך.',
  },
  {
    title: 'אבטחת מידע',
    content: 'אנו נוקטים אמצעים סבירים ומקובלים לצמצום הסיכון לגישה, שימוש, שינוי או מסירה בלתי מורשים של מידע. עם זאת, אין מערכת מקוונת החסינה לחלוטין, ולכן לא ניתן להבטיח הגנה מוחלטת מפני כל סיכון.',
  },
  {
    title: 'עדכונים למדיניות',
    content: 'אנו רשאים לעדכן מדיניות זו מעת לעת בעקבות שינויים באתר, בשירותים או בדרישות הדין. הנוסח המעודכן יפורסם בעמוד זה, ותאריך העדכון האחרון יופיע בראשו.',
  },
]

function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'מדיניות פרטיות | Talya Dahan Travel'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div className="privacy-page" dir="rtl">
      <a className="skip-link" href="#privacy-main">דלגי לתוכן</a>

      <header className="privacy-header">
        <div className="privacy-header__inner content-container">
          <a className="privacy-brand" href="/" aria-label="Talya Dahan Travel — חזרה לעמוד הראשי">
            <img src="/assets/logo.jpeg" alt="" />
            <span><strong>Talya Dahan Travel</strong><small>מסעות בוטיק בקבוצה</small></span>
          </a>
          <a className="privacy-back-link" href="/"><span aria-hidden="true">←</span> חזרה לעמוד הטיול</a>
        </div>
      </header>

      <main id="privacy-main" className="privacy-main">
        <section className="privacy-hero" aria-labelledby="privacy-title">
          <div className="privacy-hero__inner content-container">
            <p className="section-eyebrow">הפרטיות שלך חשובה לנו</p>
            <h1 id="privacy-title">מדיניות פרטיות</h1>
            <p>מדיניות זו מסבירה איזה מידע נאסף באתר Talya Dahan Travel, כיצד אנו משתמשים בו ומהן האפשרויות העומדות לרשותך בנוגע למידע האישי שלך.</p>
            <small>עדכון אחרון: 11 באוגוסט 2026</small>
          </div>
        </section>

        <div className="privacy-content content-container">
          <div className="privacy-intro">
            <p>השימוש באתר והשארת הפרטים נעשים מרצונך. מסירת הפרטים בטופס נועדה לאפשר לנו לחזור אלייך ולתת מענה אישי בנוגע לטיול.</p>
          </div>

          <div className="privacy-sections">
            {policySections.map((section, index) => (
              <section key={section.title} aria-labelledby={`privacy-section-${index}`}>
                <h2 id={`privacy-section-${index}`}>{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}

            <section className="privacy-contact" aria-labelledby="privacy-contact-title">
              <h2 id="privacy-contact-title">פרטי יצירת קשר</h2>
              <p>לשאלות על מדיניות הפרטיות או לבקשה בנוגע למידע האישי שלך, אפשר לפנות ל־Talya Dahan Travel באמצעות WhatsApp או בטלפון.</p>
              <a className="privacy-contact__whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="פנייה ב־WhatsApp במספר 052-439-8419">
                פנייה ב־WhatsApp
              </a>
            </section>

            <div className="privacy-closing-actions">
              <a className="primary-button privacy-main__back" href="/"><span aria-hidden="true">←</span> חזרה לעמוד הטיול</a>
            </div>
          </div>
        </div>
      </main>

      <footer className="privacy-footer">
        <div className="content-container"><p>© 2026 Talya Dahan Travel · כל הזכויות שמורות</p><a href="/">חזרה לעמוד הראשי</a></div>
      </footer>
    </div>
  )
}

export default PrivacyPolicy
