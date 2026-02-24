import styles from "./info.module.scss";

export default function InfoSection() {
  const title = "Dive into the Infinite Cosmos of Cinema";
  const text = [
    "From heart-pounding thrillers to heartwarming dramas—discover a vast collection of films from every genre. Whether you're into timeless classics, the latest blockbusters, or hidden gems, there's always a new cinematic journey waiting for you.",
    "Here, you'll find films for every taste: action-packed blockbusters, atmospheric horror, touching romances, and laugh-out-loud comedies. No matter your mood or preferences, there’s always something special for you.",
    "Choose your next watch with our easy-to-browse previews! We've gathered the key details about the most exciting films to help you find the perfect pick for a cozy night in or a movie marathon.",
  ];
  return (
    <section className={styles.info}>
      <div className={styles.infoContent}>
        <p className={styles.infoTitle}>{title}</p>
        <p className={styles.infoText}>{text[0]}</p>
        <p className={styles.infoText}>{text[1]}</p>
        <p className={styles.infoText}>{text[2]}</p>
      </div>
    </section>
  );
}
