import styles from "./page.module.scss";

export default function About() {
  return (
    <main className={styles.about}>
      <div className={styles.aboutContent}>
        <p className={styles.aboutTitle}>ASTRO</p>
        <div className={styles.aboutBlock}>
          <p className={styles.aboutSubtitle}>World of Cinema</p>
          <p className={styles.aboutText}>
            We created this site for everyone who loves movies. Here, you’ll
            find previews of the most exciting films—from timeless classics to
            the latest releases. No matter your genre or mood, there’s something
            for everyone.
          </p>
        </div>
        <div className={styles.aboutBlock}>
          <p className={styles.aboutSubtitle}>Easy Search</p>
          <p className={styles.aboutText}>
            Not sure what to watch? We’ve got you covered! Browse short
            descriptions, get a feel for the movie’s atmosphere, and pick the
            perfect film. We’ve gathered the best selections to make your choice
            easy.
          </p>
        </div>
        <div className={styles.aboutBlock}>
          <p className={styles.aboutSubtitle}>For Every Mood</p>
          <p className={styles.aboutText}>
            Love action-packed blockbusters, touching dramas, or spine-chilling
            horror? We have films for every mood and occasion. Just choose a
            category and start watching!
          </p>
        </div>
        <div className={styles.aboutBlock}>
          <p className={styles.aboutSubtitle}>Simplicity</p>
          <p className={styles.aboutText}>
            We value your time, so we made the site as user-friendly as
            possible. No unnecessary details—just clear and concise previews to
            help you decide quickly.
          </p>
        </div>
        <div className={styles.aboutBlock}>
          <p className={styles.aboutSubtitle}>Your Personal Movie Navigator</p>
          <p className={styles.aboutText}>
            Discover new worlds, explore different genres, and find films that
            leave a lasting impression. Our site is your guide to the endless
            universe of cinema.
          </p>
        </div>
      </div>
    </main>
  );
}
