import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, CircleCheck, Clock3, Headphones, MessageCircle, Mic2, Sparkles, Volume2 } from 'lucide-react';
import { a2Comparison, a2Faqs, a2Programs, a2Schedule, speakingAssignmentCount, speakingOptionsHref, startA2Checkout } from './_data';
import styles from './A2Course.module.css';

export const metadata = {
  title: 'A2 French — Build Speaking Confidence | Intensive & Flex',
  description: 'Build stronger French and speaking confidence before B1. Compare A2 Intensive ($599 CAD) and A2 Flex ($499 CAD), with the same curriculum and three months of access.',
};

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>
      {children && <p className={styles.sectionIntro}>{children}</p>}
    </div>
  );
}

function CheckoutLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={secondary ? styles.secondaryButton : styles.primaryButton}>
      {children}<ArrowRight size={17} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const learning = [
  { Icon: BookOpen, title: 'Build the language', copy: 'A2 grammar, vocabulary and sentence structures you can use in everyday French.' },
  { Icon: Headphones, title: 'Practise all 4 skills', copy: 'Reading, listening, writing and speaking tasks alongside your lessons.' },
  { Icon: Mic2, title: 'Build speaking confidence', copy: 'Pronunciation, on-the-spot sentence formation and longer responses.' },
  { Icon: CircleCheck, title: 'Prepare for B1', copy: 'Unit tests, grammar and vocabulary checks, plus A2-to-B1 transition work.' },
];

const speakingBenefits = [
  { Icon: Volume2, title: 'Clearer pronunciation', copy: 'Practise French sounds and work on recurring pronunciation mistakes.' },
  { Icon: MessageCircle, title: 'Your own sentences', copy: 'Form ideas on the spot, without relying on memorized scripts.' },
  { Icon: Mic2, title: 'A steadier speaking flow', copy: 'Build longer responses and get comfortable speaking with fewer pauses.' },
];

export default function A2CoursePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="a2-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}><span>A2</span> START USING YOUR FRENCH</p>
            <h1 id="a2-title">Speak French.<br /><span>With more confidence.</span></h1>
            <p className={styles.heroDescription}>Build on your A1 foundation. Strengthen your grammar, pronunciation and spontaneous speaking before B1 and exam-focused preparation.</p>
            <div className={styles.heroFacts}>
              <span><Clock3 size={16} aria-hidden />1.5–2 months to complete</span>
              <span><CalendarDays size={16} aria-hidden />3 months of access</span>
              <span><BookOpen size={16} aria-hidden />2–3 hours of daily study</span>
            </div>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#a2-intensive">Choose A2 Intensive <span>$599 CAD</span><ArrowDown size={16} aria-hidden /></a>
            <a className={styles.secondaryButton} href="#a2-flex">Choose A2 Flex <span>$499 CAD</span><ArrowDown size={16} aria-hidden /></a>
            <a className={styles.readinessShortcut} href="#start-a2-test">Not sure you’re ready for A2? <ArrowDown size={13} aria-hidden /></a>
          </div>
        </div>
      </section>

      {/* Keep the existing chatbot accessible by putting mobile choices below the header. */}
      <nav className={styles.mobileChoices} aria-label="Quick A2 program choices">
        <a href="#a2-intensive">Intensive <strong>$599</strong><ArrowDown size={14} aria-hidden /></a>
        <a href="#a2-flex">Flex <strong>$499</strong><ArrowDown size={14} aria-hidden /></a>
      </nav>

      <section id="course-options" className={styles.section} aria-labelledby="a2-programs-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>01 / CHOOSE YOUR SUPPORT</p>
            <h2 id="a2-programs-heading">One A2 curriculum.<br className={styles.mobileBreak} /> Two ways to learn.</h2>
            <p className={styles.sectionIntro}>Both include the same complete A2 curriculum. Choose how much live support and scheduling flexibility you need.</p>
          </div>
          <div className={styles.programGrid}>
            {a2Programs.map(program => (
              <article id={program.id} key={program.id} className={`${styles.programCard} ${program.recommended ? styles.intensiveCard : styles.flexCard}`}>
                <div className={styles.cardTop}>
                  <span className={styles.cardFormat}>{program.recommended ? 'WITH LIVE SUPPORT' : 'SELF-PACED LEARNING'}</span>
                  {program.recommended && <span className={styles.recommended}><Sparkles size={13} aria-hidden />Most Recommended</span>}
                </div>
                <h3>{program.name}</h3><p className={styles.tagline}>{program.tagline}</p>
                <div className={styles.price}><strong>${program.price}</strong><span>CAD · 3 months access</span></div>
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
          <p className={styles.sharedNote}><BookOpen size={17} aria-hidden />Both include speaking assignments and A2 → B1 preparation. One-on-one sessions are optional and paid separately.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} aria-labelledby="a2-compare-title">
        <div className={`${styles.container} ${styles.comparisonLayout}`}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>02 / AT A GLANCE</p><h2 id="a2-compare-title">Intensive or Flex?</h2>
            <p className={styles.sectionIntro}>The same learning system. A different level of live support.</p>
            <p className={styles.comparisonAdvice}>Choose <strong>Intensive</strong> for regular guidance and accountability. Choose <strong>Flex</strong> when fixed weekly sessions are difficult to fit in.</p>
          </div>
          <div className={styles.comparison}>
            <div className={styles.comparisonHeader} aria-hidden><span>What’s included</span><strong>Intensive</strong><strong>Flex</strong></div>
            <dl>{a2Comparison.map(([label, intensive, flex]) => (
              <div className={styles.comparisonRow} key={label}>
                <dt>{label}</dt><dd><span className="sr-only">Intensive: </span>{intensive}</dd><dd><span className="sr-only">Flex: </span>{flex}</dd>
              </div>
            ))}</dl>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.speakingSection}`} aria-label="Why speaking matters at A2">
        <div className={styles.container}>
          <div className={styles.speakingHeader}>
            <SectionHeading eyebrow="03 / FROM KNOWING TO SPEAKING" title="Build real speaking confidence.">
              Turn your ideas into French. Practise clear pronunciation, form your own sentences and build the confidence to keep speaking.
            </SectionHeading>
            <div className={styles.assignmentCount}><strong>{speakingAssignmentCount}</strong><span>structured speaking <br />assignments</span><small>Included in both programs</small></div>
          </div>
          <div className={styles.speakingGrid}>{speakingBenefits.map(({ Icon, title, copy }, index) => (
            <article className={styles.speakingCard} key={title}>
              <span className={styles.speakingIcon}><Icon size={24} aria-hidden /></span>
              <div><span className={styles.speakingStep}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}</div>
          <div className={styles.speakingBridge}><span>A2 <ArrowRight size={16} aria-hidden /> B1</span><p>Your final speaking work helps you prepare for the more exam-focused speaking you’ll meet at B1.</p></div>
        </div>
      </section>

      <section className={styles.section} aria-label="What you learn in A2">
        <div className={styles.container}>
          <SectionHeading eyebrow="04 / YOUR A2 FOUNDATION" title="Learn it. Practise it. Put it to use.">Four connected parts of your A2 learning.</SectionHeading>
          <div className={styles.learningGrid}>{learning.map(({ Icon, title, copy }, index) => (
            <article className={styles.learningCard} key={title}>
              <div className={styles.learningIcon}><Icon size={23} aria-hidden /><span aria-hidden>0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.studySection}`} aria-label="Your A2 study plan">
        <div className={styles.container}>
          <div className={styles.studyHeader}>
            <SectionHeading eyebrow="05 / A PACE YOU CAN FOLLOW" title="Your A2 study plan.">Around 6–8 weeks with 2–3 hours of daily study.</SectionHeading>
            <span className={styles.studyBadge}><Clock3 size={18} aria-hidden />A guide, not a deadline</span>
          </div>
          <p className={styles.studyIntro}>Work through the units with speaking practice throughout. Progress means using the language, as well as completing the lessons.</p>
          <ol className={`${styles.studySteps} ${styles.a2StudySteps}`}>
            {[1, 2, 3, 4, 5, 6].map(unit => <li key={unit}><strong>Unit {unit}</strong><span>Learn + practise</span><small><Mic2 size={12} aria-hidden />Speaking practice</small></li>)}
            <li className={styles.finalStudyStep}><strong>A2 → B1</strong><span>Transition work</span><small><Mic2 size={12} aria-hidden />Connect your skills</small></li>
            <li className={styles.finalStudyStep}><strong>Final readiness</strong><span>Review + skills check</span><small><CircleCheck size={12} aria-hidden />Prepare for your next step</small></li>
          </ol>
          <p className={styles.studyNote}><CircleCheck size={19} aria-hidden /><span>Your <strong>3-month access</strong> gives you extra time for revision and flexibility. You do not need to take the full three months to complete A2.</span></p>
        </div>
      </section>

      <section className={styles.section} aria-label="Optional one-on-one speaking">
        <div className={`${styles.container} ${styles.oneToOne}`}>
          <div>
            <SectionHeading eyebrow="06 / OPTIONAL · PAID SEPARATELY" title="Want more personal speaking feedback?">One-on-one sessions are available to active Frenchify students from A2 onward.</SectionHeading>
            <div className={styles.sessionHighlights}><span><Clock3 size={16} aria-hidden />30 or 50 minute options</span><span><CalendarDays size={16} aria-hidden />Flexible mentor booking</span><span><MessageCircle size={16} aria-hidden />Personal feedback</span></div>
            <p className={styles.optionalNote}>Work on pronunciation, flow, sentence formation and confidence. These sessions are not required to complete A2.</p>
          </div>
          <div className={styles.sessionAction}><a className={styles.secondaryButton} href={speakingOptionsHref}>View One-on-One Speaking Options<ArrowRight size={17} aria-hidden /></a><p>Session lengths and availability vary by mentor. Recommended after around 60% of A2 and its speaking work.</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.scheduleSection}`} aria-label="A2 Intensive live sessions">
        <div className={styles.container}>
          <details className={styles.schedule}>
            <summary><span className={styles.scheduleIcon}><CalendarDays size={24} aria-hidden /></span><span><span className={styles.eyebrow}>07 / INTENSIVE ONLY</span><h2>A2 Intensive live sessions</h2><span className={styles.scheduleSubtitle}>4 sessions per week · View the schedule</span></span><ChevronDown className={styles.disclosureIcon} size={22} aria-hidden /></summary>
            <div className={styles.scheduleContent}>
              <p className={styles.scheduleTimezone}>All times Eastern Standard Time (EST).</p>
              <div className={styles.scheduleGrid}>{a2Schedule.map(session => <div key={session.day}><strong>{session.day}</strong><span>{session.time}</span><small>{session.note}</small></div>)}</div>
              <p>Can’t attend occasionally? Session recordings are available.</p>
            </div>
          </details>
        </div>
      </section>

      <section id="start-a2-test" className={`${styles.section} ${styles.readinessSection}`} aria-labelledby="a2-readiness-title">
        <div className={`${styles.container} ${styles.readinessLayout}`}>
          <div>
            <p className={styles.eyebrow}>08 / CHECK YOUR A1 FOUNDATION</p><h2 id="a2-readiness-title">Not sure you’re ready for A2?</h2>
            <p className={styles.sectionIntro}>If you studied A1 elsewhere or are unsure about your foundation, complete the Test to Start A2 before registering.</p>
          </div>
          <div className={styles.readinessAction}><span className={styles.testLabel}>TEST TO START A2</span><CheckoutLink href={startA2Checkout}>Book Test to Start A2</CheckoutLink><p>The checkout shows the current fee. Your test fee can be credited toward the course if you register within 2 days of your results.</p></div>
        </div>
      </section>

      <section className={styles.section} aria-label="Why students choose Frenchify">
        <div className={styles.container}>
          <SectionHeading eyebrow="09 / LEARN WITH FRENCHIFY" title="A clear path. Practical support." />
          <div className={styles.whyGrid}>
            <article><BookOpen size={22} aria-hidden /><h3>A structured A1 → B2 path</h3><p>Know what to work on now and what comes next.</p></article>
            <article><Mic2 size={22} aria-hidden /><h3>Speaking introduced early</h3><p>Build the habit before exam-focused preparation.</p></article>
            <article><MessageCircle size={22} aria-hidden /><h3>Real exam experience</h3><p>Learn with instructors who have taken the TEF exam.</p></article>
            <article><CircleCheck size={22} aria-hidden /><h3>Real student experiences</h3><p>Explore results and stories from Frenchify students.</p><a href="/results-page/">View Student Results<ArrowRight size={14} aria-hidden /></a></article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.journeySection}`} aria-label="What happens after A2">
        <div className={styles.container}>
          <SectionHeading eyebrow="10 / YOUR NEXT STEPS" title="Where A2 takes you next.">Build the language and speaking foundation. Then move into exam-focused preparation.</SectionHeading>
          <ol className={`${styles.journey} ${styles.a2Journey}`}>{[['A2', 'Build language + speaking'], ['B1', 'Exam Prep Phase 1'], ['B2', 'Final Exam Preparation']].map(([level, label], index) => (
            <li key={level} className={index === 0 ? styles.journeyCurrent : undefined}><span className={styles.journeyLevel}>{level}</span><span><strong>{label}</strong>{index === 0 && <small>You are here</small>}</span>{index < 2 && <ArrowRight className={styles.journeyArrow} size={20} aria-hidden />}</li>
          ))}</ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} aria-label="A2 frequently asked questions">
        <div className={`${styles.container} ${styles.faqLayout}`}>
          <SectionHeading eyebrow="11 / BEFORE YOU START" title="A few good questions.">Clear answers about support, speaking and your next step.</SectionHeading>
          <div className={styles.faqs}>{a2Faqs.map(faq => <details key={faq.q}><summary>{faq.q}<ChevronDown size={18} aria-hidden /></summary><p>{faq.a}</p></details>)}<p className={styles.faqContact}>Still unsure? <a href="/contact/">Contact Frenchify</a> for guidance.</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.finalSection}`} aria-label="Register for A2">
        <div className={styles.container}>
          <p className={styles.eyebrow}>YOUR NEXT STEP IN FRENCH</p><h2>Ready to start A2?</h2><p>Choose your support. Start building your speaking confidence.</p>
          <div className={styles.finalChoices}>{a2Programs.map(program => <div key={program.id}><span>{program.name}<strong>${program.price} <small>CAD</small></strong></span><CheckoutLink href={program.href} secondary={!program.recommended}>Join {program.shortName}</CheckoutLink></div>)}</div>
          <p className={styles.finalTest}>Not sure you’re ready? <a href={startA2Checkout} target="_blank" rel="noopener noreferrer">Book Test to Start A2<span className="sr-only"> (opens in a new tab)</span><ArrowRight size={14} aria-hidden /></a></p>
          <p className={styles.finalContact}><MessageCircle size={17} aria-hidden />Need help choosing? <a href="/contact/">Contact Frenchify</a></p>
        </div>
      </section>
    </div>
  );
}
