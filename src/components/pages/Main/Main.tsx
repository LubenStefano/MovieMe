import styles from "./Main.module.css";
import CinemaItem from "../../shared/CinemaItem/CinemaItem";
import { MouseParallax } from "react-just-parallax";
import Loader from "../../shared/Loader/Loader";
import { useLoader } from "../../../hooks/useLoader";

export default function Main() {
  const showLoader = useLoader();
  // Simulate loading for demo (replace with real loading logic if needed)
  const loading = !showLoader;

  if (loading) {
    return (
      <main className={styles.mainContent}>
        <Loader />
      </main>
    );
  }

  return (
    <>
      <div className={styles["hero-section"]}>
        <video autoPlay muted playsInline className={styles["hero-video"]}>
          <source src="/PopcornVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.03}
        lerpEase={0.06}
      >
        <CinemaItem
          id="popcorn1"
          top={23}
          width={13}
          type="popcorn"
          left={19}
          rotate={-60}
          zIndex={1000}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.05}
        lerpEase={0.09}
      >
        <CinemaItem
          id="popcorn2"
          top={62}
          width={12}
          type="popcorn"
          left={16}
          rotate={120}
          zIndex={1001}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.04}
        lerpEase={0.07}
      >
        <CinemaItem
          id="popcorn3"
          top={77}
          type="popcorn"
          left={-6}
          width={19}
          zIndex={1001}
          rotate={-50}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.03}
        lerpEase={0.05}
      >
        <CinemaItem
          id="popcorn4"
          top={0}
          type="popcorn"
          width={13}
          right={2}
          zIndex={1002}
          rotate={-20}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.05}
        lerpEase={0.08}
      >
        <CinemaItem
          id="popcorn5"
          top={21}
          right={15}
          width={11}
          zIndex={999}
          type="popcorn"
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.02}
        lerpEase={0.04}
      >
        <CinemaItem
          id="popcorn6"
          top={35}
          type="popcorn"
          right={1}
          width={12}
          zIndex={1002}
          rotate={20}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.069}
        lerpEase={0.15}
      >
        <CinemaItem
          id="popcorn7"
          top={57}
          type="popcorn"
          right={12}
          width={12}
          zIndex={1002}
          rotate={-20}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.07}
        lerpEase={0.11}
      >
        <CinemaItem
          id="soda1"
          top={15}
          type="soda"
          left={5}
          width={18}
          zIndex={1002}
          rotate={25}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.03}
        lerpEase={0.07}
      >
        <CinemaItem
          id="ticket1"
          top={45}
          left={15}
          width={16}
          zIndex={1000}
          rotate={85}
          type="ticket"
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.05}
        lerpEase={0.09}
      >
        <CinemaItem
          id="ticket2"
          top={1.5}
          left={-6}
          width={12}
          zIndex={1001}
          rotate={2}
          type="ticket"
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.06}
        lerpEase={0.1}
      >
        <CinemaItem
          id="ticket3"
          top={43}
          right={4}
          width={14.35}
          zIndex={1000}
          type="ticket"
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.04}
        lerpEase={0.08}
      >
        <CinemaItem
          id="ticket4"
          top={3}
          right={7}
          width={16}
          zIndex={1001}
          rotate={-20}
          type="ticket"
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.06}
        lerpEase={0.1}
      >
        <CinemaItem
          id="ticket5"
          top={80}
          right={-6}
          width={14.35}
          zIndex={1000}
          rotate={70}
          type="ticket"
        />
      </MouseParallax>
    </>
  );
}
