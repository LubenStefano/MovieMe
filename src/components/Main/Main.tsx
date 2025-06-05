import styles from './Main.module.css';
import PopcornVideo from '../../assets/PopcornVideo.mp4';

export default function Main(){
    
    return (
    <div className={styles["hero-section"]}>
      <video autoPlay muted playsInline>
        <source src={PopcornVideo} type="video/mp4" />
      </video>
    </div>
    );
}