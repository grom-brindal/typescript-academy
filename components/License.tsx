export default function License(){
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <span style={{marginRight: 5}}>
        License 
      </span>
      <a style={{marginRight: 5}} rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/">
        CC0
      </a>
      <a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/">
        <img
          src="http://i.creativecommons.org/p/zero/1.0/88x31.png"
          style={{ borderStyle: "none", margin: "0px 5px" }}
          alt="CC0"
        />
      </a>
    </div>
  );

}