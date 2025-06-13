function zoomInOut() {
  document.documentElement.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 500,
    easing: "ease-in-out",
    fill: "forwards",
    pseudoElement: "::view-transition-old(root)",
  });

  document.documentElement.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1500,
    easing: "ease-in-out",
    fill: "forwards",
    pseudoElement: "::view-transition-new(root)",
  });
}

function slideLeftRight() {
  document.documentElement.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
    {
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
    {
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
function fadeInOut() {
  document.documentElement.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 500,
    easing: "ease-in-out",
    fill: "forwards",
    pseudoElement: "::view-transition-old(root)",
  });

  document.documentElement.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 500,
    easing: "ease-in-out",
    fill: "forwards",
    pseudoElement: "::view-transition-new(root)",
  });
}
function slideInOut() {
  document.documentElement.animate(
    [
      {
        transform: "transalteY(0)",
      },
      {
        opacity: 1,
        transform: "transalteY(35%)",
      },
    ],
    {
      duration: 800,
      esaing: "cubix-bezier(0.87,0,0.13,1)",
      fill: "forwards",
      pseudoElemnet: "::view-transition-old(root)",
    }
  );
  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
function slideToTop() {
  document.documentElement.animate(
    [
      {
        transform: "transalteY(0)",
      },
      {
        opacity: 1,
        transform: "transalteY(-35%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );
    document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

export { fadeInOut,slideToTop, slideLeftRight, zoomInOut, slideInOut };
