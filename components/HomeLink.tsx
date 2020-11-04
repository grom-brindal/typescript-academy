import Link from "next/link";
import dynamic from "next/dynamic";
// import GitHubButton from "react-github-btn"
const GitHubButton = dynamic(() => import("react-github-btn"), {
  ssr: false,
  loading: () => <span></span>,
});

export default function HomeLink() {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Link href="/">
        <h2
          style={{
            color: "#358CD6",
            cursor: "pointer",
            margin: "20px 0px 45px 0px",
          }}
        >
          TS Academy
        </h2>
      </Link>
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}
      >
        <GitHubButton
          href="https://github.com/Open-EdTech/typescript-website"
          data-color-scheme="no-preference: light; light: light; dark: light;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count={true}
          aria-label="Star Open-EdTech/typescript-website on GitHub"
        >
          Star
        </GitHubButton>
        <GitHubButton
          href="https://github.com/Open-EdTech/typescript-academy/fork"
          data-color-scheme="no-preference: light; light: light; dark: light;"
          data-icon="octicon-repo-forked"
          data-size="large"
          data-show-count={true}
          aria-label="Fork Open-EdTech/typescript-academy on GitHub"
        >
          Fork
        </GitHubButton>
      </div>
    </div>
  );
}
