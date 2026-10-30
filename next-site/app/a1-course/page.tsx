import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, CircleCheck, Clock3, Headphones, MessageCircle, Mic2, Sparkles, Video } from 'lucide-react';
import A1Overview from './_components/A1Overview';
import { a1Combos, a1Faqs, a1Programs, a1Schedule } from './_data';
import styles from './A1Course.module.css';

export const metadata = {
  title: 'A1 French for Beginners — Intensive & Flex',
  description: 'Start French with A1. Compare A1 Intensive with live support ($599 CAD) and A1 Flex ($449 CAD). Same complete curriculum, three months of access.',
};

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className={styles.sectionHeading}><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{children && <p className={styles.sectionIntro}>{children}</p>}</div>;
}

function CheckoutLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={secondary ? styles.secondaryButton : styles.primaryButton}>{children}<ArrowRight size={17} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>;
}

const learning = [
  { Icon: BookOpen, title: 'Learn the language', copy: 'Grammar, sentence structure, vocabulary and essential verbs.' },
  { Icon: Mic2, title: 'Build pronunciation', copy: 'French sounds and daily pronunciation practice in your portal.' },
  { Icon: Headphones, title: 'Practise all 4 skills', copy: 'Reading, listening, speaking and writing tasks for every unit.' },
  { Icon: CircleCheck, title: 'Test your progress', copy: 'Unit-wise grammar and vocabulary tests, then your final A1 Analysis.' },
];

const comparison = [
  ['Online curriculum', 'Included', 'Included'],
  ['Live sessions', '4 per week', 'No live sessions'],
  ['Student community', 'Included', 'Not included'],
  ['Session recordings', 'Included', 'No live sessions'],
  ['Tests & assignments', 'Included', 'Included'],
  ['Best for', 'Regular guidance', 'Flexible schedules'],
  ['Price · CAD', '$599', '$449'],
];

export default function A1CoursePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="a1-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}><span>A1</span> YOUR FRENCH FOUNDATION</p>
            <h1 id="a1-title">Start French <br />the right way.<br /><span>Start with A1.</span></h1>
            <p className={styles.heroDescription}>Built for complete beginners. Learn the foundations step by step, with live support or the freedom to study at your own pace.</p>
            <div className={styles.heroFacts}><span><Clock3 size={16} aria-hidden />Around 5–6 weeks*</span><span><CalendarDays size={16} aria-hidden />3 months of access</span></div>
          </div>
          <figure className={styles.heroVideo}>
            <A1Overview />
            <figcaption><Video size={16} aria-hidden /><span>Your first step, explained by Vyom.</span><span className={styles.videoCaptionNote}>Watch the overview</span></figcaption>
          </figure>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#a1-intensive">Choose A1 Intensive <span>$599 CAD</span><ArrowDown size={16} aria-hidden /></a>
            <a className={styles.secondaryButton} href="#a1-flex">Choose A1 Flex <span>$449 CAD</span><ArrowDown size={16} aria-hidden /></a>
            <p className={styles.paceFootnote}>*Recommended with 2–3 hours of daily study. No placement test needed.</p>
          </div>
        </div>
      </section>

      {/* Sticky below the existing header on mobile, so the unchanged chatbot remains usable. */}
      <nav className={styles.mobileChoices} aria-label="Quick A1 program choices">
        <a href="#a1-intensive">Intensive <strong>$599</strong><ArrowDown size={14} aria-hidden /></a>
        <a href="#a1-flex">Flex <strong>$449</strong><ArrowDown size={14} aria-hidden /></a>
      </nav>

      <section id="course-options" className={styles.section} aria-labelledby="a1-programs-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>01 / CHOOSE YOUR SUPPORT</p>
            <h2 id="a1-programs-heading">One A1 curriculum.<br className={styles.mobileBreak} /> Two ways to learn.</h2>
            <p className={styles.sectionIntro}>Choose the A1 program that fits you. The main difference is how much live support you want.</p>
          </div>
          <div className={styles.programGrid}>
            {a1Programs.map((program) => (
              <article id={program.id} key={program.id} className={`${styles.programCard} ${program.recommended ? styles.intensiveCard : styles.flexCard}`}>
                <div className={styles.cardTop}><span className={styles.cardFormat}>{program.recommended ? 'WITH LIVE SUPPORT' : 'SELF-PACED LEARNING'}</span>{program.recommended && <span className={styles.recommended}><Sparkles size={13} aria-hidden />Most Recommended</span>}</div>
                <h3>{program.name}</h3>
                <p className={styles.tagline}>{program.tagline}</p>
                <div className={styles.price}><strong>${program.price}</strong><span>CAD <span aria-hidden>·</span> 3 months access</span></div>
                <p className={styles.programDescription}>{program.description}</p>
                <ul className={styles.checklist}>{program.essentials.map(item => <li key={item}><Check size={17} aria-hidden />{item}</li>)}</ul>
                <details className={styles.programDetails}>
                  <summary>More of what’s included<ChevronDown size={16} aria-hidden /></summary>
                  <ul className={styles.checklist}>{program.details.map(item => <li key={item}><Check size={17} aria-hidden />{item}</li>)}</ul>
                </details>
                <CheckoutLink href={program.href} secondary={!program.recommended}>Join {program.name}</CheckoutLink>
              </article>
            ))}
          </div>
          <p className={styles.sharedNote}><BookOpen size={17} aria-hidden />Both include the complete A1 curriculum, practice tasks, unit tests and final A1 Analysis.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} aria-labelledby="a1-compare-title">
        <div className={`${styles.container} ${styles.comparisonLayout}`}>
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>02 / AT A GLANCE</p><h2 id="a1-compare-title">Intensive or Flex?</h2><p className={styles.sectionIntro}>Regular guidance, or room to fit French around your day?</p><p className={styles.comparisonAdvice}>Choose <strong>Intensive</strong> for instructor interaction and accountability. Choose <strong>Flex</strong> when fixed sessions are difficult to fit in.</p></div>
          <div className={styles.comparison}>
            <div className={styles.comparisonHeader} aria-hidden><span>What’s included</span><strong>Intensive</strong><strong>Flex</strong></div>
            <dl>{comparison.map(([label, intensive, flex]) => <div className={styles.comparisonRow} key={label}><dt>{label}</dt><dd><span className="sr-only">Intensive: </span>{intensive}</dd><dd><span className="sr-only">Flex: </span>{flex}</dd></div>)}</dl>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="What you learn in A1">
        <div className={styles.container}>
          <SectionHeading eyebrow="03 / YOUR FOUNDATION" title="Everything you need to begin.">The same complete foundation, whichever format you choose.</SectionHeading>
          <div className={styles.learningGrid}>{learning.map(({Icon,title,copy},index)=><article className={styles.learningCard} key={title}><div className={styles.learningIcon}><Icon size={23} aria-hidden /><span aria-hidden>0{index+1}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <p className={styles.pronunciationNote}><Sparkles size={16} aria-hidden />The current offer also includes the dedicated pronunciation course at no extra cost, for a limited time.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.studySection}`} aria-label="Your A1 study plan">
        <div className={styles.container}>
          <div className={styles.studyHeader}><SectionHeading eyebrow="04 / A PACE YOU CAN FOLLOW" title="Your A1 study plan.">Around 5–6 weeks with 2–3 hours of daily study.</SectionHeading><span className={styles.studyBadge}><Clock3 size={18} aria-hidden />A guide, not a deadline</span></div>
          <p className={styles.studyIntro}>Start with Unit 0. Aim for roughly one core unit per week, then finish with revision and your final assessment.</p>
          <ol className={styles.studySteps}>{[1,2,3,4,5].map(unit=><li key={unit}><span>Week {unit}</span><strong>Unit {unit}</strong></li>)}<li className={styles.finalStudyStep}><span>Unit 6 + final check</span><strong>Review &amp; A1 Analysis</strong></li></ol>
          <p className={styles.studyNote}><CircleCheck size={19} aria-hidden /><span>Your <strong>3-month access</strong> gives you room for revision or interruptions. You do not need to finish in exactly five weeks.</span></p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.scheduleSection}`} aria-label="A1 Intensive live sessions">
        <div className={styles.container}>
          <details className={styles.schedule}>
            <summary><span className={styles.scheduleIcon}><CalendarDays size={24} aria-hidden /></span><span><span className={styles.eyebrow}>05 / INTENSIVE ONLY</span><h2>A1 Intensive live sessions</h2><span className={styles.scheduleSubtitle}>4 sessions per week · View the schedule</span></span><ChevronDown className={styles.disclosureIcon} size={22} aria-hidden /></summary>
            <div className={styles.scheduleContent}><p className={styles.scheduleTimezone}>All times Eastern Standard Time (EST).</p><div className={styles.scheduleGrid}>{a1Schedule.map(session=><div key={session.day}><strong>{session.day}</strong><span>{session.time}</span><small>{session.note}</small></div>)}</div><p>Can’t attend occasionally? Session recordings are available.</p></div>
          </details>
        </div>
      </section>

      <section className={`${styles.section} ${styles.comboSection}`} aria-label="A1 and A2 combo options">
        <div className={styles.container}>
          <div className={styles.comboHeader}><SectionHeading eyebrow="06 / AN OPTIONAL NEXT STEP" title="Want to continue directly into A2?">Save $100 when you register for A1 + A2 together, with no need to register again later.</SectionHeading><span className={styles.saveBadge}>SAVE $100 CAD</span></div>
          <div className={styles.comboGrid}>{a1Combos.map(combo=><article className={styles.comboCard} key={combo.name}><div><h3>{combo.name} Combo</h3><p><strong>${combo.price}</strong> CAD</p></div><CheckoutLink href={combo.href} secondary>Choose {combo.name.includes('Intensive')?'Intensive':'Flex'} Combo</CheckoutLink></article>)}</div>
          <details className={styles.comboTiming}><summary>When does my A2 access start?<ChevronDown size={17} aria-hidden /></summary><p>A1 access lasts 3 months. Your 3 months of A2 access begin <strong>right after you take your A1 test, or when your A1 access ends — whichever comes first.</strong> The two access periods can overlap if you take the A1 test early.</p></details>
        </div>
      </section>

      <section className={styles.section} aria-label="What happens after A1">
        <div className={styles.container}>
          <SectionHeading eyebrow="07 / THE BIGGER PICTURE" title="Where A1 takes you next.">Build your foundation first. Then move towards your TEF/TCF goals, one level at a time.</SectionHeading>
          <ol className={styles.journey}>{[['A1','Foundation'],['A2','Build speaking & grammar'],['B1','Exam Prep Phase 1'],['B2','Final Exam Preparation']].map(([level,label],index)=><li key={level} className={index===0?styles.journeyCurrent:undefined}><span className={styles.journeyLevel}>{level}</span><span><strong>{label}</strong>{index===0&&<small>You start here</small>}</span>{index<3&&<ArrowRight className={styles.journeyArrow} size={20} aria-hidden />}</li>)}</ol>
          <p className={styles.journeyNote}>Finish A1 with your final A1 Analysis so Frenchify can review your foundation before you move to A2.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} aria-label="A1 frequently asked questions">
        <div className={`${styles.container} ${styles.faqLayout}`}>
          <SectionHeading eyebrow="08 / A FEW GOOD QUESTIONS" title="Before you start.">Clear answers to help you choose.</SectionHeading>
          <div className={styles.faqs}>{a1Faqs.map(faq=><details key={faq.q}><summary>{faq.q}<ChevronDown size={18} aria-hidden /></summary><p>{faq.a}</p></details>)}<p className={styles.faqContact}>Need help with access? <a href="/a1-renewal/">See A1 renewal options</a> or <a href="/contact/">contact Frenchify</a>.</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.finalSection}`} aria-label="Register for A1">
        <div className={styles.container}>
          <p className={styles.eyebrow}>YOUR FIRST STEP STARTS HERE</p><h2>Ready to start A1?</h2><p>Choose your support. Start building your French.</p>
          <div className={styles.finalChoices}>{a1Programs.map(program=><div key={program.id}><span>{program.name}<strong>${program.price} <small>CAD</small></strong></span><CheckoutLink href={program.href} secondary={!program.recommended}>Join {program.shortName}</CheckoutLink></div>)}</div>
          <p className={styles.finalContact}><MessageCircle size={17} aria-hidden />Not sure? <a href="/contact/">Contact Frenchify</a></p>
        </div>
      </section>
    </div>
  );
}
