function convertTitle(title) {
  let s = title.split(' ');
  s[0] = s[0].toLowerCase();
  return s.join('');
}

function toDisplay(name) {
  let result = name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  return result;
}

export { convertTitle, toDisplay }
