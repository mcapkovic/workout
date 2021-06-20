import React from "react";

// original https://codepen.io/jakob-e/pen/XZoZWQ
function useRipple(element) {
  
  React.useEffect(() => {
    if (!element.current) return;
    [].map.call(
      document.querySelectorAll('[data-animation="ripple"]'),
      (el) => {
        el.addEventListener("click", (e) => {
          e = e.touches ? e.touches[0] : e;
          const r = el.getBoundingClientRect(),
            d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
          el.style.cssText = `--s: 0; --o: 1;`;

          const _ = el.offsetTop;

          el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
            e.clientX - r.left
          }; --y:${e.clientY - r.top};`;
        });
      }
    );
  }, [element.current]);
  
}

export default useRipple;
