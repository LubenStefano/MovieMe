import styles from "./Main.module.css";
import PopcornVideo from "../../assets/PopcornVideo.mp4";
import PopcornItem from "../../shared/PopcornElement/PopcornElement";

export default function Main() {
  return (
    <>
      <div className={styles["hero-section"]}>
        <video autoPlay muted playsInline>
          <source src={PopcornVideo} type="video/mp4" />
        </video>
      </div>
      <PopcornItem
        id="popcorn1"
        top={23}
        left={19}
        width={13}
        rotate={-60}
        zIndex={1000}
      />
      <PopcornItem
        id="popcorn2"
        top={62}
        left={16}
        width={12}
        zIndex={1001}
        rotate={120}
      />
      <PopcornItem
        id="popcorn3"
        top={77}
        left={-6}
        width={19}
        zIndex={1001}
        rotate={-50}
      />
      <PopcornItem
        id="popcorn4"
        top={0}
        right={2}
        width={13}
        zIndex={1002}
        rotate={-20}
      />
      <PopcornItem id="popcorn5" top={21} right={15} width={11} zIndex={999} />
      <PopcornItem
        id="popcorn6"
        top={35}
        right={1}
        width={12}
        zIndex={1002}
        rotate={20}
      />
      <PopcornItem
        id="popcorn7"
        top={57}
        right={10}
        width={12}
        zIndex={1002}
        rotate={-20}
      />
    </>
  );
}
