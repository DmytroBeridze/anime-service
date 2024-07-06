const scrollbarShow = () => {
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.overflowY = "scroll";
};
const scrollbarHide = () => {
  document.body.style.position = "static";
};
// const scrollbarShow = () => {
//   const paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
//   document.body.style.paddingRight = paddingOffset;
// };
// const scrollbarHide = () => {
//   document.body.style.paddingRight = 0;
// };

export { scrollbarShow, scrollbarHide };
