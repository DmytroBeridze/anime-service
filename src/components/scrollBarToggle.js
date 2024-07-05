const scrollbarShow = () => {
  const paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
  document.body.style.paddingRight = paddingOffset;
};
const scrollbarHide = () => {
  document.body.style.paddingRight = 0;
};

export { scrollbarShow, scrollbarHide };
