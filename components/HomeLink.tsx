import Link from "next/link";
import dynamic from "next/dynamic";
// import GitHubButton from "react-github-btn"
const GitHubButton = dynamic(() => import("react-github-btn"), {
  ssr: false,
  loading: () => <span></span>
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
          Open EdTech
        </h2>
      </Link>
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}
      >
        <GitHubButton
          href="https://github.com/Open-EdTech/typescript-website"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-icon="octicon-star"
          data-show-count={true}
          aria-label="Star Open-EdTech/typescript-website on GitHub"
        >
          Star
        </GitHubButton>
        <GitHubButton
          href="https://github.com/Open-EdTech"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-show-count={true}
          aria-label="Follow @Open-EdTech on GitHub"
        >
          Follow @Open-EdTech
        </GitHubButton>
      </div>
    </div>
  );
}
