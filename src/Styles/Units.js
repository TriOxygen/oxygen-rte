const phone = {
  gutter: {
    mini: 4,
    default: 8,
    more: 16
  }
};

const tablet = {
  ...phone
};

const desktop = {
  ...tablet,
};

export default {
  phone,
  tablet,
  desktop
}