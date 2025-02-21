const slugify = require("slugify");

const generateSlug = function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
};

module.exports = generateSlug;