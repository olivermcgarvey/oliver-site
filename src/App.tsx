import React, { useEffect, useMemo, useRef, useState } from "react";

type OverlayItem = {
  label: string;
  image?: string;
  url?: string;
};

type Project = {
  title: string;
  status: string;
  role: string;
  year: string;
  image: string;
  imageLandscape?: string;
  imageVertical?: string;
  video?: string;
  videoVertical?: string;
  mobileVimeoId?: string;
  aspect?: "landscape" | "vertical";
  leftMeta?: string;
  leftMetaExtra?: string;
  rightMetaText?: string;
  rightMetaLogo?: string;
  rightMetaLink?: string;
  leftMetaLink?: string;
  blurb?: string;
  overlays?: OverlayItem[];
  flashWarning?: boolean;
};

const netflixLogo = "/assets/shared/logos/netflix.png";
const nownessLogo = "/assets/shared/logos/nowness.svg";
const idLogo = "/assets/shared/logos/id.svg";
const highsnobietyLogo = "/assets/shared/logos/highsnobiety.svg";
const unknownPicturesLogo = "/assets/shared/logos/unknown-pictures-logo.png";
const instagramLabel = "IG";

const BUNNY_BASE = "https://oliver-site-cdn.b-cdn.net";
const bunny = (path: string) => `${BUNNY_BASE}${path}`;

const narrativeProjects: Project[] = [
  {
    title: "Falling Into The Grass (Brom's Lament)",
    status: "Unreleased",
    role: "Short Film · 35MM",
    year: "2026",
    image: bunny("/narrative/falling-into-the-grass/poster.webp"),
    video: bunny("/narrative/falling-into-the-grass/trailer.mp4"),
    mobileVimeoId: "1078472394",
    leftMeta: "Executive Producer · Lemohang Mosese",
    leftMetaLink: "https://en.wikipedia.org/wiki/Lemohang_Jeremiah_Mosese",
    rightMetaText: "UNRELEASED",
    overlays: [],
  },
  {
    title: "Under the Living Sky",
    status: "In Post Production",
    role: "Hybrid Documentary · 35MM & Digital",
    year: "Ongoing",
    image: bunny("/narrative/happy-citizens/poster.webp"),
    video: bunny("/narrative/happy-citizens/trailer.mp4"),
    mobileVimeoId: "1185277116",
    leftMeta: "Canada Council for the Arts",
    rightMetaText: "IN POST PRODUCTION",
    overlays: [],
  },
  {
    title: "Cosmic Loneliness",
    status: "In Development",
    role: "Feature Film",
    year: "2027",
    image: bunny("/narrative/cosmic-loneliness/poster.webp"),
    leftMeta: "Supported by Telefilm Canada · Alberta Media Fund",
    rightMetaText: "IN DEVELOPMENT",
    overlays: [],
  },
  {
    title: "Romantic Road",
    status: "Released",
    role: "Feature Documentary · 16MM & Digital",
    year: "2018",
    image: bunny("/narrative/romantic-road/poster.webp"),
    video: bunny("/narrative/romantic-road/trailer.mp4"),
    mobileVimeoId: "272953327",
    leftMeta: "Executive Producer · Sharon Stone",
    leftMetaLink: "https://en.wikipedia.org/wiki/Sharon_Stone",
    rightMetaText: "THEATRICAL · STREAMING",
    rightMetaLogo: netflixLogo,
    rightMetaLink: "https://www.netflix.com/title/81639637",
    overlays: [],
  },
];

const commercialProjects: Project[] = [
  {
    title: "MYKITA",
    status: "Released",
    role: "Campaign · 16MM · 8MM",
    year: "2024",
    image: bunny("/commercial/mykita-hero/poster.webp"),
    imageLandscape: bunny("/commercial/mykita-hero/poster.webp"),
    imageVertical: bunny("/commercial/mykita-hero/poster.webp"),
    video: bunny("/commercial/mykita-hero/trailer.mp4"),
    mobileVimeoId: "868033223",
    aspect: "vertical",
    leftMeta: "Co-DOP · Zack Spiger",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "MIU MIU",
    status: "Released",
    role: "Campaign · Digital",
    year: "2022",
    image: bunny("/commercial/miu-miu-1/poster.webp"),
    imageLandscape: bunny("/commercial/miu-miu-1/poster.webp"),
    imageVertical: bunny("/commercial/miu-miu-1/poster.webp"),
    video: bunny("/commercial/miu-miu-1/trailer.mp4"),
    mobileVimeoId: "1185057987",
    aspect: "vertical",
    leftMeta: "Art Direction · Fritz Schiffers",
    leftMetaExtra: "Paris Fashion Week",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "Adidas",
    status: "Released",
    role: "Campaign",
    year: "2025",
    image: bunny("/commercial/adidas/poster.webp"),
    imageLandscape: bunny("/commercial/adidas/poster.webp"),
    video: bunny("/commercial/adidas/trailer.mp4"),
    mobileVimeoId: "1185056415",
    leftMeta: "ADIDAS · POOL",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "MYKITA · LEICA",
    status: "Released",
    role: "Campaign · Digital",
    year: "2020",
    image: bunny("/commercial/mykita-leica/poster.webp"),
    imageLandscape: bunny("/commercial/mykita-leica/poster.webp"),
    imageVertical: bunny("/commercial/mykita-leica/poster.webp"),
    video: bunny("/commercial/mykita-leica/trailer.mp4"),
    mobileVimeoId: "394936736",
    aspect: "vertical",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "MYKITA",
    status: "Released",
    role: "Campaign · 16MM · 8MM",
    year: "2024",
    image: bunny("/commercial/mykita-tumi/poster.webp"),
    imageLandscape: bunny("/commercial/mykita-tumi/poster.webp"),
    imageVertical: bunny("/commercial/mykita-tumi/poster.webp"),
    video: bunny("/commercial/mykita-tumi/trailer.mp4"),
    mobileVimeoId: "961115198",
    aspect: "vertical",
    leftMeta: "Co-DOP · Zack Spiger",
    leftMetaExtra: "Berlin Commercial Awards · Cultural Impact",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "Krista Papista",
    status: "Released",
    role: "Music Video · 16MM",
    year: "2022",
    image: bunny("/commercial/krista-papista/poster.webp"),
    imageLandscape: bunny("/commercial/krista-papista/poster.webp"),
    imageVertical: bunny("/commercial/krista-papista/poster.webp"),
    video: bunny("/commercial/krista-papista/trailer.mp4"),
    mobileVimeoId: "726938602",
    leftMetaExtra: "Berlin Music Video Awards · Silver Screening Selection",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: nownessLogo,
    rightMetaLink: "https://www.nowness.com/story/krista-papista-agreement",
    flashWarning: true,
    overlays: [],
  },
  {
    title: "HOMESHAKE",
    status: "Released",
    role: "Music Video",
    year: "2019",
    image: bunny("/commercial/homeshake/poster.webp"),
    imageLandscape: bunny("/commercial/homeshake/poster.webp"),
    imageVertical: bunny("/commercial/homeshake/poster.webp"),
    video: bunny("/commercial/homeshake/trailer.mp4"),
    mobileVimeoId: "310845245",
    leftMetaExtra: "Prism Prize Nomination · Best Director",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: idLogo,
    rightMetaLink: "https://i-d.co/article/watch-homeshakes-dreamy-new-music-video-just-like-my/",
    overlays: [],
  },
  {
    title: "Adidas",
    status: "Released",
    role: "Campaign",
    year: "2025",
    image: bunny("/commercial/adidas-2/poster.webp"),
    imageLandscape: bunny("/commercial/adidas-2/poster.webp"),
    video: bunny("/commercial/adidas-2/trailer.mp4"),
    mobileVimeoId: "1185056841",
    leftMeta: "ADIDAS · POOL",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "MYKITA",
    status: "Released",
    role: "Campaign · 16MM · 8MM",
    year: "2024",
    image: bunny("/commercial/mykita-kat/poster.webp"),
    imageLandscape: bunny("/commercial/mykita-kat/poster.webp"),
    imageVertical: bunny("/commercial/mykita-kat/poster.webp"),
    video: bunny("/commercial/mykita-kat/trailer.mp4"),
    mobileVimeoId: "1185077699",
    aspect: "vertical",
    leftMeta: "Co-DOP · Zack Spiger",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
  {
    title: "ASICS",
    status: "Published",
    role: "Editorial · Digital",
    year: "2022",
    image: bunny("/commercial/asics/poster.webp"),
    imageLandscape: bunny("/commercial/asics/poster.webp"),
    imageVertical: bunny("/commercial/asics/poster.webp"),
    video: bunny("/commercial/asics/trailer.mp4"),
    mobileVimeoId: "1185076669",
    leftMeta: "Cinematography",
    leftMetaExtra: "Slam Jam · Directed by Fritz Schiffers",
    rightMetaText: "PUBLISHED",
    rightMetaLogo: instagramLabel,
    overlays: [],
  },
];

function useIsMobile(breakpoint = 900) {
  const getValue = () =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false;
  const [isMobile, setIsMobile] = useState(getValue);

  useEffect(() => {
    const onResize = () => setIsMobile(getValue());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return direction === "left" ? (
    <svg width="20" height="20" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M7.8 2L3.8 6L7.8 10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4.2 2L8.2 6L4.2 10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 1.5L8 5L2 8.5V1.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <rect x="2" y="1.5" width="2" height="7" fill="currentColor" />
      <rect x="6" y="1.5" width="2" height="7" fill="currentColor" />
    </svg>
  );
}

function MuteIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 4.5H3.8L6.4 2.2V9.8L3.8 7.5H1.5V4.5Z" fill="currentColor" />
      <path d="M2 2L10 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 4.5H3.8L6.4 2.2V9.8L3.8 7.5H1.5V4.5Z" fill="currentColor" />
      <path
        d="M8 4C8.5 4.4 8.8 5.1 8.8 6C8.8 6.9 8.5 7.6 8 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FullscreenIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4 1.8H1.8V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 1.8H10.2V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M4 10.2H1.8V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 10.2H10.2V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3.5 1.8H1.8V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M8.5 1.8H10.2V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M3.5 10.2H1.8V8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M8.5 10.2H10.2V8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 9L9 3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.7 3H9V7.3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ControlButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        color: "rgba(255,255,255,0.72)",
        cursor: "pointer",
        padding: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 240ms ease, transform 240ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.72";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}

function CenterCue({
  type,
  visible,
  opacity = 1,
}: {
  type: "play" | "pause";
  visible: boolean;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: visible ? opacity : 0,
        transition: "opacity 420ms ease",
        zIndex: 125,
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.82)",
          transform: "translateY(-2px)",
        }}
      >
        {type === "play" ? <PlayIcon size={22} /> : <PauseIcon size={22} />}
      </div>
    </div>
  );
}

function platformLogoStyle(logo?: string): React.CSSProperties {
  if (logo === highsnobietyLogo) {
    return {
      height: 10,
      width: "auto",
      display: "block",
      opacity: 0.86,
      filter: "brightness(0) invert(1)",
    };
  }

  const isEditorial = logo === nownessLogo || logo === idLogo;

  return {
    height: isEditorial ? 8 : 11,
    width: "auto",
    display: "block",
    opacity: isEditorial ? 0.82 : 0.92,
    filter: isEditorial ? "brightness(0) invert(1)" : "none",
    transform: isEditorial ? "translateY(1px)" : "translateY(0)",
  };
}

function getLandscapeImage(project: Project) {
  return project.imageLandscape || project.image;
}

function getPortraitImage(project: Project) {
  return project.imageVertical || project.image;
}

function getDesktopImage(project: Project) {
  return project.image;
}

function getMobileListPoster(project: Project, section: "narrative" | "commercial") {
  if (project.title === "MYKITA · LEICA") return project.image;
  if (project.image.includes("/mykita-kat/")) return getLandscapeImage(project);

  if (section === "commercial" && project.aspect === "vertical") {
    return getPortraitImage(project);
  }

  return getLandscapeImage(project);
}

function getMobileCardAspect(project: Project, section: "narrative" | "commercial") {
  if (project.title === "MYKITA · LEICA") return "16 / 9";
  if (project.image.includes("/mykita-kat/")) return "16 / 9";
  if (section === "commercial" && project.aspect === "vertical") return "4 / 5";
  return "16 / 9";
}

function getMobileVimeoSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    loop: "1",
    autopause: "0",
    controls: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    playsinline: "1",
    muted: "0",
    dnt: "1",
    transparent: "0",
    pip: "0",
    keyboard: "0",
    quality_selector: "0",
  });

  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

function LinkedMeta({
  text,
  link,
}: {
  text?: string;
  link?: string;
}) {
  if (!text) return null;

  if (!link) {
    return <>{text}</>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{
        color: "inherit",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span>{text}</span>
      <ExternalArrowIcon />
    </a>
  );
}

function WarningBadge() {
  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        bottom: 14,
        zIndex: 4,
        background: "rgba(0,0,0,0.52)",
        color: "rgba(255,255,255,0.88)",
        fontSize: 10,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        padding: "7px 9px 6px 9px",
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
        opacity: 0,
        animation: "warningFadeIn 700ms ease 250ms forwards",
      }}
    >
      Flashing Imagery
    </div>
  );
}

function MobileCardMeta({
  project,
}: {
  project: Project;
}) {
  return (
    <div
      style={{
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 16,
        alignItems: "start",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            lineHeight: 1.28,
            opacity: 0.72,
            marginBottom: 8,
            fontWeight: 300,
          }}
        >
          {project.title}
        </div>

        <div
          style={{
            fontSize: 10.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1.5,
            opacity: 0.52,
            marginBottom: project.leftMeta || project.leftMetaExtra ? 4 : 0,
          }}
        >
          {project.role} · {project.year}
        </div>

        {project.leftMeta ? (
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1.5,
              opacity: 0.42,
              marginBottom: project.leftMetaExtra ? 3 : 0,
            }}
          >
            <LinkedMeta text={project.leftMeta} link={project.leftMetaLink} />
          </div>
        ) : null}

        {project.leftMetaExtra ? (
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1.5,
              opacity: 0.42,
            }}
          >
            {project.leftMetaExtra}
          </div>
        ) : null}
      </div>

      <div
        style={{
          textAlign: "right",
          minWidth: 118,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1.4,
            opacity: 0.52,
            marginBottom: project.rightMetaLogo ? 8 : 0,
          }}
        >
          {project.rightMetaText || project.status}
        </div>

        {project.rightMetaLogo ? (
          project.rightMetaLogo === instagramLabel ? (
            project.rightMetaLink ? (
              <a
                href={project.rightMetaLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.82,
                }}
              >
                IG
              </a>
            ) : (
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.82,
                }}
              >
                IG
              </div>
            )
          ) : project.rightMetaLink ? (
            <a
              href={project.rightMetaLink}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-block", lineHeight: 0, textDecoration: "none" }}
            >
              <img
                src={project.rightMetaLogo}
                alt="Platform"
                style={platformLogoStyle(project.rightMetaLogo)}
              />
            </a>
          ) : (
            <img
              src={project.rightMetaLogo}
              alt="Platform"
              style={platformLogoStyle(project.rightMetaLogo)}
            />
          )
        ) : null}
      </div>
    </div>
  );
}

function MobileVimeoOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const hasVimeo = !!project.mobileVimeoId;
  const vimeoSrc = useMemo(
    () => (project.mobileVimeoId ? getMobileVimeoSrc(project.mobileVimeoId) : ""),
    [project.mobileVimeoId],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 420,
        background: "black",
      }}
    >
      <button
        type="button"
        aria-label="Close player"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 430,
          border: "none",
          background: "rgba(0,0,0,0.42)",
          color: "rgba(255,255,255,0.94)",
          width: 46,
          height: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 30,
          lineHeight: 1,
          backdropFilter: "blur(6px)",
        }}
      >
        ×
      </button>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
        }}
      >
        {hasVimeo ? (
          <iframe
            key={project.mobileVimeoId}
            src={vimeoSrc}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            title={project.title}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "black",
            }}
          />
        ) : (
          <img
            src={getLandscapeImage(project)}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              background: "black",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
const isMobileLandscape =
  isMobile &&
  typeof window !== "undefined" &&
  window.innerWidth > window.innerHeight &&
  window.innerHeight < 520;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const navLockUntilRef = useRef(0);

  const controlsTimerRef = useRef<number | null>(null);
  const cursorTimerRef = useRef<number | null>(null);
  const cueTimerRef = useRef<number | null>(null);
  const roleTextSwapTimerRef = useRef<number | null>(null);
  const roleFadeInTimerRef = useRef<number | null>(null);
  const switchTimerRef = useRef<number | null>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [landingVisible, setLandingVisible] = useState(false);
  const [landingChoicesVisible, setLandingChoicesVisible] = useState(false);
  const [landingHover, setLandingHover] = useState<"narrative" | "commercial" | null>(null);

  const [section, setSection] = useState<"narrative" | "commercial">("narrative");
  const [navHover, setNavHover] = useState<"narrative" | "commercial" | null>(null);

  const projects = section === "narrative" ? narrativeProjects : commercialProjects;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [bioLinkHover, setBioLinkHover] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const [roleText, setRoleText] = useState("Writer · Director");
  const [roleVisible, setRoleVisible] = useState(true);

  const [centerCue, setCenterCue] = useState<"play" | "pause" | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileActiveProject, setMobileActiveProject] = useState<Project | null>(null);

  const safeDisplayIndex =
    displayIndex >= 0 && displayIndex < projects.length ? displayIndex : 0;
  const current = projects[safeDisplayIndex];
  const hasVideo = !!current?.video;
  const isVertical = current?.aspect === "vertical";
  const galleryObjectFit = isVertical ? "contain" : "cover";
  const fullscreenObjectFit = "contain";
  const showFullscreenImageMeta = isFullscreen && !hasVideo;
  const showFullscreenVideoMeta = isFullscreen && hasVideo && showControls;

  const frameWidth = isMobile ? "92vw" : "64vw";
  const frameMaxWidth = isMobile ? "none" : "1080px";

  const metaBottom = isMobile ? 28 : 42;
  const rightMetaBottom = metaBottom;
  const fullscreenMetaBottom = isMobile ? 84 : 96;
  const fullscreenRightMetaBottom = fullscreenMetaBottom;

  useEffect(() => {
    const timerA = window.setTimeout(() => {
      setLandingVisible(true);
    }, 120);

    const timerB = window.setTimeout(() => {
      setLandingChoicesVisible(true);
    }, 520);

    return () => {
      window.clearTimeout(timerA);
      window.clearTimeout(timerB);
    };
  }, []);

  useEffect(() => {
    const previousOverscrollX = document.documentElement.style.overscrollBehaviorX;
    const previousOverscrollY = document.documentElement.style.overscrollBehaviorY;
    const previousBodyOverscrollX = document.body.style.overscrollBehaviorX;
    const previousBodyOverscrollY = document.body.style.overscrollBehaviorY;

    document.documentElement.style.overscrollBehaviorX = "none";
    document.documentElement.style.overscrollBehaviorY = "none";
    document.body.style.overscrollBehaviorX = "none";
    document.body.style.overscrollBehaviorY = "none";

    return () => {
      document.documentElement.style.overscrollBehaviorX = previousOverscrollX;
      document.documentElement.style.overscrollBehaviorY = previousOverscrollY;
      document.body.style.overscrollBehaviorX = previousBodyOverscrollX;
      document.body.style.overscrollBehaviorY = previousBodyOverscrollY;
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMobile]);

  useEffect(() => {
    if (mobileActiveProject) {
      setMobileMenuOpen(false);
      setMobileAboutOpen(false);
    }
  }, [mobileActiveProject]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayIndex(0);
    setIsSwitching(false);
    setIsActive(false);
    setIsPlaying(true);
    setShowControls(false);
    setCursorHidden(false);
    setCenterCue(null);
    setMobileActiveProject(null);

    if (isMobile) {
      setMobileMenuOpen(false);
      setMobileAboutOpen(false);
    }

    const nextRole = hasEntered
      ? section === "narrative"
        ? "Writer · Director"
        : "Director · Cinematographer"
      : "Writer · Director · Cinematographer";

    setRoleVisible(false);

    if (roleTextSwapTimerRef.current) window.clearTimeout(roleTextSwapTimerRef.current);
    if (roleFadeInTimerRef.current) window.clearTimeout(roleFadeInTimerRef.current);

    roleTextSwapTimerRef.current = window.setTimeout(() => {
      setRoleText(nextRole);
    }, 260);

    roleFadeInTimerRef.current = window.setTimeout(() => {
      setRoleVisible(true);
    }, 320);
  }, [section, hasEntered, isMobile]);

  useEffect(() => {
    setVideoReady(!hasVideo);
  }, [displayIndex, hasVideo, section]);

  useEffect(() => {
    if (currentIndex >= projects.length) {
      setCurrentIndex(0);
      setDisplayIndex(0);
      return;
    }

    if (currentIndex === displayIndex) return;

    setIsSwitching(true);

    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

    switchTimerRef.current = window.setTimeout(() => {
      setDisplayIndex(currentIndex);
      setIsSwitching(false);
      navLockUntilRef.current = performance.now() + 220;
    }, 220);

    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
    };
  }, [currentIndex, displayIndex, projects.length]);

  useEffect(() => {
    setIsPlaying(true);
    setShowControls(isFullscreen);
    setCursorHidden(false);
    setCenterCue(null);

    if (hasVideo) {
      setIsActive(isFullscreen);
      if (isFullscreen) {
        setIsMuted(false);
      }
    } else {
      setIsActive(true);
    }
  }, [displayIndex, hasVideo, isFullscreen, section]);

  useEffect(() => {
    if (!videoRef.current || isMobile) return;

    const video = videoRef.current;

    video.muted = isMuted;
    video.volume = isMuted ? 0 : 1;

    if (!hasVideo || !isActive) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // ignore
      }
      return;
    }

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    if (isFullscreen && hasVideo) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    }
  }, [isActive, isPlaying, isMuted, hasVideo, isFullscreen, displayIndex, isMobile, videoReady]);

  useEffect(() => {
    if (isMobile) return;

    const handleFullscreenChange = () => {
      const active = document.fullscreenElement === frameRef.current;
      setIsFullscreen(active);
      setShowControls(true);
      setCursorHidden(false);

      if (active && hasVideo) {
        setIsMuted(false);
        setIsActive(true);
        setIsPlaying(true);

        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1;
          videoRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [hasVideo, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;

      if (isEditable) return;
      if (e.code !== "Space") return;
      if (!hasVideo) return;

      e.preventDefault();

      if (!isActive) {
        activateVideo();
        flashCenterCue("play", 700);
        return;
      }

      const nextPlaying = !isPlaying;
      setIsPlaying(nextPlaying);
      revealControls();
      flashCenterCue(nextPlaying ? "pause" : "play", 800);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, hasVideo, isActive, isPlaying]);

  useEffect(() => {
    return () => {
      [
        controlsTimerRef,
        cursorTimerRef,
        cueTimerRef,
        roleTextSwapTimerRef,
        roleFadeInTimerRef,
        switchTimerRef,
      ].forEach((ref) => {
        if (ref.current) window.clearTimeout(ref.current);
      });
    };
  }, []);

  const scheduleControlsHide = (delay = 1800) => {
    if (controlsTimerRef.current) window.clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, delay);
  };

  const scheduleCursorHide = (delay = 1400) => {
    if (cursorTimerRef.current) window.clearTimeout(cursorTimerRef.current);
    cursorTimerRef.current = window.setTimeout(() => {
      setCursorHidden(true);
    }, delay);
  };

  const revealControls = () => {
    setShowControls(true);
    setCursorHidden(false);
    scheduleControlsHide(isFullscreen ? 1800 : 1500);
    scheduleCursorHide(isFullscreen || hasVideo ? 1400 : 1800);
  };

  const flashCenterCue = (type: "play" | "pause", duration = 900) => {
    if (cueTimerRef.current) window.clearTimeout(cueTimerRef.current);
    setCenterCue(type);
    cueTimerRef.current = window.setTimeout(() => {
      setCenterCue(null);
    }, duration);
  };

  const activateVideo = () => {
    if (!hasVideo) return;
    setIsMuted(false);
    setIsActive(true);
    setIsPlaying(true);
    revealControls();
    setCursorHidden(false);
  };

  const handleMouseEnter = () => {
    revealControls();
    if (hasVideo && isActive) {
      flashCenterCue(isPlaying ? "pause" : "play", 800);
    }
  };

  const handleMouseMove = () => {
    revealControls();
    if (hasVideo && isActive) {
      flashCenterCue(isPlaying ? "pause" : "play", 800);
    }
  };

  const handleMouseLeave = () => {
    scheduleControlsHide(700);
    if (hasVideo || isFullscreen) {
      scheduleCursorHide(600);
    }
  };

  const handleViewerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edgeZone = !isFullscreen ? 90 : 72;

    if (x < edgeZone || x > rect.width - edgeZone) return;
    if (!hasVideo) return;

    if (!isActive) {
      activateVideo();
      flashCenterCue("play", 700);
      return;
    }

    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    revealControls();
    flashCenterCue(nextPlaying ? "pause" : "play", 800);
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!hasVideo) return;
    setIsMuted((prev) => !prev);
    revealControls();
  };

  const toggleFullscreen = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    revealControls();

    if (!frameRef.current || isMobile) return;

    try {
      if (document.fullscreenElement === frameRef.current) {
        await document.exitFullscreen();
      } else {
        if (hasVideo) {
          setIsMuted(false);
          setIsActive(true);
          setIsPlaying(true);

          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
          }
        }

        await frameRef.current.requestFullscreen();

        if (hasVideo && videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1;
          videoRef.current.play().catch(() => {});
        }
      }
    } catch {
      // ignore
    }
  };

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

      const handleWheelSwipe = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isMobile || isBioOpen || !hasEntered || isSwitching || !isFullscreen) return;

    const now = performance.now();
    if (now < navLockUntilRef.current) return;

    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    const isHorizontalSwipe = absX >= 24 && absX > absY;

    if (!isHorizontalSwipe) return;

    e.preventDefault();
    e.stopPropagation();

    navLockUntilRef.current = now + 650;

    if (e.deltaX > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (isBioOpen || !hasEntered || isSwitching) return;

    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) return;

    if (
      isBioOpen ||
      !hasEntered ||
      isSwitching ||
      touchStartXRef.current === null ||
      touchStartYRef.current === null
    ) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      return;
    }

    const now = performance.now();
    if (now < navLockUntilRef.current) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    navLockUntilRef.current = now + 650;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  const toggleBio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsBioOpen((prev) => !prev);
  };

    const enterSection = (nextSection: "narrative" | "commercial") => {
    setSection(nextSection);
    setHasEntered(true);
    setCurrentIndex(0);
    setDisplayIndex(0);

    if (isMobile) {
      setMobileMenuOpen(false);
      setMobileAboutOpen(false);

      window.requestAnimationFrame(() => {
        mobileScrollRef.current?.scrollTo({
          top: 0,
          behavior: "auto",
        });
      });
    }
  };

  const rightMetaStack = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.52,
          marginBottom: current.rightMetaLogo ? 4 : 0,
        }}
      >
        {current.rightMetaText || current.status}
      </div>

      {current.rightMetaLogo ? (
        current.rightMetaLogo === instagramLabel ? (
          current.rightMetaLink ? (
            <a
              href={current.rightMetaLink}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                  transform: "translateY(1px)",
                }}
              >
                IG
              </div>
            </a>
          ) : (
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.8,
                transform: "translateY(1px)",
              }}
            >
              IG
            </div>
          )
        ) : current.rightMetaLink ? (
          <a
            href={current.rightMetaLink}
            target="_blank"
            rel="noreferrer"
            style={{ display: "block", lineHeight: 0, textDecoration: "none" }}
          >
            <img
              src={current.rightMetaLogo}
              alt="Platform"
              style={platformLogoStyle(current.rightMetaLogo)}
            />
          </a>
        ) : (
          <img
            src={current.rightMetaLogo}
            alt="Platform"
            style={platformLogoStyle(current.rightMetaLogo)}
          />
        )
      ) : null}
    </div>
  );

  const mobileHeader = (
  <>
    <div
      style={{
        position: "fixed",
        top: isMobileLandscape ? 28 : 48,
        left: isMobileLandscape ? 28 : 20,
        zIndex: 90,
        userSelect: "none",
        opacity: 0.88,
        transition: "opacity 320ms ease",
        textAlign: "left",
        pointerEvents: mobileActiveProject ? "none" : "auto",
        background: "transparent",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Oliver McGarvey
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: roleVisible ? (hasEntered ? 0.46 : 0.38) : 0,
          transform: roleVisible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 320ms ease, transform 1400ms ease",
        }}
      >
        {roleText}
      </div>
    </div>

    <div
      style={{
        position: "fixed",
        top: isMobileLandscape ? 28 : 48,
        right: isMobileLandscape ? 28 : 20,
        zIndex: 90,
        userSelect: "none",
        pointerEvents: mobileActiveProject ? "none" : "auto",
        background: "transparent",
      }}
    >
      <button
        type="button"
        onClick={() => {
          setMobileMenuOpen((prev) => !prev);
          setMobileAboutOpen(false);
        }}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        style={{
          border: "none",
          background: "transparent",
          color: "rgba(255,255,255,0.9)",
          padding: "8px 0",
          margin: 0,
          fontSize: mobileMenuOpen ? 28 : 12,
          fontWeight: mobileMenuOpen ? 100 : 300,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          lineHeight: mobileMenuOpen ? 0.8 : 1,
          cursor: "pointer",
          letterSpacing: mobileMenuOpen ? "0" : "0.16em",
          textTransform: mobileMenuOpen ? "none" : "uppercase",
          opacity: mobileMenuOpen ? 0.72 : 0.9,
        }}
      >
        {mobileMenuOpen ? "×" : "Menu"}
      </button>
    </div>

    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 75,
        opacity: mobileMenuOpen ? 1 : 0,
        transform: mobileMenuOpen ? "translateY(0)" : "translateY(-12px)",
        pointerEvents: mobileMenuOpen ? "auto" : "none",
        transition: "opacity 420ms ease, transform 420ms ease",
        background: "rgba(0,0,0,0.96)",
        backdropFilter: "blur(4px)",
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        padding: "156px 20px 80px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            marginBottom: 48,
          }}
        >
          <button
            type="button"
            onClick={() => enterSection("narrative")}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              fontSize: 19,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              opacity: section === "narrative" && hasEntered ? 0.96 : 0.78,
              fontWeight: 300,
            }}
          >
            Narrative
          </button>

          <button
            type="button"
            onClick={() => enterSection("commercial")}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              fontSize: 19,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              opacity: section === "commercial" && hasEntered ? 0.96 : 0.78,
              fontWeight: 300,
            }}
          >
            Commercial
          </button>
        </div>

        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.38,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            Bio
          </div>

          <div
            style={{
              fontSize: 13.5,
              lineHeight: 1.72,
              letterSpacing: "0.01em",
              opacity: 0.86,
            }}
          >
            Canadian director working between Berlin and Canada.
            <br />
            <br />
            Working across narrative and commercial film, his projects span documentary, slow cinema, fashion and cultural commissions.
            <br />
            <br />
            His work focuses on atmosphere, messy human emotions and formal restraint.
          </div>
        </div>

        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.38,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            Contact
          </div>

          <a
            href="mailto:contact@olivermcgarvey.com"
            style={{
              fontSize: 13.5,
              lineHeight: 1.72,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.76)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>contact@olivermcgarvey.com</span>
            <ExternalArrowIcon />
          </a>
        </div>

        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.38,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            Featured In
          </div>

          <div
            style={{
              fontSize: 13.5,
              lineHeight: 1.72,
              letterSpacing: "0.01em",
              opacity: 0.86,
            }}
          >
            Nowness, The Guardian, The Times, i-D, Vogue and Vanity Fair.
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.38,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            Founder & Executive Producer
          </div>

          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.5,
              lineHeight: 1.45,
              marginBottom: 18,
            }}
          >
            Unknown Pictures Ltd.
          </div>

          <img
            src={unknownPicturesLogo}
            alt="Unknown Pictures"
            style={{
              width: 34,
              height: "auto",
              opacity: 0.58,
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  </>
);

  return (
    <div
      style={{
        background: "black",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        color: "white",
        position: "relative",
        overscrollBehaviorX: "none",
        overscrollBehaviorY: "none",
        fontFamily: '"Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes warningFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {isMobile ? (
        mobileHeader
      ) : (
        <>
          <button
            type="button"
            onClick={toggleBio}
            onMouseEnter={() => setBioLinkHover(true)}
            onMouseLeave={() => setBioLinkHover(false)}
            aria-label={isBioOpen ? "Close bio" : "Open bio"}
            style={{
              position: "absolute",
              top: 42,
              left: 52,
              zIndex: 60,
              userSelect: "none",
              opacity: isFullscreen ? 0 : bioLinkHover ? 0.98 : 0.88,
              transition: "opacity 320ms ease",
              border: "none",
              background: "transparent",
              color: "inherit",
              padding: 0,
              margin: 0,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Oliver McGarvey
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: roleVisible ? (bioLinkHover ? 0.58 : hasEntered ? 0.46 : 0.38) : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 320ms ease, transform 1400ms ease",
              }}
            >
              {roleText}
            </div>
          </button>

          <div
            style={{
              position: "absolute",
              top: 42,
              right: 44,
              fontSize: 11,
              letterSpacing: "0.12em",
              opacity: isFullscreen ? 0 : 0.62,
              zIndex: 60,
              userSelect: "none",
              transition: "opacity 520ms ease",
              display: "flex",
              alignItems: "center",
            }}
          >
            {hasEntered ? (
              <>
                <button
                  type="button"
                  onClick={() => setSection("narrative")}
                  onMouseEnter={() => setNavHover("narrative")}
                  onMouseLeave={() => setNavHover(null)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "inherit",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    opacity:
                      section === "narrative"
                        ? 0.92
                        : navHover === "narrative"
                          ? 0.72
                          : 0.38,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: 11,
                    transition: "opacity 320ms ease",
                  }}
                >
                  Narrative
                </button>

                <div style={{ width: 18 }} />

                <button
                  type="button"
                  onClick={() => setSection("commercial")}
                  onMouseEnter={() => setNavHover("commercial")}
                  onMouseLeave={() => setNavHover(null)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "inherit",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    opacity:
                      section === "commercial"
                        ? 0.92
                        : navHover === "commercial"
                          ? 0.72
                          : 0.38,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: 11,
                    transition: "opacity 320ms ease",
                  }}
                >
                  Commercial
                </button>

                <div style={{ width: 16 }} />
              </>
            ) : null}

            <button
              type="button"
              onClick={toggleBio}
              onMouseEnter={() => setBioLinkHover(true)}
              onMouseLeave={() => setBioLinkHover(false)}
              aria-label={isBioOpen ? "Close bio" : "Open bio"}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                padding: "10px",
                margin: "-10px",
                fontSize: 30,
                fontWeight: 100,
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                lineHeight: 0.72,
                position: "relative",
                top: -4,
                cursor: "pointer",
                opacity: bioLinkHover ? 1 : 0.9,
                transition: "opacity 320ms ease, transform 520ms ease",
                transform: isBioOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </button>
          </div>

          <div
            onClick={() => setIsBioOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: isBioOpen ? 55 : -1,
              pointerEvents: isBioOpen ? "auto" : "none",
              background: isBioOpen ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
              transition: "background 600ms ease",
            }}
          />

          <div
  style={{
    position: "fixed",
    top: 86,
    left: 52,
    width: 780,
    minHeight: 360,
    background: "rgba(0,0,0,0.9)",
    zIndex: 56,
    opacity: isBioOpen ? 1 : 0,
    transform: isBioOpen ? "translateY(0)" : "translateY(-20px)",
    pointerEvents: isBioOpen ? "auto" : "none",
    transition: "opacity 600ms ease, transform 600ms ease",
    padding: "34px 40px 38px 40px",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "380px 280px",
    gridTemplateRows: "auto auto",
    columnGap: 68,
    rowGap: 30,
    alignItems: "start",
    backdropFilter: "blur(4px)",
  }}
>
  <div>
    <div
      style={{
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: 0.38,
        lineHeight: 1.45,
        marginBottom: 14,
      }}
    >
      Bio
    </div>

    <div
      style={{
        fontSize: 14,
        lineHeight: 1.7,
        letterSpacing: "0.01em",
        opacity: 0.9,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        Canadian director working between Berlin and Canada.
      </div>

      <div style={{ marginBottom: 20 }}>
        Working across narrative and commercial film,<br />
        his projects span documentary, slow cinema,<br />
        fashion and cultural commissions.
      </div>

      <div>
        His work focuses on atmosphere,<br />
        messy human emotions and formal restraint.
      </div>
    </div>
  </div>

  <div>
    <div
      style={{
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: 0.38,
        lineHeight: 1.45,
        marginTop: -2,
        marginBottom: 14,
      }}
    >
      Contact
    </div>

    <a
      href="mailto:contact@olivermcgarvey.com"
      style={{
        fontSize: 14,
        lineHeight: 1.7,
        letterSpacing: "0.01em",
        color: "rgba(255,255,255,0.86)",
        opacity: 0.72,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "opacity 200ms ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.96";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.72";
      }}
    >
      <span>contact@olivermcgarvey.com</span>
      <ExternalArrowIcon />
    </a>
  </div>

  <div>
    <div
      style={{
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: 0.38,
        lineHeight: 1.45,
        marginBottom: 14,
      }}
    >
      Featured In
    </div>

    <div
      style={{
        fontSize: 14,
        lineHeight: 1.7,
        letterSpacing: "0.01em",
        opacity: 0.9,
      }}
    >
      Nowness, The Guardian, The Times,<br />
      i-D, Vogue and Vanity Fair.
    </div>
  </div>

  <div>
    <div
      style={{
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: 0.38,
        lineHeight: 1.45,
        marginBottom: 14,
        whiteSpace: "nowrap",
      }}
    >
      Founder & Executive Producer
    </div>

    <div
      style={{
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: 0.65,
        lineHeight: 1.45,
        marginBottom: 18,
        whiteSpace: "nowrap",
      }}
    >
      Unknown Pictures Ltd.
    </div>

    <img
      src={unknownPicturesLogo}
      alt="Unknown Pictures"
      style={{
        width: 36,
        height: "auto",
        opacity: 0.72,
        marginTop: 8,
        display: "block",
      }}
    />
  </div>
</div>
        </>
      )}

      {!hasEntered ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            opacity: landingVisible ? 1 : 0,
            transition: "opacity 900ms ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: isMobile ? "45%" : "52%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? 28 : 68,
              opacity: landingChoicesVisible ? 1 : 0,
              transition: "opacity 1100ms ease",
            }}
          >
            <button
              type="button"
              onClick={() => enterSection("narrative")}
              onMouseEnter={() => setLandingHover("narrative")}
              onMouseLeave={() => setLandingHover(null)}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                fontSize: isMobile ? 14 : 16,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 200,
                opacity:
                  landingHover === null
                    ? 0.68
                    : landingHover === "narrative"
                      ? 0.9
                      : 0.42,
                transform: landingHover === "narrative" ? "translateY(-1px)" : "translateY(0)",
                transition: "opacity 520ms ease, transform 520ms ease",
              }}
            >
              Narrative
            </button>

            <button
              type="button"
              onClick={() => enterSection("commercial")}
              onMouseEnter={() => setLandingHover("commercial")}
              onMouseLeave={() => setLandingHover(null)}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                fontSize: isMobile ? 14 : 16,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 200,
                opacity:
                  landingHover === null
                    ? 0.68
                    : landingHover === "commercial"
                      ? 0.9
                      : 0.42,
                transform: landingHover === "commercial" ? "translateY(-1px)" : "translateY(0)",
                transition: "opacity 520ms ease, transform 520ms ease",
              }}
            >
              Commercial
            </button>
          </div>
        </div>
      ) : isMobile ? (
        <>
          <div
            ref={mobileScrollRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
              paddingBottom: isMobileLandscape ? 64 : 120,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: isMobileLandscape ? "78vw" : "100%",
                maxWidth: isMobileLandscape ? 720 : 980,
                margin: "0 auto",
                padding: isMobileLandscape ? "96px 0 0 0" : "108px 20px 0 20px",
                boxSizing: "border-box",
              }}
            >
              {projects.map((project, i) => {
                const cardPoster = getMobileListPoster(project, section);
                const cardHasPlayback = !!project.mobileVimeoId || !!project.video;
                const cardAspect = getMobileCardAspect(project, section);

                return (
                  <div
                    key={`${section}-${project.title}-${i}`}
                    style={{
                      marginBottom: isMobileLandscape ? 38 : 54,
                    }}
                  >
                    <div
                      onClick={() => {
                        if (!cardHasPlayback) return;
                        setMobileActiveProject(project);
                      }}
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: cardAspect,
                        overflow: "hidden",
                        background: "black",
                        cursor: cardHasPlayback ? "pointer" : "default",
                      }}
                    >
                      <img
                        src={cardPoster}
                        alt={project.title}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {cardHasPlayback ? (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none",
                            color: "rgba(255,255,255,0.92)",
                          }}
                        >
                          <PlayIcon size={24} />
                        </div>
                      ) : null}

                      {project.flashWarning ? <WarningBadge /> : null}
                    </div>

                    <MobileCardMeta project={project} />
                  </div>
                );
              })}
            </div>
          </div>

          {mobileActiveProject ? (
            <MobileVimeoOverlay
              project={mobileActiveProject}
              onClose={() => setMobileActiveProject(null)}
            />
          ) : null}
        </>
            ) : (
        <>
          {!isFullscreen ? (
            <div
              style={{
                position: "fixed",
                inset: 0,
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
                padding: "132px 0 120px 0",
                boxSizing: "border-box",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: frameWidth,
                  maxWidth: frameMaxWidth,
                  margin: "0 auto",
                }}
              >
                {projects.map((project, i) => {
                  const cardHasPlayback = !!project.video;
                  const cardIsVertical = project.aspect === "vertical";
                  const cardObjectFit = cardIsVertical ? "contain" : "cover";

                  return (
                    <div
                      key={`${section}-${project.title}-${i}`}
                      style={{
                        marginBottom: 96,
                      }}
                    >
                      <div
                        onClick={() => {
                          setCurrentIndex(i);
                          setDisplayIndex(i);
                          setIsActive(cardHasPlayback);
                          setIsPlaying(true);
                          setIsMuted(false);
                          setVideoReady(!cardHasPlayback);
                          setShowControls(true);
                          setCursorHidden(false);
                          setIsFullscreen(true);
                        }}
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16 / 9",
                          overflow: "hidden",
                          background: "black",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={getDesktopImage(project)}
                          alt={project.title}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: cardObjectFit,
                            display: "block",
                            background: "black",
                          }}
                        />

                        {cardHasPlayback ? (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              pointerEvents: "none",
                              color: "rgba(255,255,255,0.48)",
                            }}
                          >
                            <PlayIcon size={24} />
                          </div>
                        ) : null}

                        {project.flashWarning ? <WarningBadge /> : null}
                      </div>

                      <div
                        style={{
                          marginTop: 22,
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: 32,
                          alignItems: "start",
                        }}
                      >
                        <div
                          style={{
                            minHeight: 64,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              letterSpacing: "0.13em",
                              textTransform: "uppercase",
                              marginBottom: 5,
                              opacity: 0.72,
                              fontWeight: 300,
                            }}
                          >
                            {project.title}
                          </div>

                          <div
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              opacity: 0.52,
                              marginBottom: project.leftMeta || project.leftMetaExtra ? 4 : 0,
                            }}
                          >
                            {project.role} · {project.year}
                          </div>

                          {project.leftMeta ? (
                            <div
                              style={{
                                fontSize: 11,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                opacity: 0.42,
                                marginBottom: project.leftMetaExtra ? 4 : 0,
                              }}
                            >
                              <LinkedMeta text={project.leftMeta} link={project.leftMetaLink} />
                            </div>
                          ) : null}

                          {project.leftMetaExtra ? (
                            <div
                              style={{
                                fontSize: 11,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                opacity: 0.42,
                              }}
                            >
                              {project.leftMetaExtra}
                            </div>
                          ) : null}
                        </div>

                        <div
                          style={{
                            textAlign: "right",
                            minWidth: 140,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              opacity: 0.52,
                              marginBottom: project.rightMetaLogo ? 4 : 0,
                            }}
                          >
                            {project.rightMetaText || project.status}
                          </div>

                          {project.rightMetaLogo ? (
                            project.rightMetaLogo === instagramLabel ? (
                              project.rightMetaLink ? (
                                <a
                                  href={project.rightMetaLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 11,
                                      letterSpacing: "0.14em",
                                      textTransform: "uppercase",
                                      opacity: 0.8,
                                      transform: "translateY(1px)",
                                    }}
                                  >
                                    IG
                                  </div>
                                </a>
                              ) : (
                                <div
                                  style={{
                                    fontSize: 11,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    opacity: 0.8,
                                    transform: "translateY(1px)",
                                  }}
                                >
                                  IG
                                </div>
                              )
                            ) : project.rightMetaLink ? (
                              <a
                                href={project.rightMetaLink}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: "block", lineHeight: 0, textDecoration: "none" }}
                              >
                                <img
                                  src={project.rightMetaLogo}
                                  alt="Platform"
                                  style={platformLogoStyle(project.rightMetaLogo)}
                                />
                              </a>
                            ) : (
                              <img
                                src={project.rightMetaLogo}
                                alt="Platform"
                                style={platformLogoStyle(project.rightMetaLogo)}
                              />
                            )
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              onWheel={handleWheelSwipe}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                background: "black",
                overflow: "hidden",
                touchAction: "pan-y",
              }}
            >
              <div
                ref={frameRef}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleViewerClick}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  background: "black",
                  cursor: cursorHidden ? "none" : hasVideo && !isActive ? "pointer" : "default",
                  zIndex: 10,
                }}
              >
                {hasVideo ? (
                  <img
                    src={getDesktopImage(current)}
                    alt={current.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: fullscreenObjectFit,
                      display: "block",
                      opacity: isActive && videoReady ? 0 : 1,
                      transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                      background: "black",
                    }}
                  />
                ) : (
                  <img
                    src={getDesktopImage(current)}
                    alt={current.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: fullscreenObjectFit,
                      display: "block",
                      opacity: 1,
                      transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                      background: "black",
                    }}
                  />
                )}

                {hasVideo ? (
                  <video
                    key={`${current.title}-${displayIndex}`}
                    ref={videoRef}
                    src={current.video}
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setVideoReady(true)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      opacity: isActive && videoReady ? 1 : 0,
                      transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                      background: "black",
                    }}
                  />
                ) : null}

                {hasVideo && !isActive ? (
                  <CenterCue type="play" visible={true} opacity={showControls ? 0.72 : 0.22} />
                ) : null}

                {centerCue && hasVideo && isActive ? (
                  <CenterCue type={centerCue} visible={true} />
                ) : null}

                {!isActive && current.flashWarning ? <WarningBadge /> : null}

                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous project"
                  style={{
                    position: "absolute",
                    left: 18,
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    color: showControls ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.12)",
                    cursor: "pointer",
                    transition: "color 220ms ease",
                    zIndex: 125,
                    padding: 18,
                  }}
                >
                  <ArrowIcon direction="left" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next project"
                  style={{
                    position: "absolute",
                    right: 18,
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    color: showControls ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.12)",
                    cursor: "pointer",
                    transition: "color 220ms ease",
                    zIndex: 125,
                    padding: 18,
                  }}
                >
                  <ArrowIcon direction="right" />
                </button>

                <button
                  type="button"
                  aria-label="Exit fullscreen"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(false);
                    setIsActive(false);
                    setIsPlaying(true);
                    setShowControls(false);
                    setCursorHidden(false);
                    setCenterCue(null);
                  }}
                  style={{
                    position: "absolute",
                    top: 34,
                    right: 38,
                    zIndex: 135,
                    border: "none",
                    background: "transparent",
                    color: "rgba(255,255,255,0.76)",
                    fontSize: 30,
                    fontWeight: 100,
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    lineHeight: 0.8,
                    cursor: "pointer",
                    opacity: showControls ? 0.9 : 0.18,
                    transition: "opacity 320ms ease",
                  }}
                >
                  ×
                </button>

                <div
                  style={{
                    position: "absolute",
                    right: 16,
                    bottom: 16,
                    display: "flex",
                    gap: 8,
                    opacity: showControls ? 0.9 : 0,
                    transition: "opacity 520ms ease",
                    zIndex: 120,
                    pointerEvents: showControls ? "auto" : "none",
                  }}
                >
                  {hasVideo ? (
                    <ControlButton
                      onClick={toggleMute}
                      ariaLabel={isMuted ? "Unmute" : "Mute"}
                    >
                      <MuteIcon muted={isMuted} />
                    </ControlButton>
                  ) : null}
                </div>

                {showFullscreenImageMeta || showFullscreenVideoMeta ? (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        left: 24,
                        bottom: fullscreenMetaBottom,
                        zIndex: 130,
                        userSelect: "none",
                        opacity: hasVideo ? (showControls ? 1 : 0) : 1,
                        transition: "opacity 520ms ease",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          marginBottom: 5,
                          opacity: 0.74,
                          fontWeight: 300,
                        }}
                      >
                        {current.title}
                      </div>

                      <div
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          opacity: 0.52,
                          marginBottom: current.leftMeta || current.leftMetaExtra ? 4 : 0,
                        }}
                      >
                        {current.role} · {current.year}
                      </div>

                      {current.leftMeta ? (
                        <div
                          style={{
                            fontSize: 11,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            opacity: 0.42,
                            marginBottom: current.leftMetaExtra ? 4 : 0,
                          }}
                        >
                          <LinkedMeta text={current.leftMeta} link={current.leftMetaLink} />
                        </div>
                      ) : null}

                      {current.leftMetaExtra ? (
                        <div
                          style={{
                            fontSize: 11,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            opacity: 0.42,
                          }}
                        >
                          {current.leftMetaExtra}
                        </div>
                      ) : null}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        right: 24,
                        bottom: fullscreenRightMetaBottom,
                        zIndex: 130,
                        userSelect: "none",
                        opacity: hasVideo ? (showControls ? 1 : 0) : 1,
                        transition: "opacity 520ms ease",
                        pointerEvents: "none",
                      }}
                    >
                      {rightMetaStack}
                    </div>
                  </>
                ) : null}

                <div
                  style={{
                    position: "absolute",
                    bottom: 28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 130,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    opacity: showControls ? 0.34 : 0,
                    transition: "opacity 520ms ease",
                    pointerEvents: "none",
                  }}
                >
                  {currentIndex + 1} / {projects.length}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      )}
    </div>
  );
}
