export function slideToTop() {
  const oldView = document.documentElement.animate(
    [
      {
        transform: "translateY(0)",
      },
      {
        opacity: 1,
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );
  const newView = document.documentElement.animate(
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
  return Promise.allSettled([oldView.finished, newView.finished]);
}
// export function slideTo() {
//   const oldView = document.documentElement.animate(
//     [
//       { transform: "translateY(0)" },
//       { opacity: 1, transform: "translateY(-35%)" },
//     ],
//     {
//       duration: 1500,
//       easing: "cubic-bezier(0.87, 0, 0.13, 1)",
//       fill: "forwards",
//       pseudoElement: "::view-transition-old(root)",
//     }
//   );

//   const newView = document.documentElement.animate(
//     [
//       {
//         clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
//       },
//       {
//         clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
//       },
//     ],
//     {
//       duration: 1500,
//       easing: "cubic-bezier(0.87, 0, 0.13, 1)",
//       fill: "forwards",
//       pseudoElement: "::view-transition-new(root)",
//     }
//   );

//   return Promise.allSettled([oldView.finished, newView.finished]);
// }
