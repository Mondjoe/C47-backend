module.exports = {
  hooks: {
    readPackage(pkg) {
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.prepare = pkg.scripts.prepare || "";
      return pkg;
    }
  }
};
