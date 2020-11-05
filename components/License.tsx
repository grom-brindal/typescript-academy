export default function License(){
  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "0px 30px 30px 30px" }}>
      <span style={{ marginRight: 5 }}>Content Licensed</span>
      <a
        target="_blank"
        rel="content-license"
        href="http://creativecommons.org/publicdomain/zero/1.0/"
      >
        <img
          src="/CC0.png"
          style={{ borderStyle: "none", margin: "0px 5px" }}
          alt="CC0"
        />
      </a>
      <span style={{ margin: "0px 5px" }}>Software Licensed</span>
      <a
        target="_blank"
        rel="software-license"
        href="https://github.com/Open-EdTech/typescript-academy/blob/master/LICENSE"
      >
        <img
          src="/gplv3-with-text-84x42.png"
          style={{ borderStyle: "none", margin: "0px 5px" }}
          alt="CC0"
        />
      </a>
    </div>
  );

}