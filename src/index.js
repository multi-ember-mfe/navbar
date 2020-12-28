import singleSpaHtml from "single-spa-html"; // single-spa helper
import template from "./template.html"; // html template is separated out so that we can get better syntax highlighting
import "./styles.css"; // styles are global so these are based on IDs
import { createBrowserHistory } from 'history';

const htmlLifecycles = singleSpaHtml({
  domElementGetter: () => {
    const id = "single-spa-application:@example/cookie-consent";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.prepend(el); // single-spa automatically _appends_, but this content should be _prepended_ for accessibility
    }
    return el;
  },
  template,
});

export const mount = (props) => {
  return htmlLifecycles.mount(props).then(() => {

    window.appHistory = createBrowserHistory();

    document.addEventListener("click", e => {
      if (e.target.nodeName === "A") {
        const href = e.target.getAttribute("href");
        window.appHistory.push(href);
        e.preventDefault();
      }
    });
  });
}

export const { bootstrap, unmount } = htmlLifecycles; 
