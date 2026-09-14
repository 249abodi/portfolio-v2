const script = `(function(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="dark"&&t!=="light"){t="dark"}document.documentElement.setAttribute("data-theme",t)})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}