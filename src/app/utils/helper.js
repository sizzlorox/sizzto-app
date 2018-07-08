module.exports = {
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  arrayMovePos: (arr, from, to) => {
    return arr.splice(to, 0, this.splice(from, 1)[0]);
  }
};