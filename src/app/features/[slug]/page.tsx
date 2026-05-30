import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { C } from '../../../lib/tokens';

// ======================
// ARTICLE DATA
// ======================

const articles: Record<string, { title: string; subtitle: string; paragraphs: string[] }> = {
  'personalization': {
    title: 'התאמה אישית',
    subtitle: 'כל אדם הוא עולם ומלואו',
    paragraphs: [
      'כל אדם הוא עולם ומלואו, ולכן כל תהליך טיפולי במרכז "כנפיים לעוף" נבנה מן היסוד סביב האדם הספציפי שעומד בפנינו. לפני שנקבע כיוון עבודה, מתקיימת שיחת אבחון מעמיקה שבה לומדים את האישיות, ההיסטוריה, הצרכים ומטרות הטיפול.',
      'אנו מאמינים כי שיטה אחת אינה מתאימה לכולם. לכן, כל מפגש מותאם לקצב ההתפתחות של המטופל, לשפה שאיתה הוא מתחבר, ולכלים שמדברים אליו בצורה הנכונה ביותר. אנו משלבים מגוון גישות טיפוליות מוכחות, ובוחרים מביניהן בהתאם לצרכים המדויקים של כל מקרה.',
      'התאמה אישית אינה רק שאלה של שיטה, אלא של עמדה. היא מבטאת את ההכרה שכל אדם נושא בתוכו דרך ייחודית להחלמה, לצמיחה ולשינוי. תפקידנו לזהות את הדרך הזו, לבנות עליה, ולתמוך בה לאורך כל התהליך. כאשר המטופל מרגיש שהטיפול "מדבר אליו" ולא רק עוסק בו, נוצרת אמונה עמוקה בתהליך, ומשם כל שינוי אפשרי.',
    ],
  },
  'safe-space': {
    title: 'מרחב בטוח',
    subtitle: 'ביטחון הוא הבסיס לכל שינוי אמיתי',
    paragraphs: [
      'אחד היסודות החשובים ביותר של תהליך טיפולי אפקטיבי הוא תחושת הביטחון. כאשר אדם מרגיש בטוח, הוא יכול להיפתח, לחשוף, לעבד, ולעסוק בשינוי אמיתי. במרכז "כנפיים לעוף" פיתחנו סביבה שמזמינה בדיוק זאת.',
      'המרחב הפיזי עוצב בקפידה כדי לשדר רגיעה ותחושת בית. אך מרחב בטוח אמיתי נבנה מתוך עמדת המטפל, ולא רק מהריהוט. הגישה שלנו היא נטולת שיפוט, מקבלת ומכילה. כל תחושה, כל מחשבה, כל קושי שמגיע לחדר הטיפולים מתקבל בכבוד ובחמלה.',
      'כאן לא צריך להיות מושלם, להצטדק, או להסביר. אפשר להיות בדיוק כפי שאתה, ולדעת שזה מספיק. האווירה שאנחנו יוצרים מאפשרת פגיעות, שהיא מנוע השינוי העמוק ביותר. מתוך מקום של קבלה ואמון נבנית היכולת להתרחב, לצמוח, ולגלות את הכוחות שתמיד היו שם.',
    ],
  },
  'parent-involvement': {
    title: 'שילוב הורים',
    subtitle: 'ההורים הם שותפים חיוניים לתהליך',
    paragraphs: [
      'כאשר מדובר בטיפול בילדים ובני נוער, ההורים הם שותפים חיוניים לתהליך. במרכז "כנפיים לעוף" מאמינים שהשפעתו של הטיפול מתעצמת כשהסביבה הביתית מוכנה, מודעת ותומכת.',
      'לאחר הסכמת המטופל, ובאופן שמכבד את גבולות פרטיותו, אנחנו מזמינים את ההורים להיות חלק פעיל ומשמעותי. זה יכול להתבטא בשיחות אישיות עם ההורים, בהדרכת הורים ממוקדת, ובמסירת כלים מעשיים לשימוש בבית שמחזקים ומיישמים את מה שנבנה בחדר הטיפולים.',
      'ילד שמקבל טיפול ומגיע הביתה לסביבה מחזקת ואמפתית מגלה שהמסרים הטיפוליים נוגעים בו מכל כיוון. שיתוף ההורים אינו פוגע בעצמאות המטופל, אלא מחזק אותה. בניית שפה משותפת בין ילד לבין הוריו היא אחת התרומות הגדולות שיכול להעניק תהליך טיפולי מעמיק.',
    ],
  },
  'focused-processes': {
    title: 'תהליכים ממוקדים',
    subtitle: 'עבודה שיטתית עם כיוון ברור',
    paragraphs: [
      'טיפול אפקטיבי אינו רק קשוב ואמפתי, הוא גם ממוקד ושיטתי. במרכז "כנפיים לעוף" מאמינים בשילוב בין חום אנושי לבין עבודה מכוונת תוצאות ומדידת התקדמות.',
      'בתחילת כל תהליך אנו מגדירים יחד עם המטופל ומשפחתו מטרות ברורות וניתנות להשגה. הן נבחנות מחדש לאורך הדרך ומותאמות לפי ההתפתחות האישית. כך נוצרת תחושת כיוון ומשמעות לכל פגישה.',
      'עבודה ממוקדת אינה מנוגדת לגמישות. דווקא מפני שיש מסגרת ברורה, המטפל יכול להיות נוכח לחלוטין ולהגיב לצמיחה בזמן אמת. היעדים מותאמים לפי הצורך, ולעולם לא הופכים למחסום שמגביל את הטיפול. זו עבודה שמכבדת את הזמן של המטופל ואת מחויבותו, ומחזירה לו תחושת שליטה ויכולת.',
    ],
  },
  'discretion': {
    title: 'דיסקרטיות',
    subtitle: 'הפרטיות שלך היא ערך יסוד',
    paragraphs: [
      'הצעד הראשון לקראת טיפול דורש אומץ. לפנות, לשתף מה שכואב, לבקש עזרה, הם מעשים שדורשים אמון עמוק. במרכז "כנפיים לעוף" מקדישים מחויבות גבוהה לשמירה על פרטיות כל מטופל ומשפחתו.',
      'כל המידע שמשותף בחדר הטיפולים נשמר בסוד מלא. איננו חולקים פרטים עם גורמים חיצוניים אלא לפי חוק, ובאישור מלא של המטופל. הרשומות הטיפוליות שמורות בנפרד ומאובטחות. תכתובות ושיחות מתבצעות בערוצים מוגנים.',
      'אנו מבינים שהחשש מחשיפה הוא אחד המחסומים הגדולים בפני פנייה לעזרה. לכן חשוב לנו להדגיש: כל פנייה למרכז מטופלת באדיבות, בכבוד ובשיקול דעת. שמירה על הפרטיות אינה רק חובה חוקית, היא ביטוי לערכים שמונחים ביסוד הגישה הטיפולית שלנו.',
    ],
  },
};

// ======================
// METADATA
// ======================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: 'כנפיים לעוף' };
  return {
    title: `${article.title} | כנפיים לעוף`,
    description: article.paragraphs[0].slice(0, 160),
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

// ======================
// PAGE COMPONENT
// ======================

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: C.cream, color: C.textDark }}
      >
        <p className="text-2xl font-light mb-6" style={{ color: C.textMid }}>
          הדף לא נמצא
        </p>
        <Link href="/" className="text-sm font-medium underline" style={{ color: C.rose }}>
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.textDark }}>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: 'rgba(240,253,250,0.97)', borderColor: C.borderLight }}
      >
        <div className="max-w-4xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={168}
              height={56}
              className="h-14 w-auto object-contain"
              style={{ maxWidth: 168, mixBlendMode: 'multiply' }}
              priority
            />
          </Link>
          {/* Fix 12: back navigation uses ← */}
          <Link
            href="/#approach"
            className="text-sm font-light transition-colors hover:text-[#2DD4BF]"
            style={{ color: C.textMid }}
          >
            ← חזרה לגישה שלי
          </Link>
        </div>
      </header>

      {/* ARTICLE */}
      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-10 justify-end" style={{ color: C.textLight }} aria-label="נתיב ניווט">
          <Link href="/" className="hover:underline" style={{ color: C.rose }}>בית</Link>
          <span>/</span>
          <Link href="/#approach" className="hover:underline" style={{ color: C.rose }}>הגישה שלי</Link>
          <span>/</span>
          <span>{article.title}</span>
        </nav>

        {/* Accent rule */}
        <div
          className="w-16 h-0.5 mb-5 mr-auto"
          style={{ background: `linear-gradient(to left, ${C.rose}66, ${C.rose})` }}
        />

        <p className="text-sm font-semibold tracking-[0.2em] mb-3 text-right" style={{ color: C.rose }}>
          מה מייחד את המרכז
        </p>

        <h1
          className="font-display text-5xl md:text-6xl font-light leading-tight tracking-tighter text-right mb-4"
          style={{ color: C.textDark }}
        >
          {article.title}
        </h1>

        <p className="text-xl font-light leading-relaxed text-right mb-12" style={{ color: C.textMid }}>
          {article.subtitle}
        </p>

        {/* Article body */}
        <div className="space-y-6 text-right">
          {article.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-[1.1rem] font-light leading-[1.9] text-right"
              style={{ color: C.textMid }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 pt-10 border-t text-right" style={{ borderColor: C.border }}>
          <p className="text-sm font-light mb-5" style={{ color: C.textMid }}>
            מעוניינים לשמוע עוד או לתאם שיחת היכרות?
          </p>
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <Link
              href="/#contact"
              className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
              style={{ background: C.plum, boxShadow: '0 8px 30px rgba(19,78,74,0.12)' }}
            >
              לתיאום שיחת היכרות
            </Link>
            {/* Fix 12: back = ← */}
            <Link
              href="/#approach"
              className="inline-block px-6 py-3.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:-translate-y-1 hover:border-[#134E4A]"
              style={{ borderColor: C.border, color: C.textMid }}
            >
              ← חזרה לגישה שלי
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10" style={{ backgroundColor: C.plum, color: 'rgba(255,255,255,0.65)' }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-right">
          <Link href="/" className="flex items-center gap-3" aria-label="כנפיים לעוף — דף הבית">
            <Image
              src="/logo.jpg"
              alt="כנפיים לעוף"
              width={144}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ maxWidth: 144, mixBlendMode: 'screen', opacity: 0.85 }}
            />
          </Link>
          <div className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            כל הזכויות שמורות &copy; 2025 {/* Update annually */}
          </div>
        </div>
      </footer>
    </div>
  );
}
